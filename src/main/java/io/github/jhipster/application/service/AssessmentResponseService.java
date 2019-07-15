package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.AssessmentResponse;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link AssessmentResponse}.
 */
public interface AssessmentResponseService {

    /**
     * Save a assessmentResponse.
     *
     * @param assessmentResponse the entity to save.
     * @return the persisted entity.
     */
    AssessmentResponse save(AssessmentResponse assessmentResponse);

    /**
     * Get all the assessmentResponses.
     *
     * @return the list of entities.
     */
    List<AssessmentResponse> findAll();


    /**
     * Get the "id" assessmentResponse.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AssessmentResponse> findOne(Long id);

    /**
     * Delete the "id" assessmentResponse.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
