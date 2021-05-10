import Wrapper from "./PollWrapper";
import ProgressBar from "./ProgressBar";

interface PropTypes {
  title: string;
  yayVotes: number;
  nayVotes: number;
  date?: Date;
}

const PollResults = ({
  title,
  yayVotes,
  nayVotes,
  date,
}: PropTypes): JSX.Element => {
  return (
    <Wrapper>
      <h2>{title}</h2>
      <h3>Yay</h3>
      <ProgressBar
        progress={yayVotes}
        max={yayVotes + nayVotes}
        positive
      ></ProgressBar>
      <h3>Nay</h3>
      <ProgressBar progress={nayVotes} max={yayVotes + nayVotes}></ProgressBar>
    </Wrapper>
  );
};

export default PollResults;
