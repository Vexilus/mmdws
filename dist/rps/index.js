"use strict";
// node index <rock, paper, or scissors>
Object.defineProperty(exports, "__esModule", { value: true });
// input
// opponent
// output
// dot notation - bracket notation
// validation
const node_path_1 = require("node:path");
var RPS;
(function (RPS) {
    RPS["ROCK"] = "rock";
    RPS["PAPER"] = "paper";
    RPS["SCISSORS"] = "scissors";
    RPS["SPOCK"] = "spock";
    RPS["POGGIES"] = "poggies";
    RPS["LIZARD"] = "lizard";
    RPS["GUN"] = "gun";
})(RPS || (RPS = {}));
function pickOne(arr) {
    const choice = Math.floor(Math.random() * arr.length);
    return arr[choice];
}
const beatenBy = {
    [RPS.ROCK]: new Set([RPS.PAPER, RPS.SPOCK, RPS.POGGIES]),
    [RPS.PAPER]: new Set([RPS.SCISSORS, RPS.LIZARD, RPS.POGGIES]),
    [RPS.SCISSORS]: new Set([RPS.ROCK, RPS.SPOCK, RPS.POGGIES]),
    [RPS.SPOCK]: new Set([RPS.LIZARD, RPS.PAPER, RPS.POGGIES]),
    [RPS.LIZARD]: new Set([RPS.ROCK, RPS.SCISSORS, RPS.POGGIES]),
    [RPS.GUN]: new Set([RPS.PAPER, RPS.LIZARD, RPS.SCISSORS, RPS.ROCK, RPS.SPOCK]),
    [RPS.POGGIES]: new Set([RPS.GUN]),
};
function getResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a tie!";
    }
    if (beatenBy[userChoice].has(computerChoice)) {
        return "You lose :(";
    }
    if (beatenBy[computerChoice].has(userChoice)) {
        return "You win!";
    }
    // Should never get here
    throw new Error("Not implemented, get gud");
}
function cleanup(str) {
    if (typeof str !== "string") {
        return null;
    }
    const clean = str.trim().toLowerCase();
    if (!Object.hasOwnProperty.call(beatenBy, clean)) {
        return null;
    }
    // here, our input must be a string -- it alos must be a valid choice
    return clean;
}
function main() {
    const choices = Object.keys(beatenBy);
    const userChoice = cleanup(process.argv[2]);
    if (Object.hasOwnProperty.call(beatenBy, userChoice)) {
        const computerChoice = pickOne(choices);
        const result = getResult(userChoice, computerChoice);
        console.log(`User chose "${userChoice}"`);
        console.log(`Computer chose "${computerChoice}"`);
        console.log("Result:", result);
    }
    else {
        console.log(`Error: "${process.argv[2]}" is not a valid choice. Usage: ${(0, node_path_1.basename)(process.argv[0])} ${(0, node_path_1.relative)(process.cwd(), process.argv[1])} { ${choices.join("|")}}`);
    }
}
main();
//# sourceMappingURL=index.js.map