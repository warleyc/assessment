package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.AssessmentApp;
import io.github.jhipster.application.domain.AssessmentResponse;
import io.github.jhipster.application.repository.AssessmentResponseRepository;
import io.github.jhipster.application.service.AssessmentResponseService;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link AssessmentResponseResource} REST controller.
 */
@SpringBootTest(classes = AssessmentApp.class)
public class AssessmentResponseResourceIT {

    private static final Boolean DEFAULT_NA = false;
    private static final Boolean UPDATED_NA = true;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private AssessmentResponseRepository assessmentResponseRepository;

    @Autowired
    private AssessmentResponseService assessmentResponseService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAssessmentResponseMockMvc;

    private AssessmentResponse assessmentResponse;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssessmentResponseResource assessmentResponseResource = new AssessmentResponseResource(assessmentResponseService);
        this.restAssessmentResponseMockMvc = MockMvcBuilders.standaloneSetup(assessmentResponseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AssessmentResponse createEntity(EntityManager em) {
        AssessmentResponse assessmentResponse = new AssessmentResponse()
            .na(DEFAULT_NA)
            .comment(DEFAULT_COMMENT);
        return assessmentResponse;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AssessmentResponse createUpdatedEntity(EntityManager em) {
        AssessmentResponse assessmentResponse = new AssessmentResponse()
            .na(UPDATED_NA)
            .comment(UPDATED_COMMENT);
        return assessmentResponse;
    }

    @BeforeEach
    public void initTest() {
        assessmentResponse = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssessmentResponse() throws Exception {
        int databaseSizeBeforeCreate = assessmentResponseRepository.findAll().size();

        // Create the AssessmentResponse
        restAssessmentResponseMockMvc.perform(post("/api/assessment-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessmentResponse)))
            .andExpect(status().isCreated());

        // Validate the AssessmentResponse in the database
        List<AssessmentResponse> assessmentResponseList = assessmentResponseRepository.findAll();
        assertThat(assessmentResponseList).hasSize(databaseSizeBeforeCreate + 1);
        AssessmentResponse testAssessmentResponse = assessmentResponseList.get(assessmentResponseList.size() - 1);
        assertThat(testAssessmentResponse.isNa()).isEqualTo(DEFAULT_NA);
        assertThat(testAssessmentResponse.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    public void createAssessmentResponseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = assessmentResponseRepository.findAll().size();

        // Create the AssessmentResponse with an existing ID
        assessmentResponse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssessmentResponseMockMvc.perform(post("/api/assessment-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessmentResponse)))
            .andExpect(status().isBadRequest());

        // Validate the AssessmentResponse in the database
        List<AssessmentResponse> assessmentResponseList = assessmentResponseRepository.findAll();
        assertThat(assessmentResponseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAssessmentResponses() throws Exception {
        // Initialize the database
        assessmentResponseRepository.saveAndFlush(assessmentResponse);

        // Get all the assessmentResponseList
        restAssessmentResponseMockMvc.perform(get("/api/assessment-responses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assessmentResponse.getId().intValue())))
            .andExpect(jsonPath("$.[*].na").value(hasItem(DEFAULT_NA.booleanValue())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }
    
    @Test
    @Transactional
    public void getAssessmentResponse() throws Exception {
        // Initialize the database
        assessmentResponseRepository.saveAndFlush(assessmentResponse);

        // Get the assessmentResponse
        restAssessmentResponseMockMvc.perform(get("/api/assessment-responses/{id}", assessmentResponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(assessmentResponse.getId().intValue()))
            .andExpect(jsonPath("$.na").value(DEFAULT_NA.booleanValue()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAssessmentResponse() throws Exception {
        // Get the assessmentResponse
        restAssessmentResponseMockMvc.perform(get("/api/assessment-responses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssessmentResponse() throws Exception {
        // Initialize the database
        assessmentResponseService.save(assessmentResponse);

        int databaseSizeBeforeUpdate = assessmentResponseRepository.findAll().size();

        // Update the assessmentResponse
        AssessmentResponse updatedAssessmentResponse = assessmentResponseRepository.findById(assessmentResponse.getId()).get();
        // Disconnect from session so that the updates on updatedAssessmentResponse are not directly saved in db
        em.detach(updatedAssessmentResponse);
        updatedAssessmentResponse
            .na(UPDATED_NA)
            .comment(UPDATED_COMMENT);

        restAssessmentResponseMockMvc.perform(put("/api/assessment-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAssessmentResponse)))
            .andExpect(status().isOk());

        // Validate the AssessmentResponse in the database
        List<AssessmentResponse> assessmentResponseList = assessmentResponseRepository.findAll();
        assertThat(assessmentResponseList).hasSize(databaseSizeBeforeUpdate);
        AssessmentResponse testAssessmentResponse = assessmentResponseList.get(assessmentResponseList.size() - 1);
        assertThat(testAssessmentResponse.isNa()).isEqualTo(UPDATED_NA);
        assertThat(testAssessmentResponse.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingAssessmentResponse() throws Exception {
        int databaseSizeBeforeUpdate = assessmentResponseRepository.findAll().size();

        // Create the AssessmentResponse

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssessmentResponseMockMvc.perform(put("/api/assessment-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessmentResponse)))
            .andExpect(status().isBadRequest());

        // Validate the AssessmentResponse in the database
        List<AssessmentResponse> assessmentResponseList = assessmentResponseRepository.findAll();
        assertThat(assessmentResponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAssessmentResponse() throws Exception {
        // Initialize the database
        assessmentResponseService.save(assessmentResponse);

        int databaseSizeBeforeDelete = assessmentResponseRepository.findAll().size();

        // Delete the assessmentResponse
        restAssessmentResponseMockMvc.perform(delete("/api/assessment-responses/{id}", assessmentResponse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AssessmentResponse> assessmentResponseList = assessmentResponseRepository.findAll();
        assertThat(assessmentResponseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssessmentResponse.class);
        AssessmentResponse assessmentResponse1 = new AssessmentResponse();
        assessmentResponse1.setId(1L);
        AssessmentResponse assessmentResponse2 = new AssessmentResponse();
        assessmentResponse2.setId(assessmentResponse1.getId());
        assertThat(assessmentResponse1).isEqualTo(assessmentResponse2);
        assessmentResponse2.setId(2L);
        assertThat(assessmentResponse1).isNotEqualTo(assessmentResponse2);
        assessmentResponse1.setId(null);
        assertThat(assessmentResponse1).isNotEqualTo(assessmentResponse2);
    }
}
