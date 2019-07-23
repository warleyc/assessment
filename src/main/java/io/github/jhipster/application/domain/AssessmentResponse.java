package io.github.jhipster.application.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

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

    @Column(name = "comment")
    private String comment;

    @OneToOne
    @JoinColumn(unique = true)
    private Annotation annotation;

    @OneToOne
    @JoinColumn(unique = true)
    private Option option;

    @OneToOne
    @JoinColumn(unique = true)
    private Question question;

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

    public String getComment() {
        return comment;
    }

    public AssessmentResponse comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Annotation getAnnotation() {
        return annotation;
    }

    public AssessmentResponse annotation(Annotation annotation) {
        this.annotation = annotation;
        return this;
    }

    public void setAnnotation(Annotation annotation) {
        this.annotation = annotation;
    }

    public Option getOption() {
        return option;
    }

    public AssessmentResponse option(Option option) {
        this.option = option;
        return this;
    }

    public void setOption(Option option) {
        this.option = option;
    }

    public Question getQuestion() {
        return question;
    }

    public AssessmentResponse question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
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
            ", comment='" + getComment() + "'" +
            "}";
    }
}
