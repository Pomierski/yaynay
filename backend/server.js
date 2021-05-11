"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var mysql = require("mysql");
var app = express();
var config = require("./config.json");
var port = config.server.port;
var connection = mysql.createConnection(config);
var sqlError = function (err) {
    return JSON.stringify({
        message: "Database error",
        error: err
    });
};
var reqSuccesful = function (result) {
    return JSON.stringify({
        message: "Request successful",
        result: result
    });
};
app.use(express.json());
if (config.server.useCors) {
    app.use(cors());
}
app.get("/getPoll", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = parseInt(req.query.id);
        if (!id || id <= 0) {
            return [2 /*return*/, res
                    .status(400)
                    .send(sqlError('Incorrectly specified "ID" parameter'))];
        }
        connection.query("SELECT * FROM polls WHERE id = " + id, function (err, results) {
            if (err) {
                return res.status(404).send(sqlError(err));
            }
            if (results.length === 0) {
                return res.status(404).send(sqlError("404 not found"));
            }
            if (results.length > 0) {
                return res.status(200).send(reqSuccesful(results[0]));
            }
        });
        return [2 /*return*/];
    });
}); });
app.get("/checkVote", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, ip;
    return __generator(this, function (_a) {
        id = parseInt(req.query.id);
        ip = req.ip;
        if (!id || id <= 0)
            return [2 /*return*/, res
                    .status(400)
                    .send(sqlError('Incorrectly specified "ID" parameter'))];
        connection.query("SELECT * from votes WHERE poll_id = " + id + " AND ip = \"" + ip + "\"", function (err, results) {
            if (err) {
                return res.status(404).send(sqlError(err));
            }
            if (results.length > 0) {
                return res.status(200).send(reqSuccesful({ alreadyVoted: true }));
            }
            if (results.length === 0) {
                return res.status(200).send(reqSuccesful({ alreadyVoted: false }));
            }
        });
        return [2 /*return*/];
    });
}); });
app.post("/votePoll", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var voteType, id, ip;
    return __generator(this, function (_a) {
        voteType = req.body.voteType;
        id = req.body.id;
        ip = req.ip;
        connection.query("SELECT * from votes WHERE poll_id = " + id + " AND ip = \"" + ip + "\"", function (err, results) {
            if (err) {
                return res.status(404).send(sqlError(err));
            }
            if (results.length > 0) {
                return res.status(403).send(sqlError("user already voted"));
            }
            if (results.length === 0) {
                connection.query("INSERT INTO votes (ip, poll_id) VALUES ('" + ip + "', " + id + ")", function (err) {
                    if (err)
                        return res.status(404).send(sqlError(err));
                });
                connection.query("UPDATE polls SET " + voteType + " = " + voteType + " + 1 WHERE id = " + id, function (err) {
                    if (err) {
                        return res.status(404).send(sqlError(err));
                    }
                    return res.status(200).send(reqSuccesful(id));
                });
            }
        });
        return [2 /*return*/];
    });
}); });
app.post("/addPoll", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title;
    return __generator(this, function (_a) {
        title = req.body.title;
        if (title.length < 3)
            return [2 /*return*/, res.status(400).send(sqlError("Title too short"))];
        connection.query("INSERT INTO polls (title, yayVotes, nayVotes) VALUES ('" + title + "', 0, 0)", function (err, results) {
            if (err) {
                console.log(err);
                return res.status(404).send(sqlError(err));
            }
            return res.status(200).send(reqSuccesful(results.insertId));
        });
        return [2 /*return*/];
    });
}); });
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
