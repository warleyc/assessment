package io.github.jhipster.application.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Option.
 */
@Entity
@Table(name = "jhi_option")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Option implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "options", nullable = false)
    private String options;

    @NotNull
    @Column(name = "weight", nullable = false)
    private Integer weight;

    @NotNull
    @Column(name = "score", nullable = false)
    private Integer score;

    @ManyToOne
    @JsonIgnoreProperties("options")
    private Question question;

    @OneToOne
    @JoinColumn(unique = true)
    private Category option;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOptions() {
        return options;
    }

    public Option options(String options) {
        this.options = options;
        return this;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public Integer getWeight() {
        return weight;
    }

    public Option weight(Integer weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getScore() {
        return score;
    }

    public Option score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Question getQuestion() {
        return question;
    }

    public Option question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Category getOption() {
        return option;
    }

    public Option option(Category category) {
        this.option = category;
        return this;
    }

    public void setOption(Category category) {
        this.option = category;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Option)) {
            return false;
        }
        return id != null && id.equals(((Option) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Option{" +
            "id=" + getId() +
            ", options='" + getOptions() + "'" +
            ", weight=" + getWeight() +
            ", score=" + getScore() +
            "}";
    }
}
