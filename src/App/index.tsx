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

  const selectPosition = (row: number, column: number) => {
    const temp = [...table];
    if (!temp[row][column]) {
      temp[row][column] = player ? "X" : "O";
      setPlayer(!player);
    }
    setTable(temp);
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
              <Button onClick={() => selectPosition(rowIndex, columnIndex)}>
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
