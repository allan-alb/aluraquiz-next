import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import Footer from '../src/components/Footer';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

const Button = styled.button`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: ${db.theme.colors.secondary};
  font-size: 16px;
  font-weight: bold;
  color: ${db.theme.colors.contrastText};
  cursor: pointer;
  &:disabled {
    opacity: 0.4;
  }
`;

export default function Home() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');

  function submitName(e) {
    e.preventDefault();
    if (playerName !== '') {
      router.push(`/quiz?name=${playerName}`);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Quiz Marvel</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Que tal testar seus conhecimentos sobre os personagens da Marvel?</p>
            <form id="nameform" onSubmit={(e) => submitName(e)}>
              <input
                type="text"
                placeholder="Insira seu nome"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <p>
              Hoje considerada a maior editora de histórias em quadrinhos do mundo, com seu
              conteúdo expandido também para a televisão, a Internet e o cinema, conta com
              diversos personagens bem conhecidos como: Homem-Aranha, Homem-Formiga,
              Capitão América, Capitã Marvel, Vespa, Demolidor, Deadpool, Justiceiro,
              Homem de Ferro, entre muitos outros.
            </p>
            <p>
              O quanto você conhece dos heróis e vilões desse universo?
            </p>
            <Button type="submit" form="nameform" disabled={playerName.length === 0}>
              Bora para o Quiz!
            </Button>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/allan-alb/aluraquiz-next" />
    </QuizBackground>
  );
}
