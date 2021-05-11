import SERVER_URL from "../server-url.json";

console.log(SERVER_URL);

interface ApiResponse extends Response {
  result: string | object | number;
  alreadyVoted: boolean;
}

interface Poll extends Response {
  title: string;
  yayVotes: number;
  nayVotes: number;
  date: Date;
}

export enum Votes {
  Yay = "yayVotes",
  Nay = "nayVotes",
}

export const addPoll = (
  title: string,
  onError: Function
): Promise<ApiResponse> =>
  fetch(`${SERVER_URL}/addPoll`, {
    method: "POST",
    body: JSON.stringify({ title: title }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        onError();
        return Promise.reject(resp.status);
      }
    })
    .then((resp) => resp.result);

export const getPoll = (id: number, onError: Function): Promise<Poll> =>
  fetch(`${SERVER_URL}/getPoll?id=${id}`)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        onError();
        return Promise.reject(resp.status);
      }
    })
    .then((resp) => resp.result);

export const checkVote = (
  id: number,
  onError: Function
): Promise<ApiResponse> =>
  fetch(`${SERVER_URL}/checkVote?id=${id}`)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        onError();
        return Promise.reject(resp.status);
      }
    })
    .then((resp) => resp.result);

export const vote = (
  voteType: Votes,
  id: number,
  onError: Function
): Promise<ApiResponse> =>
  fetch(`${SERVER_URL}/votePoll`, {
    method: "POST",
    body: JSON.stringify({ voteType: voteType, id: id }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        onError();
        return Promise.reject(resp.status);
      }
    })
    .then((resp) => resp.result);
