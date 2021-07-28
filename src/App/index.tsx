// Import módulos
import React, { useEffect, useState } from "react";
// Import componentes estilizados
import {
  AppearingLabel,
  Aside,
  AsideDiv,
  Body,
  Button,
  Header,
  Label,
  Mode,
  Play,
  Player,
  Screen,
  Table,
} from "./styles";

/**
 * Componente da página
 * @returns Página
 */
const App = () => {
  // Número de jogadas
  const [plays, setPlays] = useState(0);
  // Tabuleiro
  const [table, setTable] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  // Vencedor
  const [winner, setWinner] = useState("");
  // Modo de jogo
  const [mode, setMode] = useState(0);
  // Jogador (0 = O, 1 = X)
  const [player, setPlayer] = useState(0);

  /**
   * Função para verificar se alguém venceu
   */
  useEffect(() => {
    // Se atingiram 9 jogadas
    if (plays === 9) {
      // Define velha
      setWinner("Draw");
      // Sai da função
      return;
      // Senão
    } else {
      // Se uma diagonal estiver completa por um jogador
      if (
        (table[0][0] === table[1][1] && table[1][1] === table[2][2]) ||
        (table[0][2] === table[1][1] && table[1][1] === table[2][0])
      ) {
        // Define-o como vencedor
        setWinner(table[1][1]);
        // Senão
      } else {
        // Para cada linha e coluna
        for (const index in table[0]) {
          // Se a linha estiver completa por um jogador
          if (
            table[index][0] !== "" &&
            table[index][0] === table[index][1] &&
            table[index][1] === table[index][2]
          ) {
            // Define-o como vencedor
            setWinner(table[index][0]);
            // Sai da função
            return;
          }
          // Se a coluna estiver completa por um jogador
          if (
            table[0][index] !== "" &&
            table[0][index] === table[1][index] &&
            table[1][index] === table[2][index]
          ) {
            // Define-o como vencedor
            setWinner(table[0][index]);
            // Sai da função
            return;
          }
        }
      }
    }
    // Se for a vez do Bot jogar
    if (mode && player ^ plays % 2) {
      // Bot joga
      botPlays();
    }
    // eslint-disable-next-line
  }, [table]);

  /**
   * Função para resetar se o modo de jogo mudar
   */
  useEffect(() => {
    reset();
    // eslint-disable-next-line
  }, [mode]);

  /**
   * Função para selecionar uma posição
   * @param row Número da linha da posição desejada
   * @param column Número da coluna da posição desejada
   */
  const selectPosition = (row: number, column: number) => {
    // Cria cópia do tabuleiro
    const temp = [...table];
    // Se a posição desejada não estiver ocupada
    if (!temp[row][column]) {
      // Seleciona posição de acordo com o jogador da vez
      // Número de jogadas par = jogador O, número de jogadas ímpar = jogador X
      temp[row][column] = plays % 2 ? "X" : "O";
      // Muda de jogador
      setPlays(plays + 1);
      // Atualiza tabuleiro
      setTable(temp);
    }
  };

  /**
   * Reinicia jogo
   */
  const reset = () => {
    // Se o modo de jogo não for 2P
    if (mode) {
      // Sorteia jogador
      setPlayer(sort());
    }
    // Limpa o tabuleiro
    setTable([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    // Reinicia jogadas
    setPlays(0);
  };

  /**
   * Função para sortear um número inteiro entre 2 definidos
   * @param min Número mínimo para sortear (default = 0)
   * @param max Número máximo para sortear (default = 1)
   * @returns Número inteiro sortido
   */
  const sort = (min: number = 0, max: number = 1) => {
    // Retorna sorteio
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Jogada do Bot
   */
  const botPlays = () => {
    // Sorteia linha e coluna
    let row = sort(0, 2);
    let column = sort(0, 2);
    // Enquanto essa posição estiver ocupada
    while (Boolean(table[row][column])) {
      // Sorteia novamente
      row = sort(0, 2);
      column = sort(0, 2);
    }
    // Seleciona posição
    selectPosition(row, column);
  };

  return (
    // Tela
    <Screen>
      {/* Título */}
      <Header>Tic Tac Toe</Header>
      {/* Corpo da tela */}
      <Body>
        {/* Lateral esquerda */}
        <Aside>
          {/* Modo de jogo */}
          <AsideDiv>
            <Label>Mode</Label>
            <Mode onChange={(e) => setMode(Number(e.target.value))}>
              <option value={0}>2 Players</option>
              <option value={1}>Easy</option>
              <option value={2}>Medium</option>
              <option value={3}>Hard</option>
              <option value={4}>Impossible</option>
            </Mode>
          </AsideDiv>
          {/* Iniciar jogo */}
          <Play onClick={reset}>Play</Play>
        </Aside>
        {/* Tabuleiro */}
        <Table>
          {/* Adiciona cada posição do tabuleiro */}
          {table.map((row, rowIndex) => {
            const components = row.map((column, columnIndex) => {
              // Botão de cada posição
              return (
                <Button
                  key={`${rowIndex}${columnIndex}`}
                  // Seleciona posição ao clicar
                  onClick={() => selectPosition(rowIndex, columnIndex)}
                  // Desabilitado
                  disabled={
                    // Quando já foi selecionada
                    Boolean(table[rowIndex][columnIndex]) ||
                    // Quando acabou o jogo
                    Boolean(winner) ||
                    // Quando não é a vez do jogador
                    Boolean(mode && player ^ plays % 2)
                  }
                >
                  {/* Jogador que selecionou */}
                  {column}
                </Button>
              );
            });
            return components;
          })}
        </Table>
        {/* Lateral direita */}
        <Aside>
          {/* Quem é o jogador */}
          {Boolean(mode) && !Boolean(winner) && (
            <AsideDiv>
              <AppearingLabel>You're</AppearingLabel>
              <Player>{player ? "X" : "O"}</Player>
            </AsideDiv>
          )}
          {/* Vencedor */}
          {Boolean(winner) && (
            <AsideDiv>
              {winner !== "Draw" && <AppearingLabel>Winner</AppearingLabel>}
              <Player>{winner}</Player>
            </AsideDiv>
          )}
        </Aside>
      </Body>
    </Screen>
  );
};

export default App;
