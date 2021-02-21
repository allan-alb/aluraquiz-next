import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import Footer from '../src/components/Footer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

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
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Quiz Marvel</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Que tal testar seus conhecimentos sobre os personagens da Marvel?</p>
            <form id="nameform" onSubmit={(e) => submitName(e)}>
              <Input
                name="nomeDoUsuario"
                type="text"
                placeholder="Insira seu nome"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
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
