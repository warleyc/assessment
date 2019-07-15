package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Pratice;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Pratice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PraticeRepository extends JpaRepository<Pratice, Long> {

}
