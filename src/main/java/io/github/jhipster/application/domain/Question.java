package io.github.jhipster.application.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "text")
    private String text;

    @Column(name = "answer_required")
    private Boolean answerRequired;

    @OneToOne
    @JoinColumn(unique = true)
    private Category question;

    @OneToOne
    @JoinColumn(unique = true)
    private QuestionType question;

    @OneToMany(mappedBy = "question")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Option> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Question name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText() {
        return text;
    }

    public Question text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean isAnswerRequired() {
        return answerRequired;
    }

    public Question answerRequired(Boolean answerRequired) {
        this.answerRequired = answerRequired;
        return this;
    }

    public void setAnswerRequired(Boolean answerRequired) {
        this.answerRequired = answerRequired;
    }

    public Category getQuestion() {
        return question;
    }

    public Question question(Category category) {
        this.question = category;
        return this;
    }

    public void setQuestion(Category category) {
        this.question = category;
    }

    public QuestionType getQuestion() {
        return question;
    }

    public Question question(QuestionType questionType) {
        this.question = questionType;
        return this;
    }

    public void setQuestion(QuestionType questionType) {
        this.question = questionType;
    }

    public Set<Option> getQuestions() {
        return questions;
    }

    public Question questions(Set<Option> options) {
        this.questions = options;
        return this;
    }

    public Question addQuestion(Option option) {
        this.questions.add(option);
        option.setQuestion(this);
        return this;
    }

    public Question removeQuestion(Option option) {
        this.questions.remove(option);
        option.setQuestion(null);
        return this;
    }

    public void setQuestions(Set<Option> options) {
        this.questions = options;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Question)) {
            return false;
        }
        return id != null && id.equals(((Question) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", text='" + getText() + "'" +
            ", answerRequired='" + isAnswerRequired() + "'" +
            "}";
    }
}
