package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.AssessmentApp;
import io.github.jhipster.application.domain.Assessment;
import io.github.jhipster.application.repository.AssessmentRepository;
import io.github.jhipster.application.service.AssessmentService;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.jhipster.application.domain.enumeration.STATUS;
/**
 * Integration tests for the {@Link AssessmentResource} REST controller.
 */
@SpringBootTest(classes = AssessmentApp.class)
public class AssessmentResourceIT {

    private static final String DEFAULT_APPLICATION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_APPLICATION_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ASSET_OWNER = "AAAAAAAAAA";
    private static final String UPDATED_ASSET_OWNER = "BBBBBBBBBB";

    private static final String DEFAULT_TECH_DIVISION_MANAGER = "AAAAAAAAAA";
    private static final String UPDATED_TECH_DIVISION_MANAGER = "BBBBBBBBBB";

    private static final String DEFAULT_APPLICATION_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_APPLICATION_VERSION = "BBBBBBBBBB";

    private static final STATUS DEFAULT_STATUS = STATUS.DRAFT;
    private static final STATUS UPDATED_STATUS = STATUS.VALIDATE;

    private static final LocalDate DEFAULT_LAST_MODIFICATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_MODIFICATION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private AssessmentService assessmentService;

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

    private MockMvc restAssessmentMockMvc;

    private Assessment assessment;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssessmentResource assessmentResource = new AssessmentResource(assessmentService);
        this.restAssessmentMockMvc = MockMvcBuilders.standaloneSetup(assessmentResource)
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
    public static Assessment createEntity(EntityManager em) {
        Assessment assessment = new Assessment()
            .applicationName(DEFAULT_APPLICATION_NAME)
            .assetOwner(DEFAULT_ASSET_OWNER)
            .techDivisionManager(DEFAULT_TECH_DIVISION_MANAGER)
            .applicationVersion(DEFAULT_APPLICATION_VERSION)
            .status(DEFAULT_STATUS)
            .lastModification(DEFAULT_LAST_MODIFICATION);
        return assessment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Assessment createUpdatedEntity(EntityManager em) {
        Assessment assessment = new Assessment()
            .applicationName(UPDATED_APPLICATION_NAME)
            .assetOwner(UPDATED_ASSET_OWNER)
            .techDivisionManager(UPDATED_TECH_DIVISION_MANAGER)
            .applicationVersion(UPDATED_APPLICATION_VERSION)
            .status(UPDATED_STATUS)
            .lastModification(UPDATED_LAST_MODIFICATION);
        return assessment;
    }

    @BeforeEach
    public void initTest() {
        assessment = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssessment() throws Exception {
        int databaseSizeBeforeCreate = assessmentRepository.findAll().size();

        // Create the Assessment
        restAssessmentMockMvc.perform(post("/api/assessments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessment)))
            .andExpect(status().isCreated());

        // Validate the Assessment in the database
        List<Assessment> assessmentList = assessmentRepository.findAll();
        assertThat(assessmentList).hasSize(databaseSizeBeforeCreate + 1);
        Assessment testAssessment = assessmentList.get(assessmentList.size() - 1);
        assertThat(testAssessment.getApplicationName()).isEqualTo(DEFAULT_APPLICATION_NAME);
        assertThat(testAssessment.getAssetOwner()).isEqualTo(DEFAULT_ASSET_OWNER);
        assertThat(testAssessment.getTechDivisionManager()).isEqualTo(DEFAULT_TECH_DIVISION_MANAGER);
        assertThat(testAssessment.getApplicationVersion()).isEqualTo(DEFAULT_APPLICATION_VERSION);
        assertThat(testAssessment.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testAssessment.getLastModification()).isEqualTo(DEFAULT_LAST_MODIFICATION);
    }

    @Test
    @Transactional
    public void createAssessmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = assessmentRepository.findAll().size();

        // Create the Assessment with an existing ID
        assessment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssessmentMockMvc.perform(post("/api/assessments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessment)))
            .andExpect(status().isBadRequest());

        // Validate the Assessment in the database
        List<Assessment> assessmentList = assessmentRepository.findAll();
        assertThat(assessmentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAssessments() throws Exception {
        // Initialize the database
        assessmentRepository.saveAndFlush(assessment);

        // Get all the assessmentList
        restAssessmentMockMvc.perform(get("/api/assessments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assessment.getId().intValue())))
            .andExpect(jsonPath("$.[*].applicationName").value(hasItem(DEFAULT_APPLICATION_NAME.toString())))
            .andExpect(jsonPath("$.[*].assetOwner").value(hasItem(DEFAULT_ASSET_OWNER.toString())))
            .andExpect(jsonPath("$.[*].techDivisionManager").value(hasItem(DEFAULT_TECH_DIVISION_MANAGER.toString())))
            .andExpect(jsonPath("$.[*].applicationVersion").value(hasItem(DEFAULT_APPLICATION_VERSION.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].lastModification").value(hasItem(DEFAULT_LAST_MODIFICATION.toString())));
    }
    
    @Test
    @Transactional
    public void getAssessment() throws Exception {
        // Initialize the database
        assessmentRepository.saveAndFlush(assessment);

        // Get the assessment
        restAssessmentMockMvc.perform(get("/api/assessments/{id}", assessment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(assessment.getId().intValue()))
            .andExpect(jsonPath("$.applicationName").value(DEFAULT_APPLICATION_NAME.toString()))
            .andExpect(jsonPath("$.assetOwner").value(DEFAULT_ASSET_OWNER.toString()))
            .andExpect(jsonPath("$.techDivisionManager").value(DEFAULT_TECH_DIVISION_MANAGER.toString()))
            .andExpect(jsonPath("$.applicationVersion").value(DEFAULT_APPLICATION_VERSION.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.lastModification").value(DEFAULT_LAST_MODIFICATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAssessment() throws Exception {
        // Get the assessment
        restAssessmentMockMvc.perform(get("/api/assessments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssessment() throws Exception {
        // Initialize the database
        assessmentService.save(assessment);

        int databaseSizeBeforeUpdate = assessmentRepository.findAll().size();

        // Update the assessment
        Assessment updatedAssessment = assessmentRepository.findById(assessment.getId()).get();
        // Disconnect from session so that the updates on updatedAssessment are not directly saved in db
        em.detach(updatedAssessment);
        updatedAssessment
            .applicationName(UPDATED_APPLICATION_NAME)
            .assetOwner(UPDATED_ASSET_OWNER)
            .techDivisionManager(UPDATED_TECH_DIVISION_MANAGER)
            .applicationVersion(UPDATED_APPLICATION_VERSION)
            .status(UPDATED_STATUS)
            .lastModification(UPDATED_LAST_MODIFICATION);

        restAssessmentMockMvc.perform(put("/api/assessments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAssessment)))
            .andExpect(status().isOk());

        // Validate the Assessment in the database
        List<Assessment> assessmentList = assessmentRepository.findAll();
        assertThat(assessmentList).hasSize(databaseSizeBeforeUpdate);
        Assessment testAssessment = assessmentList.get(assessmentList.size() - 1);
        assertThat(testAssessment.getApplicationName()).isEqualTo(UPDATED_APPLICATION_NAME);
        assertThat(testAssessment.getAssetOwner()).isEqualTo(UPDATED_ASSET_OWNER);
        assertThat(testAssessment.getTechDivisionManager()).isEqualTo(UPDATED_TECH_DIVISION_MANAGER);
        assertThat(testAssessment.getApplicationVersion()).isEqualTo(UPDATED_APPLICATION_VERSION);
        assertThat(testAssessment.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAssessment.getLastModification()).isEqualTo(UPDATED_LAST_MODIFICATION);
    }

    @Test
    @Transactional
    public void updateNonExistingAssessment() throws Exception {
        int databaseSizeBeforeUpdate = assessmentRepository.findAll().size();

        // Create the Assessment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssessmentMockMvc.perform(put("/api/assessments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessment)))
            .andExpect(status().isBadRequest());

        // Validate the Assessment in the database
        List<Assessment> assessmentList = assessmentRepository.findAll();
        assertThat(assessmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAssessment() throws Exception {
        // Initialize the database
        assessmentService.save(assessment);

        int databaseSizeBeforeDelete = assessmentRepository.findAll().size();

        // Delete the assessment
        restAssessmentMockMvc.perform(delete("/api/assessments/{id}", assessment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Assessment> assessmentList = assessmentRepository.findAll();
        assertThat(assessmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Assessment.class);
        Assessment assessment1 = new Assessment();
        assessment1.setId(1L);
        Assessment assessment2 = new Assessment();
        assessment2.setId(assessment1.getId());
        assertThat(assessment1).isEqualTo(assessment2);
        assessment2.setId(2L);
        assertThat(assessment1).isNotEqualTo(assessment2);
        assessment1.setId(null);
        assertThat(assessment1).isNotEqualTo(assessment2);
    }
}
