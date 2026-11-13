# Quizzical

Quizzical is a React trivia app that fetches questions from the [Open Trivia Database](https://opentdb.com/).

## Technologies

- React
- Webpack and Babel
- `dotenv` for build-time configuration
- `he` for decoding HTML entities
- Open Trivia Database API

## Features

- Configurable question count and type
- Shuffled answer choices
- One selectable answer per question
- Answer review and score
- Play again with a new set of questions
- Loading and error states

## Getting started

### Prerequisites

- Node.js and npm
- An internet connection

### Installation

```bash
npm install
```

### Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

- `QUIZ_AMOUNT`: number of questions, from 1 to 50.
- `QUIZ_TYPE`: `multiple` or `boolean`.

Both values are required. The start screen currently displays “five questions” regardless of the configured amount.

Webpack embeds these values in the browser bundle at build time. Do not put secrets in `.env`. After changing it, rebuild the project or restart watch mode.

### Build and run

```bash
npm run build
```

Open `index.html` in your browser.

To rebuild automatically while editing source files:

```bash
npm run watch
```

## How to play

1. Click **Start quiz**.
2. Select one answer for each question.
3. Click **Check answers** after answering every question.
4. Review your score and answers.
5. Click **Play again** to start a new quiz.

## Project structure

- `index.js` — renders the React application.
- `App.jsx` — manages quiz state, API requests, and scoring.
- `components/Question.jsx` — displays a question and its answer choices.
- `style.css` — contains the application styles.
- `webpack.config.js` — loads and validates configuration and builds the app.
