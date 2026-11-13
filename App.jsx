import React, { Fragment, useState } from "react";
import he from "he";
import Question from "./components/Question";

function shuffle(items) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temporary = shuffled[i];
    shuffled[i] = shuffled[randomIndex];
    shuffled[randomIndex] = temporary;
  }

  return shuffled;
}

export default function App() {
  const [screen, setScreen] = useState("start");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  function startQuiz() {
    setScreen("loading");
    setError("");
    setChecked(false);
    setQuestions([]);
    setAnswers([]);

    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to retrieve the question.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.response_code !== 0 || data.results.length !== 5) {
          throw new Error("Questions are not yet available.");
        }

        const newQuestions = data.results.map((item) => {
          const correctAnswer = he.decode(item.correct_answer);

          return {
            question: he.decode(item.question),
            correctAnswer,
            options: shuffle([
              correctAnswer,
              ...item.incorrect_answers.map((answer) => he.decode(answer)),
            ]),
          };
        });

        setQuestions(newQuestions);
        setAnswers(Array(newQuestions.length).fill(null));
        setScreen("quiz");
      })
      .catch(() => {
        setError(
          "Failed to load the question. Check your connection and try again.",
        );
        setScreen("error");
      });
  }

  function selectAnswer(questionIndex, answer) {
    if (checked) return;

    setAnswers((previous) =>
      previous.map((selected, index) =>
        index === questionIndex ? answer : selected,
      ),
    );
  }

  const allAnswered =
    questions.length === 5 && answers.every((answer) => answer !== null);

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.correctAnswer ? 1 : 0),
    0,
  );

  return (
    <main className="app">
      {screen === "start" && (
        <section className="start-screen">
          <h1>Quizzical</h1>
          <p>Test your knowledge with five questions!</p>
          <button className="primary-button start-button" onClick={startQuiz}>
            Start quiz
          </button>
        </section>
      )}

      {screen === "loading" && (
        <section className="start-screen" role="status">
          <p>Loading questions...</p>
        </section>
      )}

      {screen === "error" && (
        <section className="start-screen">
          <p role="alert">{error}</p>
          <button className="primary-button" onClick={startQuiz}>
            Try again
          </button>
        </section>
      )}

      {screen === "quiz" && (
        <section className="quiz">
          {questions.map((question, index) => (
            <Question
              key={index}
              question={question}
              questionIndex={index}
              selectedAnswer={answers[index]}
              checked={checked}
              onSelectAnswer={selectAnswer}
            />
          ))}

          <div className="quiz-footer">
            {!checked && allAnswered && (
              <button
                className="primary-button"
                onClick={() => setChecked(true)}
              >
                Check answers
              </button>
            )}

            {checked && (
              <Fragment>
                <p className="score" role="status">
                  You scored {score}/{questions.length} correct answers
                </p>
                <button className="primary-button" onClick={startQuiz}>
                  Play again
                </button>
              </Fragment>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
