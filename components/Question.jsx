import React from "react";

export default function Question({
  question,
  questionIndex,
  selectedAnswer,
  checked,
  onSelectAnswer,
}) {
  return (
    <fieldset className="question">
      <legend>{question.question}</legend>

      <div className="options">
        {question.options.map((option, optionIndex) => {
          const selected = selectedAnswer === option;
          let className = "option";

          if (!checked && selected) {
            className += " option-selected";
          }

          if (checked && option === question.correctAnswer) {
            className += " option-correct";
          } else if (checked && selected) {
            className += " option-incorrect";
          } else if (checked) {
            className += " option-muted";
          }

          return (
            <label className={className} key={optionIndex}>
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={option}
                checked={selected}
                disabled={checked}
                onChange={() => onSelectAnswer(questionIndex, option)}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
