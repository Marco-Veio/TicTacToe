// Import módulos
import React, { useEffect, useState } from "react";
// Import componentes estilizados
import {
  Aside,
  Body,
  Button,
  Header,
  Play,
  Screen,
  Table,
  Winner,
  WinnerLabel,
} from "./styles";

/**
 * Componente da página
 * @returns Tela
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

  /**
   * Função para verificar se alguém venceu
   */
  useEffect(() => {
    // Se atingiram 9 jogadas
    if (plays === 9) {
      // Define velha
      setWinner("Draw");
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
            break;
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
            break;
          }
        }
      }
    }
  }, [table]);

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
    // Limpa o tabuleiro
    setTable([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    // Reinicia jogadas e define jogador como O
    setPlays(0);
  };

  return (
    // Tela
    <Screen>
      {/* Título */}
      <Header>Tic Tac Toe</Header>
      {/* Corpo da tela */}
      <Body>
        <Aside>
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
                  // Desabilitado quando já foi selecionada ou quando acabou o jogo
                  disabled={
                    Boolean(table[rowIndex][columnIndex]) || Boolean(winner)
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
        <Aside>
          {Boolean(winner) && winner !== "Draw" && (
            <WinnerLabel>Winner</WinnerLabel>
          )}
          {Boolean(winner) && <Winner>{winner}</Winner>}
        </Aside>
      </Body>
    </Screen>
  );
};

export default App;
