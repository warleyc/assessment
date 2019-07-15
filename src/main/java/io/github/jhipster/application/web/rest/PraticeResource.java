package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.Pratice;
import io.github.jhipster.application.service.PraticeService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.application.domain.Pratice}.
 */
@RestController
@RequestMapping("/api")
public class PraticeResource {

    private final Logger log = LoggerFactory.getLogger(PraticeResource.class);

    private static final String ENTITY_NAME = "pratice";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PraticeService praticeService;

    public PraticeResource(PraticeService praticeService) {
        this.praticeService = praticeService;
    }

    /**
     * {@code POST  /pratices} : Create a new pratice.
     *
     * @param pratice the pratice to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pratice, or with status {@code 400 (Bad Request)} if the pratice has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pratices")
    public ResponseEntity<Pratice> createPratice(@Valid @RequestBody Pratice pratice) throws URISyntaxException {
        log.debug("REST request to save Pratice : {}", pratice);
        if (pratice.getId() != null) {
            throw new BadRequestAlertException("A new pratice cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pratice result = praticeService.save(pratice);
        return ResponseEntity.created(new URI("/api/pratices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pratices} : Updates an existing pratice.
     *
     * @param pratice the pratice to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pratice,
     * or with status {@code 400 (Bad Request)} if the pratice is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pratice couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pratices")
    public ResponseEntity<Pratice> updatePratice(@Valid @RequestBody Pratice pratice) throws URISyntaxException {
        log.debug("REST request to update Pratice : {}", pratice);
        if (pratice.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pratice result = praticeService.save(pratice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pratice.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pratices} : get all the pratices.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pratices in body.
     */
    @GetMapping("/pratices")
    public List<Pratice> getAllPratices() {
        log.debug("REST request to get all Pratices");
        return praticeService.findAll();
    }

    /**
     * {@code GET  /pratices/:id} : get the "id" pratice.
     *
     * @param id the id of the pratice to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pratice, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pratices/{id}")
    public ResponseEntity<Pratice> getPratice(@PathVariable Long id) {
        log.debug("REST request to get Pratice : {}", id);
        Optional<Pratice> pratice = praticeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pratice);
    }

    /**
     * {@code DELETE  /pratices/:id} : delete the "id" pratice.
     *
     * @param id the id of the pratice to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pratices/{id}")
    public ResponseEntity<Void> deletePratice(@PathVariable Long id) {
        log.debug("REST request to delete Pratice : {}", id);
        praticeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
