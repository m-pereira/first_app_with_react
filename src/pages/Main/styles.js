import styled from "styled-components";

// com o styled components podemos escrever o css todo como js, fazer os encadeamentos, etc...

export const Title = styled.h1`
  font-size: 24px;
  color: ${(props) => (props.error ? "red" : "#7159c1")};
  font-family: Arial, Helvetica, sans-serif;

  small {
    font-size: 14px;
    color: #333;
  }
`;

export const Paragraph = styled.p`
  color: blue;
`;
