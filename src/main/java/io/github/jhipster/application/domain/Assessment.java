package io.github.jhipster.application.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

import io.github.jhipster.application.domain.enumeration.STATUS;

/**
 * A Assessment.
 */
@Entity
@Table(name = "assessment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Assessment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "application_name")
    private String applicationName;

    @Column(name = "asset_owner")
    private String assetOwner;

    @Column(name = "tech_division_manager")
    private String techDivisionManager;

    @Column(name = "application_version")
    private String applicationVersion;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private STATUS status;

    @Column(name = "last_modification")
    private LocalDate lastModification;

    @OneToOne
    @JoinColumn(unique = true)
    private AssessmentResponse assessmentResponse;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApplicationName() {
        return applicationName;
    }

    public Assessment applicationName(String applicationName) {
        this.applicationName = applicationName;
        return this;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public String getAssetOwner() {
        return assetOwner;
    }

    public Assessment assetOwner(String assetOwner) {
        this.assetOwner = assetOwner;
        return this;
    }

    public void setAssetOwner(String assetOwner) {
        this.assetOwner = assetOwner;
    }

    public String getTechDivisionManager() {
        return techDivisionManager;
    }

    public Assessment techDivisionManager(String techDivisionManager) {
        this.techDivisionManager = techDivisionManager;
        return this;
    }

    public void setTechDivisionManager(String techDivisionManager) {
        this.techDivisionManager = techDivisionManager;
    }

    public String getApplicationVersion() {
        return applicationVersion;
    }

    public Assessment applicationVersion(String applicationVersion) {
        this.applicationVersion = applicationVersion;
        return this;
    }

    public void setApplicationVersion(String applicationVersion) {
        this.applicationVersion = applicationVersion;
    }

    public STATUS getStatus() {
        return status;
    }

    public Assessment status(STATUS status) {
        this.status = status;
        return this;
    }

    public void setStatus(STATUS status) {
        this.status = status;
    }

    public LocalDate getLastModification() {
        return lastModification;
    }

    public Assessment lastModification(LocalDate lastModification) {
        this.lastModification = lastModification;
        return this;
    }

    public void setLastModification(LocalDate lastModification) {
        this.lastModification = lastModification;
    }

    public AssessmentResponse getAssessmentResponse() {
        return assessmentResponse;
    }

    public Assessment assessmentResponse(AssessmentResponse assessmentResponse) {
        this.assessmentResponse = assessmentResponse;
        return this;
    }

    public void setAssessmentResponse(AssessmentResponse assessmentResponse) {
        this.assessmentResponse = assessmentResponse;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Assessment)) {
            return false;
        }
        return id != null && id.equals(((Assessment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Assessment{" +
            "id=" + getId() +
            ", applicationName='" + getApplicationName() + "'" +
            ", assetOwner='" + getAssetOwner() + "'" +
            ", techDivisionManager='" + getTechDivisionManager() + "'" +
            ", applicationVersion='" + getApplicationVersion() + "'" +
            ", status='" + getStatus() + "'" +
            ", lastModification='" + getLastModification() + "'" +
            "}";
    }
}
