import styled from "styled-components";
import Button from "../Button";
import Wrapper from "./PollWrapper";

interface PropTypes {
  title: string;
  onYay(): void;
  onNay(): void;
  disabled: boolean;
}

const StyledButton = styled(Button)`
  margin: 1rem;
  margin-left: 0;
`;

const PollVote = ({
  title,
  onYay,
  onNay,
  disabled,
}: PropTypes): JSX.Element => {
  return (
    <Wrapper>
      <h2>{title}</h2>
      {disabled ? (
        <p>You already voted. Redirecting to results...</p>
      ) : (
        <>
          <StyledButton success onClick={onYay}>
            Yay
          </StyledButton>
          <StyledButton onClick={onNay}>Nay</StyledButton>
        </>
      )}
    </Wrapper>
  );
};

export default PollVote;
