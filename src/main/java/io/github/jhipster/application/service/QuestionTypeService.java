package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.QuestionType;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link QuestionType}.
 */
public interface QuestionTypeService {

    /**
     * Save a questionType.
     *
     * @param questionType the entity to save.
     * @return the persisted entity.
     */
    QuestionType save(QuestionType questionType);

    /**
     * Get all the questionTypes.
     *
     * @return the list of entities.
     */
    List<QuestionType> findAll();


    /**
     * Get the "id" questionType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<QuestionType> findOne(Long id);

    /**
     * Delete the "id" questionType.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
