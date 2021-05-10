import styled from "styled-components";

const Button = styled.button<{ success?: boolean }>`
  background: ${(props) =>
    props.success ? props.theme.colors.green : props.theme.colors.red};
  padding: 12px 24px;
  color: #fff;
  border: 0;
`;

export default Button;
