package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.AssessmentApp;
import io.github.jhipster.application.domain.QuestionType;
import io.github.jhipster.application.repository.QuestionTypeRepository;
import io.github.jhipster.application.service.QuestionTypeService;
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
 * Integration tests for the {@Link QuestionTypeResource} REST controller.
 */
@SpringBootTest(classes = AssessmentApp.class)
public class QuestionTypeResourceIT {

    private static final String DEFAULT_COUNTRY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY_NAME = "BBBBBBBBBB";

    @Autowired
    private QuestionTypeRepository questionTypeRepository;

    @Autowired
    private QuestionTypeService questionTypeService;

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

    private MockMvc restQuestionTypeMockMvc;

    private QuestionType questionType;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuestionTypeResource questionTypeResource = new QuestionTypeResource(questionTypeService);
        this.restQuestionTypeMockMvc = MockMvcBuilders.standaloneSetup(questionTypeResource)
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
    public static QuestionType createEntity(EntityManager em) {
        QuestionType questionType = new QuestionType()
            .countryName(DEFAULT_COUNTRY_NAME);
        return questionType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuestionType createUpdatedEntity(EntityManager em) {
        QuestionType questionType = new QuestionType()
            .countryName(UPDATED_COUNTRY_NAME);
        return questionType;
    }

    @BeforeEach
    public void initTest() {
        questionType = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuestionType() throws Exception {
        int databaseSizeBeforeCreate = questionTypeRepository.findAll().size();

        // Create the QuestionType
        restQuestionTypeMockMvc.perform(post("/api/question-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionType)))
            .andExpect(status().isCreated());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeCreate + 1);
        QuestionType testQuestionType = questionTypeList.get(questionTypeList.size() - 1);
        assertThat(testQuestionType.getCountryName()).isEqualTo(DEFAULT_COUNTRY_NAME);
    }

    @Test
    @Transactional
    public void createQuestionTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questionTypeRepository.findAll().size();

        // Create the QuestionType with an existing ID
        questionType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionTypeMockMvc.perform(post("/api/question-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionType)))
            .andExpect(status().isBadRequest());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllQuestionTypes() throws Exception {
        // Initialize the database
        questionTypeRepository.saveAndFlush(questionType);

        // Get all the questionTypeList
        restQuestionTypeMockMvc.perform(get("/api/question-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(questionType.getId().intValue())))
            .andExpect(jsonPath("$.[*].countryName").value(hasItem(DEFAULT_COUNTRY_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getQuestionType() throws Exception {
        // Initialize the database
        questionTypeRepository.saveAndFlush(questionType);

        // Get the questionType
        restQuestionTypeMockMvc.perform(get("/api/question-types/{id}", questionType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(questionType.getId().intValue()))
            .andExpect(jsonPath("$.countryName").value(DEFAULT_COUNTRY_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingQuestionType() throws Exception {
        // Get the questionType
        restQuestionTypeMockMvc.perform(get("/api/question-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestionType() throws Exception {
        // Initialize the database
        questionTypeService.save(questionType);

        int databaseSizeBeforeUpdate = questionTypeRepository.findAll().size();

        // Update the questionType
        QuestionType updatedQuestionType = questionTypeRepository.findById(questionType.getId()).get();
        // Disconnect from session so that the updates on updatedQuestionType are not directly saved in db
        em.detach(updatedQuestionType);
        updatedQuestionType
            .countryName(UPDATED_COUNTRY_NAME);

        restQuestionTypeMockMvc.perform(put("/api/question-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuestionType)))
            .andExpect(status().isOk());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeUpdate);
        QuestionType testQuestionType = questionTypeList.get(questionTypeList.size() - 1);
        assertThat(testQuestionType.getCountryName()).isEqualTo(UPDATED_COUNTRY_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestionType() throws Exception {
        int databaseSizeBeforeUpdate = questionTypeRepository.findAll().size();

        // Create the QuestionType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionTypeMockMvc.perform(put("/api/question-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionType)))
            .andExpect(status().isBadRequest());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuestionType() throws Exception {
        // Initialize the database
        questionTypeService.save(questionType);

        int databaseSizeBeforeDelete = questionTypeRepository.findAll().size();

        // Delete the questionType
        restQuestionTypeMockMvc.perform(delete("/api/question-types/{id}", questionType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuestionType.class);
        QuestionType questionType1 = new QuestionType();
        questionType1.setId(1L);
        QuestionType questionType2 = new QuestionType();
        questionType2.setId(questionType1.getId());
        assertThat(questionType1).isEqualTo(questionType2);
        questionType2.setId(2L);
        assertThat(questionType1).isNotEqualTo(questionType2);
        questionType1.setId(null);
        assertThat(questionType1).isNotEqualTo(questionType2);
    }
}
