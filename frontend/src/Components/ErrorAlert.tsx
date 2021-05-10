import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { BiError } from "react-icons/bi";

interface PropTypes {
  display: boolean;
  children?: React.ReactNode;
  setDisplay: Function;
}

const slideInAndOut = keyframes`
    0% {
        transform: translateY(-100%)
    }
    10% {
        transform: translateY(15px)
    }
    90% {
        transform: translateY(15px)
    }
    100% {
        transform: translateY(-100%)
    }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 1rem;
  animation: ${slideInAndOut} 4s ease-in-out forwards;
  width: auto;
  padding: 0.5rem;
  background: #4c1919;
  border-radius: 5px;

  @media (min-width: ${(props) => props.theme.screenSize.md}) {
    margin: 0 auto;
    width: 400px;
  }
`;

const Title = styled.h3`
  margin: 0.5rem 0;
  padding: 0;
  display: flex;
  align-items: center;

  & > svg {
    margin-left: 0.25rem;
  }
`;

const Content = styled.p`
  margin: 0.5rem 0;
  padding: 0;
  color: #dfdfdf;
`;

const ErrorAlert = ({
  children,
  display,
  setDisplay,
}: PropTypes): JSX.Element | null => {
  useEffect(() => {
    const remover = setTimeout(() => {
      setDisplay(false);
    }, 4000);
    return () => {
      clearTimeout(remover);
    };
  }, [display, setDisplay]);

  return display ? (
    <Wrapper>
      <Title>
        Error <BiError />
      </Title>
      <Content>
        {children || "Please check your internet connection or try again later"}
      </Content>
    </Wrapper>
  ) : null;
};

export default ErrorAlert;
