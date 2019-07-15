package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.AssessmentResponse;
import io.github.jhipster.application.service.AssessmentResponseService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.application.domain.AssessmentResponse}.
 */
@RestController
@RequestMapping("/api")
public class AssessmentResponseResource {

    private final Logger log = LoggerFactory.getLogger(AssessmentResponseResource.class);

    private static final String ENTITY_NAME = "assessmentResponse";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AssessmentResponseService assessmentResponseService;

    public AssessmentResponseResource(AssessmentResponseService assessmentResponseService) {
        this.assessmentResponseService = assessmentResponseService;
    }

    /**
     * {@code POST  /assessment-responses} : Create a new assessmentResponse.
     *
     * @param assessmentResponse the assessmentResponse to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new assessmentResponse, or with status {@code 400 (Bad Request)} if the assessmentResponse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/assessment-responses")
    public ResponseEntity<AssessmentResponse> createAssessmentResponse(@RequestBody AssessmentResponse assessmentResponse) throws URISyntaxException {
        log.debug("REST request to save AssessmentResponse : {}", assessmentResponse);
        if (assessmentResponse.getId() != null) {
            throw new BadRequestAlertException("A new assessmentResponse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AssessmentResponse result = assessmentResponseService.save(assessmentResponse);
        return ResponseEntity.created(new URI("/api/assessment-responses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /assessment-responses} : Updates an existing assessmentResponse.
     *
     * @param assessmentResponse the assessmentResponse to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated assessmentResponse,
     * or with status {@code 400 (Bad Request)} if the assessmentResponse is not valid,
     * or with status {@code 500 (Internal Server Error)} if the assessmentResponse couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/assessment-responses")
    public ResponseEntity<AssessmentResponse> updateAssessmentResponse(@RequestBody AssessmentResponse assessmentResponse) throws URISyntaxException {
        log.debug("REST request to update AssessmentResponse : {}", assessmentResponse);
        if (assessmentResponse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AssessmentResponse result = assessmentResponseService.save(assessmentResponse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, assessmentResponse.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /assessment-responses} : get all the assessmentResponses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of assessmentResponses in body.
     */
    @GetMapping("/assessment-responses")
    public List<AssessmentResponse> getAllAssessmentResponses() {
        log.debug("REST request to get all AssessmentResponses");
        return assessmentResponseService.findAll();
    }

    /**
     * {@code GET  /assessment-responses/:id} : get the "id" assessmentResponse.
     *
     * @param id the id of the assessmentResponse to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the assessmentResponse, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/assessment-responses/{id}")
    public ResponseEntity<AssessmentResponse> getAssessmentResponse(@PathVariable Long id) {
        log.debug("REST request to get AssessmentResponse : {}", id);
        Optional<AssessmentResponse> assessmentResponse = assessmentResponseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(assessmentResponse);
    }

    /**
     * {@code DELETE  /assessment-responses/:id} : delete the "id" assessmentResponse.
     *
     * @param id the id of the assessmentResponse to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/assessment-responses/{id}")
    public ResponseEntity<Void> deleteAssessmentResponse(@PathVariable Long id) {
        log.debug("REST request to delete AssessmentResponse : {}", id);
        assessmentResponseService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
