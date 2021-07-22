// Import módulos
import React, { useState } from "react";
// Import componentes estilizados
import { Screen, Table, Button } from "./styles";

/**
 * Componente da página
 * @returns Tela
 */
const App = () => {
  // Jogador atual (false = O, true = X)
  const [player, setPlayer] = useState(false);
  // Tabuleiro
  const [table, setTable] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

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
                // Desabilitado quando já foi selecionada
                disabled={Boolean(table[rowIndex][columnIndex])}
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
