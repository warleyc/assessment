package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.Option;
import io.github.jhipster.application.service.OptionService;
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
 * REST controller for managing {@link io.github.jhipster.application.domain.Option}.
 */
@RestController
@RequestMapping("/api")
public class OptionResource {

    private final Logger log = LoggerFactory.getLogger(OptionResource.class);

    private static final String ENTITY_NAME = "option";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OptionService optionService;

    public OptionResource(OptionService optionService) {
        this.optionService = optionService;
    }

    /**
     * {@code POST  /options} : Create a new option.
     *
     * @param option the option to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new option, or with status {@code 400 (Bad Request)} if the option has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/options")
    public ResponseEntity<Option> createOption(@Valid @RequestBody Option option) throws URISyntaxException {
        log.debug("REST request to save Option : {}", option);
        if (option.getId() != null) {
            throw new BadRequestAlertException("A new option cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Option result = optionService.save(option);
        return ResponseEntity.created(new URI("/api/options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /options} : Updates an existing option.
     *
     * @param option the option to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated option,
     * or with status {@code 400 (Bad Request)} if the option is not valid,
     * or with status {@code 500 (Internal Server Error)} if the option couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/options")
    public ResponseEntity<Option> updateOption(@Valid @RequestBody Option option) throws URISyntaxException {
        log.debug("REST request to update Option : {}", option);
        if (option.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Option result = optionService.save(option);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, option.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /options} : get all the options.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of options in body.
     */
    @GetMapping("/options")
    public List<Option> getAllOptions() {
        log.debug("REST request to get all Options");
        return optionService.findAll();
    }

    /**
     * {@code GET  /options/:id} : get the "id" option.
     *
     * @param id the id of the option to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the option, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/options/{id}")
    public ResponseEntity<Option> getOption(@PathVariable Long id) {
        log.debug("REST request to get Option : {}", id);
        Optional<Option> option = optionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(option);
    }

    /**
     * {@code DELETE  /options/:id} : delete the "id" option.
     *
     * @param id the id of the option to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/options/{id}")
    public ResponseEntity<Void> deleteOption(@PathVariable Long id) {
        log.debug("REST request to delete Option : {}", id);
        optionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
