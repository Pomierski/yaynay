import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.accent};
  flex: 1;
  margin: 0 1rem;
  padding: 2rem;
  box-shadow: 0 15px 24px -10px rgb(0 0 0 / 15%);
  animation: ${fadeIn} 0.25s ease-in;
  @media (min-width: ${(props) => props.theme.screenSize.md}) {
    width: 600px;
    margin: 0 auto;
  }
`;

export default Wrapper;
