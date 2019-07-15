package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.AssessmentService;
import io.github.jhipster.application.domain.Assessment;
import io.github.jhipster.application.repository.AssessmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Assessment}.
 */
@Service
@Transactional
public class AssessmentServiceImpl implements AssessmentService {

    private final Logger log = LoggerFactory.getLogger(AssessmentServiceImpl.class);

    private final AssessmentRepository assessmentRepository;

    public AssessmentServiceImpl(AssessmentRepository assessmentRepository) {
        this.assessmentRepository = assessmentRepository;
    }

    /**
     * Save a assessment.
     *
     * @param assessment the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Assessment save(Assessment assessment) {
        log.debug("Request to save Assessment : {}", assessment);
        return assessmentRepository.save(assessment);
    }

    /**
     * Get all the assessments.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Assessment> findAll() {
        log.debug("Request to get all Assessments");
        return assessmentRepository.findAll();
    }


    /**
     * Get one assessment by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Assessment> findOne(Long id) {
        log.debug("Request to get Assessment : {}", id);
        return assessmentRepository.findById(id);
    }

    /**
     * Delete the assessment by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Assessment : {}", id);
        assessmentRepository.deleteById(id);
    }
}
