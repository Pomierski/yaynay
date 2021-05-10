import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import PollResults from "../Components/Poll/PollResults";
import { getPoll } from "../Utility/api";

interface IdType {
  id: string;
}

interface ResultTypes {
  title: string;
  nayVotes: number;
  yayVotes: number;
}

const Results = (): JSX.Element => {
  const history = useHistory();
  let { id }: IdType = useParams();
  const [result, setResult] = useState<ResultTypes>({
    title: "",
    yayVotes: 0,
    nayVotes: 0,
  });

  useEffect(() => {
    const awaitData = async () => {
      const data = await getPoll(parseInt(id), () => {
        history.replace("/error404/");
      }).catch(() => {
        history.replace("/error404/");
        return null;
      });
      if (data !== null) {
        setResult(() => data);
      }
    };

    awaitData();
  }, [id, history]);
  return (
    <PollResults
      title={result.title}
      nayVotes={result.nayVotes}
      yayVotes={result.yayVotes}
    ></PollResults>
  );
};

export default Results;
