import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../Components/ErrorAlert";
import Poll from "../Components/Poll/Poll";
import { addPoll } from "../Utility/api";

const Index = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [displayError, setDisplayError] = useState<boolean>(false);
  const history = useHistory();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    setDisplayError(false);
  };

  const handleSubmit = (e?: { key: string; type: string }): void => {
    if (e?.key === "Enter" || e?.type === "click") {
      if (inputValue.length <= 3) {
        setDisplayError(true);
      }
      if (inputValue.length > 3) {
        addPoll(inputValue, () => {
          setDisplayError(true);
        })
          .then((resp) => {
            history.push(`/poll/${resp}`);
          })
          .catch(() => setDisplayError(true));
      }
    }
  };
  return (
    <>
      <Poll handleInput={handleInput} handleSubmit={handleSubmit} />
      <ErrorAlert display={displayError} setDisplay={setDisplayError}>
        {inputValue.length < 4
          ? "Your question must be atleast 4 characters long!"
          : ""}
      </ErrorAlert>
    </>
  );
};

export default Index;
