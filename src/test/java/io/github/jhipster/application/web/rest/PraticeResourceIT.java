package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.AssessmentApp;
import io.github.jhipster.application.domain.Pratice;
import io.github.jhipster.application.repository.PraticeRepository;
import io.github.jhipster.application.service.PraticeService;
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
 * Integration tests for the {@Link PraticeResource} REST controller.
 */
@SpringBootTest(classes = AssessmentApp.class)
public class PraticeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PraticeRepository praticeRepository;

    @Autowired
    private PraticeService praticeService;

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

    private MockMvc restPraticeMockMvc;

    private Pratice pratice;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PraticeResource praticeResource = new PraticeResource(praticeService);
        this.restPraticeMockMvc = MockMvcBuilders.standaloneSetup(praticeResource)
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
    public static Pratice createEntity(EntityManager em) {
        Pratice pratice = new Pratice()
            .name(DEFAULT_NAME);
        return pratice;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pratice createUpdatedEntity(EntityManager em) {
        Pratice pratice = new Pratice()
            .name(UPDATED_NAME);
        return pratice;
    }

    @BeforeEach
    public void initTest() {
        pratice = createEntity(em);
    }

    @Test
    @Transactional
    public void createPratice() throws Exception {
        int databaseSizeBeforeCreate = praticeRepository.findAll().size();

        // Create the Pratice
        restPraticeMockMvc.perform(post("/api/pratices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pratice)))
            .andExpect(status().isCreated());

        // Validate the Pratice in the database
        List<Pratice> praticeList = praticeRepository.findAll();
        assertThat(praticeList).hasSize(databaseSizeBeforeCreate + 1);
        Pratice testPratice = praticeList.get(praticeList.size() - 1);
        assertThat(testPratice.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPraticeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = praticeRepository.findAll().size();

        // Create the Pratice with an existing ID
        pratice.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPraticeMockMvc.perform(post("/api/pratices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pratice)))
            .andExpect(status().isBadRequest());

        // Validate the Pratice in the database
        List<Pratice> praticeList = praticeRepository.findAll();
        assertThat(praticeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = praticeRepository.findAll().size();
        // set the field null
        pratice.setName(null);

        // Create the Pratice, which fails.

        restPraticeMockMvc.perform(post("/api/pratices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pratice)))
            .andExpect(status().isBadRequest());

        List<Pratice> praticeList = praticeRepository.findAll();
        assertThat(praticeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPratices() throws Exception {
        // Initialize the database
        praticeRepository.saveAndFlush(pratice);

        // Get all the praticeList
        restPraticeMockMvc.perform(get("/api/pratices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pratice.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getPratice() throws Exception {
        // Initialize the database
        praticeRepository.saveAndFlush(pratice);

        // Get the pratice
        restPraticeMockMvc.perform(get("/api/pratices/{id}", pratice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pratice.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPratice() throws Exception {
        // Get the pratice
        restPraticeMockMvc.perform(get("/api/pratices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePratice() throws Exception {
        // Initialize the database
        praticeService.save(pratice);

        int databaseSizeBeforeUpdate = praticeRepository.findAll().size();

        // Update the pratice
        Pratice updatedPratice = praticeRepository.findById(pratice.getId()).get();
        // Disconnect from session so that the updates on updatedPratice are not directly saved in db
        em.detach(updatedPratice);
        updatedPratice
            .name(UPDATED_NAME);

        restPraticeMockMvc.perform(put("/api/pratices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPratice)))
            .andExpect(status().isOk());

        // Validate the Pratice in the database
        List<Pratice> praticeList = praticeRepository.findAll();
        assertThat(praticeList).hasSize(databaseSizeBeforeUpdate);
        Pratice testPratice = praticeList.get(praticeList.size() - 1);
        assertThat(testPratice.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPratice() throws Exception {
        int databaseSizeBeforeUpdate = praticeRepository.findAll().size();

        // Create the Pratice

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPraticeMockMvc.perform(put("/api/pratices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pratice)))
            .andExpect(status().isBadRequest());

        // Validate the Pratice in the database
        List<Pratice> praticeList = praticeRepository.findAll();
        assertThat(praticeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePratice() throws Exception {
        // Initialize the database
        praticeService.save(pratice);

        int databaseSizeBeforeDelete = praticeRepository.findAll().size();

        // Delete the pratice
        restPraticeMockMvc.perform(delete("/api/pratices/{id}", pratice.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pratice> praticeList = praticeRepository.findAll();
        assertThat(praticeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pratice.class);
        Pratice pratice1 = new Pratice();
        pratice1.setId(1L);
        Pratice pratice2 = new Pratice();
        pratice2.setId(pratice1.getId());
        assertThat(pratice1).isEqualTo(pratice2);
        pratice2.setId(2L);
        assertThat(pratice1).isNotEqualTo(pratice2);
        pratice1.setId(null);
        assertThat(pratice1).isNotEqualTo(pratice2);
    }
}
