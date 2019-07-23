package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.AssessmentApp;
import io.github.jhipster.application.domain.Annotation;
import io.github.jhipster.application.repository.AnnotationRepository;
import io.github.jhipster.application.service.AnnotationService;
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
 * Integration tests for the {@Link AnnotationResource} REST controller.
 */
@SpringBootTest(classes = AssessmentApp.class)
public class AnnotationResourceIT {

    private static final String DEFAULT_TEST = "AAAAAAAAAA";
    private static final String UPDATED_TEST = "BBBBBBBBBB";

    @Autowired
    private AnnotationRepository annotationRepository;

    @Autowired
    private AnnotationService annotationService;

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

    private MockMvc restAnnotationMockMvc;

    private Annotation annotation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnnotationResource annotationResource = new AnnotationResource(annotationService);
        this.restAnnotationMockMvc = MockMvcBuilders.standaloneSetup(annotationResource)
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
    public static Annotation createEntity(EntityManager em) {
        Annotation annotation = new Annotation()
            .test(DEFAULT_TEST);
        return annotation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Annotation createUpdatedEntity(EntityManager em) {
        Annotation annotation = new Annotation()
            .test(UPDATED_TEST);
        return annotation;
    }

    @BeforeEach
    public void initTest() {
        annotation = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnnotation() throws Exception {
        int databaseSizeBeforeCreate = annotationRepository.findAll().size();

        // Create the Annotation
        restAnnotationMockMvc.perform(post("/api/annotations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annotation)))
            .andExpect(status().isCreated());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeCreate + 1);
        Annotation testAnnotation = annotationList.get(annotationList.size() - 1);
        assertThat(testAnnotation.getTest()).isEqualTo(DEFAULT_TEST);
    }

    @Test
    @Transactional
    public void createAnnotationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = annotationRepository.findAll().size();

        // Create the Annotation with an existing ID
        annotation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnnotationMockMvc.perform(post("/api/annotations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annotation)))
            .andExpect(status().isBadRequest());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAnnotations() throws Exception {
        // Initialize the database
        annotationRepository.saveAndFlush(annotation);

        // Get all the annotationList
        restAnnotationMockMvc.perform(get("/api/annotations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(annotation.getId().intValue())))
            .andExpect(jsonPath("$.[*].test").value(hasItem(DEFAULT_TEST.toString())));
    }
    
    @Test
    @Transactional
    public void getAnnotation() throws Exception {
        // Initialize the database
        annotationRepository.saveAndFlush(annotation);

        // Get the annotation
        restAnnotationMockMvc.perform(get("/api/annotations/{id}", annotation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(annotation.getId().intValue()))
            .andExpect(jsonPath("$.test").value(DEFAULT_TEST.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAnnotation() throws Exception {
        // Get the annotation
        restAnnotationMockMvc.perform(get("/api/annotations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnnotation() throws Exception {
        // Initialize the database
        annotationService.save(annotation);

        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();

        // Update the annotation
        Annotation updatedAnnotation = annotationRepository.findById(annotation.getId()).get();
        // Disconnect from session so that the updates on updatedAnnotation are not directly saved in db
        em.detach(updatedAnnotation);
        updatedAnnotation
            .test(UPDATED_TEST);

        restAnnotationMockMvc.perform(put("/api/annotations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnnotation)))
            .andExpect(status().isOk());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
        Annotation testAnnotation = annotationList.get(annotationList.size() - 1);
        assertThat(testAnnotation.getTest()).isEqualTo(UPDATED_TEST);
    }

    @Test
    @Transactional
    public void updateNonExistingAnnotation() throws Exception {
        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();

        // Create the Annotation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnnotationMockMvc.perform(put("/api/annotations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annotation)))
            .andExpect(status().isBadRequest());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnnotation() throws Exception {
        // Initialize the database
        annotationService.save(annotation);

        int databaseSizeBeforeDelete = annotationRepository.findAll().size();

        // Delete the annotation
        restAnnotationMockMvc.perform(delete("/api/annotations/{id}", annotation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Annotation.class);
        Annotation annotation1 = new Annotation();
        annotation1.setId(1L);
        Annotation annotation2 = new Annotation();
        annotation2.setId(annotation1.getId());
        assertThat(annotation1).isEqualTo(annotation2);
        annotation2.setId(2L);
        assertThat(annotation1).isNotEqualTo(annotation2);
        annotation1.setId(null);
        assertThat(annotation1).isNotEqualTo(annotation2);
    }
}
