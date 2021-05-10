import styled from "styled-components";

const Input = styled.input`
  border: 0;
  border-bottom: 1px solid #777e89;
  color: #fff;
  background: none;
  padding: 0.5rem 0;
  width: 100%;
  font-size: 1rem;
  &::placeholder {
    color: #777e89;
  }

  @media (min-width: ${(props) => props.theme.screenSize.md}) {
    font-size: ${(props) => props.theme.fontSize.regular};
  }
`;

export default Input;
