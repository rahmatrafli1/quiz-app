# Quizzical

Quizzical is a React trivia app that fetches five multiple-choice questions from the [Open Trivia Database](https://opentdb.com/).

## Features

- Five randomly retrieved questions per game
- Shuffled answer choices
- One selectable answer per question
- Check answers after answering all five questions
- Review correct and incorrect answers and see your score
- Play again with a new set of questions
- Loading and error states

## Getting started

### Prerequisites

- Node.js and npm
- An internet connection to fetch questions

### Installation

```bash
npm install
```

### Build and run

```bash
npm run build
```

Open `index.html` in your browser.

For automatic rebuilding while editing:

```bash
npm run watch
```

## Technologies

- React
- Webpack and Babel
- `he` for decoding HTML entities
- Open Trivia Database API

## How to play

1. Click **Start quiz**.
2. Select one answer for each question.
3. Click **Check answers** after answering all five questions.
4. Review your score and answers.
5. Click **Play again** to start a new quiz.

## Project structure

- `index.js` — renders the React application.
- `App.jsx` — manages quiz state, API requests, and scoring.
- `components/Question.jsx` — displays a question and its answer choices.
- `style.css` — contains the application styles.
- `webpack.config.js` — configures the build.
