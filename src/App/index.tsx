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
      for (const index in table) {
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
      // Se atingiram 9 jogadas
      if (plays === 9) {
        // Define velha
        setWinner("Draw");
        // Sai da função
        return;
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
    // Inicia posições a jogar
    let row = 0,
      column = 0;
    // Se o bot estiver acima do fácil
    if (mode > 1) {
      // Verifica onde o jogo irá acabar
      const missingOne = checkMissingOne();
      // Se houver como ganhar ou impedir a derrota
      if (missingOne.win[0] || missingOne.lose[0]) {
        // Recebe linha e coluna priorizando a vitória
        const row = Number(missingOne[missingOne.win[0] ? "win" : "lose"][1]);
        const column = Number(
          missingOne[missingOne.win[0] ? "win" : "lose"][2]
        );
        // Seleciona posição
        selectPosition(row, column);
        // Sai da função
        return;
      }
    }

    // Se o bot estiver acima do médio
    if (mode > 2) {
      // Define posições boas
      let goodPositions = [
        [0, 0],
        [0, 2],
        [2, 0],
        [2, 2],
      ];

      // Se o bot estiver acima do difícil
      if (mode > 3) {
        // Inicia posições boas ocupadas pelo jogador
        const playerGoodPositions = [] as number[][];

        // Procura por posição boa
        for (const goodPosition of goodPositions) {
          // Se o player for O e tiver ocupado a posição boa
          if (!player && table[goodPosition[0]][goodPosition[1]] === "O") {
            // Adiciona posições boas ocupadas pelo jogador
            playerGoodPositions.push(goodPosition);
          }
        }

        // Se houver posição boa ocupada pelo jogador
        if (playerGoodPositions.length) {
          // Se for a segunda jogada
          if (plays === 1) {
            // Seleciona meio
            selectPosition(1, 1);
            // Sai da função
            return;
          }
          // Se for a quarta e o meio não for do jogador
          if (plays === 3 && table[1][1] !== "O") {
            // Muda posições boas
            goodPositions = [
              [0, 1],
              [1, 0],
              [1, 2],
              [2, 1],
            ];
          }
        }
      }

      // Inicia posições boas
      const freeGoodPositions = [] as number[][];

      // Procura por posição boa
      for (const goodPosition of goodPositions) {
        // Se a posição estiver desocupada
        if (!Boolean(table[goodPosition[0]][goodPosition[1]])) {
          // Adiciona nas posições boas desocupadas
          freeGoodPositions.push(goodPosition);
        }
      }

      // Se houver posição boa desocupada
      if (freeGoodPositions.length) {
        // Para cada posição boa desocupada
        for (const position of freeGoodPositions) {
          // Recebe linhas e colunas opostas
          const row = position[0] ? 0 : 2;
          const column = position[1] ? 0 : 2;
          // Se a oposta estiver ocupada
          if (Boolean(table[row][column])) {
            // Seleciona a posição
            selectPosition(position[0], position[1]);
            // Sai da função
            return;
          }
        }
        // Sorteia uma delas
        const position = sort(0, freeGoodPositions.length - 1);
        // Seleciona posição boa
        selectPosition(
          freeGoodPositions[position][0],
          freeGoodPositions[position][1]
        );
        // Sai da função
        return;
      }
    }

    // Sorteia linha e coluna
    row = sort(0, 2);
    column = sort(0, 2);
    // Enquanto essa posição estiver ocupada
    while (Boolean(table[row][column])) {
      // Sorteia novamente
      row = sort(0, 2);
      column = sort(0, 2);
    }

    // Seleciona posição
    selectPosition(row, column);
    // Sai da função
    return;
  };

  const checkMissingOne = () => {
    // Inicia saída informando se o bot pode ganhar ou perder e onde jogar
    const output = {
      win: [false, 0, 0],
      lose: [false, 0, 0],
    };
    // Cria cópia do tabuleiro
    const temp = [...table];
    // Se for vencer na primeira casa
    if (
      !temp[0][0] &&
      ((temp[0][1] &&
        player !== (temp[0][1] === "X" ? 1 : 0) &&
        temp[0][1] === temp[0][2]) ||
        (temp[1][0] &&
          player !== (temp[1][0] === "X" ? 1 : 0) &&
          temp[1][0] === temp[2][0]) ||
        (temp[1][1] &&
          player !== (temp[1][1] === "X" ? 1 : 0) &&
          temp[1][1] === temp[2][2]))
    ) {
      // Define posição de vitória
      output.win = [true, 0, 0];
      // Retorna saída
      return output;
    }
    // Se for perder na primeira casa
    if (
      !temp[0][0] &&
      ((temp[0][1] &&
        player === (temp[0][1] === "X" ? 1 : 0) &&
        temp[0][1] === temp[0][2]) ||
        (temp[1][0] &&
          player === (temp[1][0] === "X" ? 1 : 0) &&
          temp[1][0] === temp[2][0]) ||
        (temp[1][1] &&
          player === (temp[1][1] === "X" ? 1 : 0) &&
          temp[1][1] === temp[2][2]))
    ) {
      // Define posição de derrota
      output.lose = [true, 0, 0];
    }
    // Se for vencer na segunda casa
    if (
      !temp[0][1] &&
      ((temp[0][2] &&
        player !== (temp[0][2] === "X" ? 1 : 0) &&
        temp[0][2] === temp[0][0]) ||
        (temp[1][1] &&
          player !== (temp[1][1] === "X" ? 1 : 0) &&
          temp[1][1] === temp[2][1]))
    ) {
      // Define posição de vitória
      output.win = [true, 0, 1];
      // Retorna saída
      return output;
    }
    // Se for perder na segunda casa
    if (
      !temp[0][1] &&
      ((temp[0][2] &&
        player === (temp[0][2] === "X" ? 1 : 0) &&
        temp[0][2] === temp[0][0]) ||
        (temp[1][1] &&
          player === (temp[1][1] === "X" ? 1 : 0) &&
          temp[1][1] === temp[2][1]))
    ) {
      // Define posição de derrota
      output.lose = [true, 0, 1];
    }
    // Se for vencer na terceira casa
    if (
      !temp[0][2] &&
      ((temp[0][0] &&
        player !== (temp[0][0] === "X" ? 1 : 0) &&
        temp[0][0] === temp[0][1]) ||
        (temp[1][2] &&
          player !== (temp[1][2] === "X" ? 1 : 0) &&
          temp[1][2] === temp[2][2]) ||
        (temp[1][1] &&
          player !== (temp[1][1] === "X" ? 1 : 0) &&
          temp[1][1] === temp[2][0]))
    ) {
      // Define posição de vitória
      output.win = [true, 0, 2];
      // Retorna saída
      return output;
    }
    // Se for perder na terceira casa
    if (
      !temp[0][2] &&
      ((temp[0][0] &&
        player === (temp[0][0] === "X" ? 1 : 0) &&
        temp[0][0] === temp[0][1]) ||
        (temp[1][2] &&
          player === (temp[1][2] === "X" ? 1 : 0) &&
          temp[1][2] === temp[2][2]) ||
        (temp[1][1] &&
          player === (temp[1][1] === "X" ? 1 : 0) &&
          temp[1][1] === temp[2][0]))
    ) {
      // Define posição de derrota
      output.lose = [true, 0, 2];
    }
    // Se for vencer na quarta casa
    if (
      !temp[1][0] &&
      ((temp[1][1] &&
        player !== (temp[1][1] === "X" ? 1 : 0) &&
        temp[1][1] === temp[1][2]) ||
        (temp[2][0] &&
          player !== (temp[2][0] === "X" ? 1 : 0) &&
          temp[2][0] === temp[0][0]))
    ) {
      // Define posição de vitória
      output.win = [true, 1, 0];
      // Retorna saída
      return output;
    }
    // Se for perder na quarta casa
    if (
      !temp[1][0] &&
      ((temp[1][1] &&
        player === (temp[1][1] === "X" ? 1 : 0) &&
        temp[1][1] === temp[1][2]) ||
        (temp[2][0] &&
          player === (temp[2][0] === "X" ? 1 : 0) &&
          temp[2][0] === temp[0][0]))
    ) {
      // Define posição de derrota
      output.lose = [true, 1, 0];
    }
    // Se for vencer na quinta casa
    if (
      !temp[1][1] &&
      ((temp[1][2] &&
        player !== (temp[1][2] === "X" ? 1 : 0) &&
        temp[1][2] === temp[1][0]) ||
        (temp[2][1] &&
          player !== (temp[2][1] === "X" ? 1 : 0) &&
          temp[2][1] === temp[0][1]) ||
        (temp[2][2] &&
          player !== (temp[2][2] === "X" ? 1 : 0) &&
          temp[2][2] === temp[0][0]) ||
        (temp[2][0] &&
          player !== (temp[2][0] === "X" ? 1 : 0) &&
          temp[2][0] === temp[0][2]))
    ) {
      // Define posição de vitória
      output.win = [true, 1, 1];
      // Retorna saída
      return output;
    }
    // Se for perder na quinta casa
    if (
      !temp[1][1] &&
      ((temp[1][2] &&
        player === (temp[1][2] === "X" ? 1 : 0) &&
        temp[1][2] === temp[1][0]) ||
        (temp[2][1] &&
          player === (temp[2][1] === "X" ? 1 : 0) &&
          temp[2][1] === temp[0][1]) ||
        (temp[2][2] &&
          player === (temp[2][2] === "X" ? 1 : 0) &&
          temp[2][2] === temp[0][0]) ||
        (temp[2][0] &&
          player === (temp[2][0] === "X" ? 1 : 0) &&
          temp[2][0] === temp[0][2]))
    ) {
      // Define posição de derrota
      output.lose = [true, 1, 1];
    }
    // Se for vencer na sexta casa
    if (
      !temp[1][2] &&
      ((temp[1][0] &&
        player !== (temp[1][0] === "X" ? 1 : 0) &&
        temp[1][0] === temp[1][1]) ||
        (temp[2][2] &&
          player !== (temp[2][2] === "X" ? 1 : 0) &&
          temp[2][2] === temp[0][2]))
    ) {
      // Define posição de vitória
      output.win = [true, 1, 2];
      // Retorna saída
      return output;
    }
    // Se for perder na sexta casa
    if (
      !temp[1][2] &&
      ((temp[1][0] &&
        player === (temp[1][0] === "X" ? 1 : 0) &&
        temp[1][0] === temp[1][1]) ||
        (temp[2][2] &&
          player === (temp[2][2] === "X" ? 1 : 0) &&
          temp[2][2] === temp[0][2]))
    ) {
      // Define posição de derrota
      output.lose = [true, 1, 2];
    }
    // Se for vencer na sétima casa
    if (
      !temp[2][0] &&
      ((temp[2][1] &&
        player !== (temp[2][1] === "X" ? 1 : 0) &&
        temp[2][1] === temp[2][2]) ||
        (temp[0][0] &&
          player !== (temp[0][0] === "X" ? 1 : 0) &&
          temp[0][0] === temp[1][0]) ||
        (temp[0][2] &&
          player !== (temp[0][2] === "X" ? 1 : 0) &&
          temp[0][2] === temp[1][1]))
    ) {
      // Define posição de vitória
      output.win = [true, 2, 0];
      // Retorna saída
      return output;
    }
    // Se for perder na sétima casa
    if (
      !temp[2][0] &&
      ((temp[2][1] &&
        player === (temp[2][1] === "X" ? 1 : 0) &&
        temp[2][1] === temp[2][2]) ||
        (temp[0][0] &&
          player === (temp[0][0] === "X" ? 1 : 0) &&
          temp[0][0] === temp[1][0]) ||
        (temp[0][2] &&
          player === (temp[0][2] === "X" ? 1 : 0) &&
          temp[0][2] === temp[1][1]))
    ) {
      // Define posição de derrota
      output.lose = [true, 2, 0];
    }
    // Se for vencer na oitava casa
    if (
      !temp[2][1] &&
      ((temp[2][2] &&
        player !== (temp[2][2] === "X" ? 1 : 0) &&
        temp[2][2] === temp[2][0]) ||
        (temp[0][1] &&
          player !== (temp[0][1] === "X" ? 1 : 0) &&
          temp[0][1] === temp[1][1]))
    ) {
      // Define posição de vitória
      output.win = [true, 2, 1];
      // Retorna saída
      return output;
    }
    // Se for perder na oitava casa
    if (
      !temp[2][1] &&
      ((temp[2][2] &&
        player === (temp[2][2] === "X" ? 1 : 0) &&
        temp[2][2] === temp[2][0]) ||
        (temp[0][1] &&
          player === (temp[0][1] === "X" ? 1 : 0) &&
          temp[0][1] === temp[1][1]))
    ) {
      // Define posição de derrota
      output.lose = [true, 2, 1];
    }
    // Se for vencer na nona casa
    if (
      !temp[2][2] &&
      ((temp[2][0] &&
        player !== (temp[2][0] === "X" ? 1 : 0) &&
        temp[2][0] === temp[2][1]) ||
        (temp[0][2] &&
          player !== (temp[0][2] === "X" ? 1 : 0) &&
          temp[0][2] === temp[1][2]) ||
        (temp[0][0] &&
          player !== (temp[0][0] === "X" ? 1 : 0) &&
          temp[0][0] === temp[1][1]))
    ) {
      // Define posição de vitória
      output.win = [true, 2, 2];
      // Retorna saída
      return output;
    }
    // Se for perder na nona casa
    if (
      !temp[2][2] &&
      ((temp[2][0] &&
        player === (temp[2][0] === "X" ? 1 : 0) &&
        temp[2][0] === temp[2][1]) ||
        (temp[0][2] &&
          player === (temp[0][2] === "X" ? 1 : 0) &&
          temp[0][2] === temp[1][2]) ||
        (temp[0][0] &&
          player === (temp[0][0] === "X" ? 1 : 0) &&
          temp[0][0] === temp[1][1]))
    ) {
      // Define posição de derrota
      output.lose = [true, 2, 2];
    }
    return output;
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
