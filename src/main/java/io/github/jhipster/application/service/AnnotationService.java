package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Annotation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Annotation}.
 */
public interface AnnotationService {

    /**
     * Save a annotation.
     *
     * @param annotation the entity to save.
     * @return the persisted entity.
     */
    Annotation save(Annotation annotation);

    /**
     * Get all the annotations.
     *
     * @return the list of entities.
     */
    List<Annotation> findAll();


    /**
     * Get the "id" annotation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Annotation> findOne(Long id);

    /**
     * Delete the "id" annotation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
