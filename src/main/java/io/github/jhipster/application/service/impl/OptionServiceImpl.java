package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.OptionService;
import io.github.jhipster.application.domain.Option;
import io.github.jhipster.application.repository.OptionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Option}.
 */
@Service
@Transactional
public class OptionServiceImpl implements OptionService {

    private final Logger log = LoggerFactory.getLogger(OptionServiceImpl.class);

    private final OptionRepository optionRepository;

    public OptionServiceImpl(OptionRepository optionRepository) {
        this.optionRepository = optionRepository;
    }

    /**
     * Save a option.
     *
     * @param option the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Option save(Option option) {
        log.debug("Request to save Option : {}", option);
        return optionRepository.save(option);
    }

    /**
     * Get all the options.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Option> findAll() {
        log.debug("Request to get all Options");
        return optionRepository.findAll();
    }


    /**
     * Get one option by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Option> findOne(Long id) {
        log.debug("Request to get Option : {}", id);
        return optionRepository.findById(id);
    }

    /**
     * Delete the option by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Option : {}", id);
        optionRepository.deleteById(id);
    }
}
