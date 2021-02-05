import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        Por favor, aguarde
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ name, results }) {
  return (
    <Widget>
      <Widget.Header>
        <h2>
          Parabéns!
        </h2>
      </Widget.Header>
      <img
        src="https://geekreply.com/wp-content/uploads/2017/11/marvelheroesomega.jpg"
        alt="Heróis Marvel"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
      />
      <Widget.Content>
        <h3>
          {`Muito bem, ${name}!`}
        </h3>
        <p>
          {'Você acertou '}
          {/* results.reduce((accumulator, currentValue) => (
            currentValue === true ? accumulator + 1 : accumulator
          ), 0) */}
          {results.filter((x) => x).length}
          {' questões!'}
        </p>
        <small>
          <ul>
            {results.map((result, index) => (
              <li key={`result__${result}`}>
                {`Questão #0${index + 1}: `}
                {result
                  ? (<span style={{ color: '#02d810' }}>Acertou</span>)
                  : (<span style={{ color: 'red' }}>Errou</span>)}
              </li>
            ))}
          </ul>
        </small>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;

  return (
    <Widget>
      <Widget.Header>
        <h3>
          Pergunta
          {` ${questionIndex + 1} `}
          de
          {` ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'contain',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm onSubmit={(e) => {
          e.preventDefault();
          setIsQuestionSubmitted(true);
          setTimeout(() => {
            addResult(isCorrect);
            setIsQuestionSubmitted(false);
            setSelectedAlternative(undefined);
            onSubmit();
          }, 2 * 1000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isQuestionSubmitted && isCorrect ? 'SUCCESS' : 'ERROR';
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={selectedAlternative === alternativeIndex}
                data-status={alternativeStatus}
              >
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  checked={selectedAlternative === alternativeIndex}
                />
                {` ${alternative}`}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={typeof selectedAlternative === 'undefined'} style={{ marginTop: 20 }}>
            Confirmar
          </Button>
          {isQuestionSubmitted && (isCorrect ? <p>Você acertou! 😁</p> : <p>Você errou! 😕</p>)}

        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const router = useRouter();
  const { name } = router.query;
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const [results, setResults] = useState([]);

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 100);
  }, []);

  function handleQuizSubmit() {
    if (questionIndex + 1 < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleQuizSubmit}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && (
          <LoadingWidget />
        )}

        {screenState === screenStates.RESULT && (
          <ResultWidget name={name} results={results} />
        )}

      </QuizContainer>
    </QuizBackground>
  );
}

QuestionWidget.propTypes = {
  question: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    answer: PropTypes.number,
    alternatives: PropTypes.arrayOf(PropTypes.string),
  }),
  totalQuestions: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  addResult: PropTypes.func.isRequired,
};

QuestionWidget.defaultProps = {
  question: null,
};

ResultWidget.propTypes = {
  name: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.bool).isRequired,
};
