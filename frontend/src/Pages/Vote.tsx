import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../Components/ErrorAlert";
import PollVote from "../Components/Poll/PollVote";
import { getPoll, vote, checkVote, Votes } from "../Utility/api";

interface IdType {
  id: string;
}

const Vote = (): JSX.Element => {
  let { id }: IdType = useParams();
  const history = useHistory();
  const [title, setTitle] = useState<string>("");
  const [disableVote, setDisableVote] = useState<boolean>(false);
  const [displayError, setDisplayError] = useState<boolean>(false);

  useEffect(() => {
    const waitForData = async (): Promise<void> => {
      setDisplayError(false);
      const data = await getPoll(parseInt(id), () => {
        history.replace("/error404/");
      }).catch(() => {
        history.replace("/error404/");
        return null;
      });
      if (data !== null) {
        setTitle(data.title);
      }
      const { alreadyVoted } = await checkVote(parseInt(id), () => {
        setDisplayError(true);
      });
      if (alreadyVoted) {
        setDisableVote(true);
        setTimeout(() => {
          history.replace(`/poll/${id}/results`);
        }, 3000);
      }
    };
    waitForData();
    return () => {
      setTitle("");
      setDisableVote(true);
    };
  }, [id, history]);

  const votePositive = async (): Promise<void> => {
    await vote(Votes.Yay, parseInt(id), () => {
      setDisplayError(true);
    })
      .then(() => {
        if (!displayError) history.replace(`/poll/${id}/results`);
      })
      .catch(() => setDisplayError(true));
  };

  const voteNegative = async (): Promise<void> => {
    await vote(Votes.Nay, parseInt(id), () => {
      setDisplayError(true);
    })
      .then(() => {
        if (!displayError) history.replace(`/poll/${id}/results`);
      })
      .catch(() => setDisplayError(true));
  };

  return (
    <>
      <PollVote
        title={title}
        onYay={votePositive}
        onNay={voteNegative}
        disabled={disableVote}
      ></PollVote>
      <ErrorAlert display={displayError} setDisplay={setDisplayError} />
    </>
  );
};

export default Vote;
