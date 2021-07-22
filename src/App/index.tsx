// Import módulos
import React, { useState } from "react";
// Import componentes estilizados
import { Screen, Table, Button } from "./styles";

/**
 * Componente da página
 * @returns Tela
 */
const App = () => {
  // Tabuleiro
  const [table, setTable] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  return (
    // Tela
    <Screen>
      {/* Tabuleiro */}
      <Table>
        {/* Adiciona cada posição do tabuleiro */}
        {table.map((row) => {
          const components = row.map((column) => {
            return <Button>{column}</Button>;
          });
        })}
      </Table>
    </Screen>
  );
};

export default App;
