package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.QuestionTypeService;
import io.github.jhipster.application.domain.QuestionType;
import io.github.jhipster.application.repository.QuestionTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link QuestionType}.
 */
@Service
@Transactional
public class QuestionTypeServiceImpl implements QuestionTypeService {

    private final Logger log = LoggerFactory.getLogger(QuestionTypeServiceImpl.class);

    private final QuestionTypeRepository questionTypeRepository;

    public QuestionTypeServiceImpl(QuestionTypeRepository questionTypeRepository) {
        this.questionTypeRepository = questionTypeRepository;
    }

    /**
     * Save a questionType.
     *
     * @param questionType the entity to save.
     * @return the persisted entity.
     */
    @Override
    public QuestionType save(QuestionType questionType) {
        log.debug("Request to save QuestionType : {}", questionType);
        return questionTypeRepository.save(questionType);
    }

    /**
     * Get all the questionTypes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<QuestionType> findAll() {
        log.debug("Request to get all QuestionTypes");
        return questionTypeRepository.findAll();
    }


    /**
     * Get one questionType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<QuestionType> findOne(Long id) {
        log.debug("Request to get QuestionType : {}", id);
        return questionTypeRepository.findById(id);
    }

    /**
     * Delete the questionType by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete QuestionType : {}", id);
        questionTypeRepository.deleteById(id);
    }
}
