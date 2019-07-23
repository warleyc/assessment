package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.AnnotationService;
import io.github.jhipster.application.domain.Annotation;
import io.github.jhipster.application.repository.AnnotationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Annotation}.
 */
@Service
@Transactional
public class AnnotationServiceImpl implements AnnotationService {

    private final Logger log = LoggerFactory.getLogger(AnnotationServiceImpl.class);

    private final AnnotationRepository annotationRepository;

    public AnnotationServiceImpl(AnnotationRepository annotationRepository) {
        this.annotationRepository = annotationRepository;
    }

    /**
     * Save a annotation.
     *
     * @param annotation the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Annotation save(Annotation annotation) {
        log.debug("Request to save Annotation : {}", annotation);
        return annotationRepository.save(annotation);
    }

    /**
     * Get all the annotations.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Annotation> findAll() {
        log.debug("Request to get all Annotations");
        return annotationRepository.findAll();
    }


    /**
     * Get one annotation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Annotation> findOne(Long id) {
        log.debug("Request to get Annotation : {}", id);
        return annotationRepository.findById(id);
    }

    /**
     * Delete the annotation by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Annotation : {}", id);
        annotationRepository.deleteById(id);
    }
}
