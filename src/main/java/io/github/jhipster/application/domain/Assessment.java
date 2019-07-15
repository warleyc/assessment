package io.github.jhipster.application.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

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

    @Column(name = "last_modification")
    private ZonedDateTime lastModification;

    @OneToOne
    @JoinColumn(unique = true)
    private AssessmentResponse assessment;

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

    public ZonedDateTime getLastModification() {
        return lastModification;
    }

    public Assessment lastModification(ZonedDateTime lastModification) {
        this.lastModification = lastModification;
        return this;
    }

    public void setLastModification(ZonedDateTime lastModification) {
        this.lastModification = lastModification;
    }

    public AssessmentResponse getAssessment() {
        return assessment;
    }

    public Assessment assessment(AssessmentResponse assessmentResponse) {
        this.assessment = assessmentResponse;
        return this;
    }

    public void setAssessment(AssessmentResponse assessmentResponse) {
        this.assessment = assessmentResponse;
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
            ", lastModification='" + getLastModification() + "'" +
            "}";
    }
}
