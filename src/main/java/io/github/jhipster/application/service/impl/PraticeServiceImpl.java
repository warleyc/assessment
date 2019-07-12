package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.PraticeService;
import io.github.jhipster.application.domain.Pratice;
import io.github.jhipster.application.repository.PraticeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Pratice}.
 */
@Service
@Transactional
public class PraticeServiceImpl implements PraticeService {

    private final Logger log = LoggerFactory.getLogger(PraticeServiceImpl.class);

    private final PraticeRepository praticeRepository;

    public PraticeServiceImpl(PraticeRepository praticeRepository) {
        this.praticeRepository = praticeRepository;
    }

    /**
     * Save a pratice.
     *
     * @param pratice the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Pratice save(Pratice pratice) {
        log.debug("Request to save Pratice : {}", pratice);
        return praticeRepository.save(pratice);
    }

    /**
     * Get all the pratices.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Pratice> findAll() {
        log.debug("Request to get all Pratices");
        return praticeRepository.findAll();
    }


    /**
     * Get one pratice by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Pratice> findOne(Long id) {
        log.debug("Request to get Pratice : {}", id);
        return praticeRepository.findById(id);
    }

    /**
     * Delete the pratice by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pratice : {}", id);
        praticeRepository.deleteById(id);
    }
}
