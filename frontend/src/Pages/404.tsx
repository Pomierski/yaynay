import styled from "styled-components";
import errorSVG from "../Assets/404.svg";

const Wrapper = styled.div`
  display: flex;
  max-width: 400px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Error404 = (): JSX.Element => (
  <Wrapper>
    <h2>Something went wrong</h2>
    <p>There may be a problem with your url or our servers</p>
    <StyledImg src={errorSVG} alt="error 404" />
  </Wrapper>
);

export default Error404;
