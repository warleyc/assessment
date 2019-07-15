package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.QuestionType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QuestionType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionTypeRepository extends JpaRepository<QuestionType, Long> {

}
