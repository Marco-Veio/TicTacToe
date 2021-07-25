import styled from "styled-components";

// Componente da tela
export const Screen = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #474b53;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

// Header
export const Header = styled.h1`
  width: 100%;
  flex: 0.1;
  text-align: center;
  color: white;
`;

// Body
export const Body = styled.div`
  width: 100%;
  flex: 0.9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

// Posição lateral do corpo
export const Aside = styled.div`
  flex: 0.2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;
// Botão de jogar
export const Play = styled.button`
  flex: 0.1;
  width: 100%;
  min-height: 30px;
  border-radius: 1.8vw;
  background-color: #474b53;
  cursor: pointer;
  color: white;
  font-size: calc(15px + 2vmin);
  box-shadow: 3px 3px 0 1px rgba(0, 0, 0, 0.2);
  :hover {
    opacity: 0.7;
  }
`;

// Tabuleiro do jogo
export const Table = styled.div`
  grid-template: table;
  width: 50vh;
  height: 50vh;
  background-color: #000000;
  box-shadow: 3px 3px 0 1px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.2% 0.2%;
  grid-template-areas:
    ". . ."
    ". . ."
    ". . .";
`;
// Botões para selecionar posição
export const Button = styled.button`
  background-color: #474b53;
  cursor: pointer;
  color: white;
  font-size: calc(50px + 2vmin);
  font-family: "Tahoma";
  :hover {
    opacity: 0.9;
  }
  :disabled {
    cursor: not-allowed;
  }
`;

// Posição direita do corpo
export const Winner = styled.h1`
  color: white;
  font-size: calc(50px + 2vmin);
  font-family: "Tahoma";
`;
