import styled from "styled-components";

const Header = styled.header`
  display: flex;
  align-items: center;
  @media (min-width: ${(props) => props.theme.screenSize.md}) {
    margin-bottom: 2rem;
  }
`;

export default Header;
