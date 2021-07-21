// Import módulos
import React, { useState } from "react";
// Import estilos
import "./App.css";

const App = () => {
  const [table, setTable] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  return (
    <div className="Screen">
      <div className="Table">
        {table.map((row) => {
          const components = row.map((column) => {
            return <button className="Button">{column}</button>;
          });
          return components;
        })}
      </div>
    </div>
  );
};

export default App;
