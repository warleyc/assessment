package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Assessment;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Assessment}.
 */
public interface AssessmentService {

    /**
     * Save a assessment.
     *
     * @param assessment the entity to save.
     * @return the persisted entity.
     */
    Assessment save(Assessment assessment);

    /**
     * Get all the assessments.
     *
     * @return the list of entities.
     */
    List<Assessment> findAll();


    /**
     * Get the "id" assessment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Assessment> findOne(Long id);

    /**
     * Delete the "id" assessment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
