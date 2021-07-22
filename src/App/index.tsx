// Import módulos
import React, { useEffect, useState } from "react";
// Import componentes estilizados
import { Screen, Table, Button } from "./styles";

/**
 * Componente da página
 * @returns Tela
 */
const App = () => {
  // Jogo iniciado
  const [started, setStarted] = useState(false);
  // Jogador atual (false = O, true = X)
  const [player, setPlayer] = useState(false);
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
    // Se o jogo iniciou
    if (started) {
      // Para cada linha
      for (const row of table) {
        // Se a linha estiver completa por um jogador
        if (row[0] === row[1] && row[1] === row[2]) {
          // Define-o como vencedor
          setWinner(row[0]);
          // Sai da função
          return;
        }
      }
      // Para cada coluna
      for (const column in table[0]) {
        // Se a coluna estiver completa por um jogador
        if (
          table[0][column] === table[1][column] &&
          table[1][column] === table[2][column]
        ) {
          // Define-o como vencedor
          setWinner(table[0][column]);
          // Sai da função
          return;
        }
      }
      // Se uma diagonal estiver completa por um jogador
      if (
        (table[0][0] === table[1][1] && table[1][1] === table[2][2]) ||
        (table[0][2] === table[1][1] && table[1][1] === table[2][0])
      ) {
        // Define-o como vencedor
        setWinner(table[1][1]);
      }
    }
  }, [table]);

  /**
   * Função para selecionar uma posição
   * @param row Número da linha da posição desejada
   * @param column Número da coluna da posição desejada
   */
  const selectPosition = (row: number, column: number) => {
    // Se for a primeira jogada
    if (!started) {
      // Inicia o jogo
      setStarted(true);
    }
    // Cria cópia do tabuleiro
    const temp = [...table];
    // Se a posição desejada não estiver ocupada
    if (!temp[row][column]) {
      // Seleciona posição de acordo com o jogador da vez
      temp[row][column] = player ? "X" : "O";
      // Muda de jogador
      setPlayer(!player);
      // Atualiza tabuleiro
      setTable(temp);
    }
  };

  return (
    // Tela
    <Screen>
      {/* Tabuleiro */}
      <Table>
        {/* Adiciona cada posição do tabuleiro */}
        {table.map((row, rowIndex) => {
          const components = row.map((column, columnIndex) => {
            // Botão de cada posição
            return (
              <Button
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
    </Screen>
  );
};

export default App;
