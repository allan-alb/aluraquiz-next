import { useRouter } from 'next/router';
import styled from 'styled-components';

import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function QuizPage() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <QuizBackground>
      <QuizContainer>
        <Widget>
          <p>
            Vamos lá,
            {` ${name}`}
          </p>
        </Widget>
      </QuizContainer>
    </QuizBackground>
  );
}
