import { MysqlError, queryCallback } from "mysql";

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const config = require("./config.json");
const port: number = config.server.port;

const connection = mysql.createConnection(config);

const sqlError = (err: MysqlError | string): string =>
  JSON.stringify({
    message: "Database error",
    error: err,
  });

const reqSuccesful = (result: string | number | object): string =>
  JSON.stringify({
    message: "Request successful",
    result: result,
  });

app.use(express.json());

if (config.server.useCors) {
  app.use(cors());
}

app.get(
  "/getPoll",
  async (req, res): Promise<void> => {
    const id: number = parseInt(req.query.id);

    if (!id || id <= 0) {
      return res
        .status(400)
        .send(sqlError('Incorrectly specified "ID" parameter'));
    }

    connection.query(
      `SELECT * FROM polls WHERE id = ${id}`,
      (err: MysqlError, results: Array<string>) => {
        if (err) {
          return res.status(404).send(sqlError(err));
        }
        if (results.length === 0) {
          return res.status(404).send(sqlError("404 not found"));
        }
        if (results.length > 0) {
          return res.status(200).send(reqSuccesful(results[0]));
        }
      }
    );
  }
);

app.get(
  "/checkVote",
  async (req, res): Promise<void> => {
    const id: number = parseInt(req.query.id);
    const ip: string = req.ip;

    if (!id || id <= 0)
      return res
        .status(400)
        .send(sqlError('Incorrectly specified "ID" parameter'));

    connection.query(
      `SELECT * from votes WHERE poll_id = ${id} AND ip = "${ip}"`,
      (err: MysqlError, results: Array<{ alreadyVoted: boolean }>) => {
        if (err) {
          return res.status(404).send(sqlError(err));
        }
        if (results.length > 0) {
          return res.status(200).send(reqSuccesful({ alreadyVoted: true }));
        }
        if (results.length === 0) {
          return res.status(200).send(reqSuccesful({ alreadyVoted: false }));
        }
      }
    );
  }
);

app.post(
  "/votePoll",
  async (req, res): Promise<void> => {
    const voteType: string = req.body.voteType;
    const id: number = req.body.id;
    const ip: string = req.ip;

    connection.query(
      `SELECT * from votes WHERE poll_id = ${id} AND ip = "${ip}"`,
      (err: MysqlError, results: Array<string>) => {
        if (err) {
          return res.status(404).send(sqlError(err));
        }
        if (results.length > 0) {
          return res.status(403).send(sqlError("user already voted"));
        }
        if (results.length === 0) {
          connection.query(
            `INSERT INTO votes (ip, poll_id) VALUES ('${ip}', ${id})`,
            (err: MysqlError) => {
              if (err) return res.status(404).send(sqlError(err));
            }
          );
          connection.query(
            `UPDATE polls SET ${voteType} = ${voteType} + 1 WHERE id = ${id}`,
            (err: MysqlError) => {
              if (err) {
                return res.status(404).send(sqlError(err));
              }
              return res.status(200).send(reqSuccesful(id));
            }
          );
        }
      }
    );
  }
);

app.post(
  "/addPoll",
  async (req, res): Promise<void> => {
    const title: string = req.body.title;
    if (title.length < 3)
      return res.status(400).send(sqlError("Title too short"));
    connection.query(
      `INSERT INTO polls (title, yayVotes, nayVotes) VALUES ('${title}', 0, 0)`,
      (err: MysqlError, results: { insertId: number }): queryCallback => {
        if (err) {
          console.log(err);
          return res.status(404).send(sqlError(err));
        }
        return res.status(200).send(reqSuccesful(results.insertId));
      }
    );
  }
);

app.listen(port, (): void => {
  console.log(`Example app listening at http://localhost:${port}`);
});
