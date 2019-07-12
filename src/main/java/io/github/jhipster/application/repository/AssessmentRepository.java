package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Assessment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Assessment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

}
