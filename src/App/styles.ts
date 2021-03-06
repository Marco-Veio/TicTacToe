// Import módulos
import styled, { keyframes } from "styled-components";

// Animação de aparecer aos poucos o vencedor
const appearing = keyframes`
  from {
    opacity: 0;
    font-size: 0;
  }
  to {
    opacity: 1;
    font-size: calc(15px + 2vmin);
  }
`;

// Componente da tela
export const Screen = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
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
// Div do dentro das laterais
export const AsideDiv = styled.div`
  width: 100%;
  flex: 0.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
`;
// Seleção modo de jogo
export const Mode = styled.select`
  flex: 0.5;
  width: 100%;
  min-height: 30px;
  border-radius: 1.8vw;
  background-color: #474b53;
  cursor: pointer;
  color: white;
  font-size: calc(15px + 2vmin);
  box-shadow: 3px 3px 0 1px rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  :hover {
    opacity: 0.7;
  }
`;
// Botão de jogar
export const Play = styled.button`
  flex: 0.08;
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
// Escritas laterais
export const Label = styled.h1`
  flex: 0.5;
  color: white;
  font-size: calc(15px + 2vmin);
`;
// Jogador
export const Player = styled.h1`
  color: white;
  font-size: calc(30px + 2vmin);
  font-family: "Tahoma";
  animation-name: ${appearing};
  animation-duration: 1s;
`;
// Escritas Laterais com animação de aparecer
export const AppearingLabel = styled.h1`
  color: white;
  font-size: calc(15px + 2vmin);
  animation-name: ${appearing};
  animation-duration: 1s;
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
// Tabuleiro do jogo
export const Table = styled.div`
  grid-template: table;
  width: 50vmin;
  height: 50vmin;
  min-width: calc(105px + 3.2vh);
  min-height: calc(105px + 3.2vh);
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
  min-height: calc(35px + 3vh);
  min-width: calc(35px + 3vh);
  background-color: #474b53;
  cursor: pointer;
  color: white;
  font-size: calc(30px + 3vh);
  font-family: "Tahoma";
  :hover {
    opacity: 0.9;
  }
  :disabled {
    cursor: not-allowed;
  }
`;
