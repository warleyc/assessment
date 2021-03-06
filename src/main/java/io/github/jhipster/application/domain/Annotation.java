package io.github.jhipster.application.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Annotation.
 */
@Entity
@Table(name = "annotation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Annotation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "test")
    private String test;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTest() {
        return test;
    }

    public Annotation test(String test) {
        this.test = test;
        return this;
    }

    public void setTest(String test) {
        this.test = test;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Annotation)) {
            return false;
        }
        return id != null && id.equals(((Annotation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Annotation{" +
            "id=" + getId() +
            ", test='" + getTest() + "'" +
            "}";
    }
}
