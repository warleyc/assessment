package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Pratice;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Pratice}.
 */
public interface PraticeService {

    /**
     * Save a pratice.
     *
     * @param pratice the entity to save.
     * @return the persisted entity.
     */
    Pratice save(Pratice pratice);

    /**
     * Get all the pratices.
     *
     * @return the list of entities.
     */
    List<Pratice> findAll();


    /**
     * Get the "id" pratice.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Pratice> findOne(Long id);

    /**
     * Delete the "id" pratice.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
