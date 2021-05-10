import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: ${(props) => props.theme.screenSize.md}) {
    max-width: 768px;
    margin: 0 auto;
    width: 768px;
  }
`;

export default Container;
