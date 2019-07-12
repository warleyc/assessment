package io.github.jhipster.application.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A AssessmentResponse.
 */
@Entity
@Table(name = "assessment_response")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AssessmentResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "na")
    private Boolean na;

    @OneToOne
    @JoinColumn(unique = true)
    private Question reponse;

    @OneToMany(mappedBy = "assessmentResponse")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Option> responses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isNa() {
        return na;
    }

    public AssessmentResponse na(Boolean na) {
        this.na = na;
        return this;
    }

    public void setNa(Boolean na) {
        this.na = na;
    }

    public Question getReponse() {
        return reponse;
    }

    public AssessmentResponse reponse(Question question) {
        this.reponse = question;
        return this;
    }

    public void setReponse(Question question) {
        this.reponse = question;
    }

    public Set<Option> getResponses() {
        return responses;
    }

    public AssessmentResponse responses(Set<Option> options) {
        this.responses = options;
        return this;
    }

    public AssessmentResponse addResponse(Option option) {
        this.responses.add(option);
        option.setAssessmentResponse(this);
        return this;
    }

    public AssessmentResponse removeResponse(Option option) {
        this.responses.remove(option);
        option.setAssessmentResponse(null);
        return this;
    }

    public void setResponses(Set<Option> options) {
        this.responses = options;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AssessmentResponse)) {
            return false;
        }
        return id != null && id.equals(((AssessmentResponse) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AssessmentResponse{" +
            "id=" + getId() +
            ", na='" + isNa() + "'" +
            "}";
    }
}
