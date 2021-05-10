import { CgPoll } from "react-icons/cg";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Heading = styled.h1`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:visited {
    color: inherit;
  }
`;

const Icon = styled(CgPoll)`
  margin-left: 0.5rem;
`;

const Brand = (): JSX.Element => (
  <StyledLink to="/">
    <Heading>
      YayNay <Icon />
    </Heading>
  </StyledLink>
);

export default Brand;
