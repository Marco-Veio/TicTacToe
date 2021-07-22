import styled from "styled-components";

// Componente da tela
export const Screen = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #474b53;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Tabuleiro do jogo
export const Table = styled.div`
  width: calc(100px + 50vh);
  height: calc(100px + 50vh);
  background-color: #000000;
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
export const Button = styled.div`
  background-color: #474b53;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;
