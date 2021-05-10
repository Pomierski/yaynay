import styled from "styled-components";
import Button from "../Button";
import Input from "./Input";
import Wrapper from "./PollWrapper";

const StyledButton = styled(Button)`
  margin: 1rem 0;
`;

interface PropTypes {
  handleSubmit(): void;
  handleInput(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Poll = ({ handleSubmit, handleInput }: PropTypes): JSX.Element => {
  return (
    <Wrapper>
      <Input
        placeholder="Type your question here"
        onChange={handleInput}
        onKeyDown={handleSubmit}
      />
      <StyledButton success onClick={handleSubmit}>
        Create Poll
      </StyledButton>
    </Wrapper>
  );
};

export default Poll;
