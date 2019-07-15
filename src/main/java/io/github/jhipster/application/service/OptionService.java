package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Option;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Option}.
 */
public interface OptionService {

    /**
     * Save a option.
     *
     * @param option the entity to save.
     * @return the persisted entity.
     */
    Option save(Option option);

    /**
     * Get all the options.
     *
     * @return the list of entities.
     */
    List<Option> findAll();


    /**
     * Get the "id" option.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Option> findOne(Long id);

    /**
     * Delete the "id" option.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
