package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.AssessmentResponseService;
import io.github.jhipster.application.domain.AssessmentResponse;
import io.github.jhipster.application.repository.AssessmentResponseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link AssessmentResponse}.
 */
@Service
@Transactional
public class AssessmentResponseServiceImpl implements AssessmentResponseService {

    private final Logger log = LoggerFactory.getLogger(AssessmentResponseServiceImpl.class);

    private final AssessmentResponseRepository assessmentResponseRepository;

    public AssessmentResponseServiceImpl(AssessmentResponseRepository assessmentResponseRepository) {
        this.assessmentResponseRepository = assessmentResponseRepository;
    }

    /**
     * Save a assessmentResponse.
     *
     * @param assessmentResponse the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AssessmentResponse save(AssessmentResponse assessmentResponse) {
        log.debug("Request to save AssessmentResponse : {}", assessmentResponse);
        return assessmentResponseRepository.save(assessmentResponse);
    }

    /**
     * Get all the assessmentResponses.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<AssessmentResponse> findAll() {
        log.debug("Request to get all AssessmentResponses");
        return assessmentResponseRepository.findAll();
    }


    /**
     * Get one assessmentResponse by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AssessmentResponse> findOne(Long id) {
        log.debug("Request to get AssessmentResponse : {}", id);
        return assessmentResponseRepository.findById(id);
    }

    /**
     * Delete the assessmentResponse by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AssessmentResponse : {}", id);
        assessmentResponseRepository.deleteById(id);
    }
}
