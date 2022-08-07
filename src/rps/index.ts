// node index <rock, paper, or scissors>

// input
// opponent
// output

// dot notation - bracket notation
// validation

import { basename, relative } from 'node:path';

enum RPS {
    ROCK = "rock",
    PAPER = "paper",
    SCISSORS = "scissors",
    SPOCK = "spock",
    POGGIES = "poggies",
    LIZARD = "lizard",
    GUN = "gun"
}

function pickOne(arr: RPS[]): RPS {
    const choice = Math.floor(Math.random() * arr.length);
    return arr[choice];
}

const beatenBy: {
    [K in RPS]: Set<RPS>
} = {
    [RPS.ROCK]: new Set([RPS.PAPER, RPS.SPOCK, RPS.POGGIES]),
    [RPS.PAPER]: new Set([RPS.SCISSORS, RPS.LIZARD, RPS.POGGIES]),
    [RPS.SCISSORS]: new Set([RPS.ROCK, RPS.SPOCK, RPS.POGGIES]),
    [RPS.SPOCK]: new Set([RPS.LIZARD, RPS.PAPER, RPS.POGGIES]),
    [RPS.LIZARD]: new Set([RPS.ROCK, RPS.SCISSORS, RPS.POGGIES]),
    [RPS.GUN]: new Set([RPS.PAPER, RPS.LIZARD, RPS.SCISSORS, RPS.ROCK, RPS.SPOCK]),
    [RPS.POGGIES]: new Set([RPS.GUN]),
};

function getResult(userChoice: RPS, computerChoice: RPS): string {

    if (userChoice === computerChoice) {
        return "It's a tie!";
    }
    if (beatenBy [userChoice].has (computerChoice)) {
        return "You lose :(";
    }
    if (beatenBy [computerChoice].has (userChoice)) {
        return "You win!";
    }
    
    // Should never get here
    throw new Error("Not implemented, get gud");
}    

function cleanup(str: string): RPS | null {
    if (typeof str !== "string") {
        return null;
    }

    const clean: string = str.trim().toLowerCase();
    if (!Object.hasOwnProperty.call(beatenBy, clean)) {
        return null;
    }

    // here, our input must be a string -- it alos must be a valid choice
    return clean as RPS;
}

function main() {
    const choices = Object.keys(beatenBy) as RPS[];

    const userChoice = cleanup(process.argv[2]);
    if (Object.hasOwnProperty.call(beatenBy, userChoice)) {
        const computerChoice = pickOne(choices);
        const result = getResult(userChoice, computerChoice);    

        console.log(`User chose "${userChoice}"`);
        console.log(`Computer chose "${computerChoice}"`);
        console.log("Result:", result);
    } else {
        console.log(`Error: "${
            process.argv[2] 
        }" is not a valid choice. Usage: ${
                basename(process.argv[0])
            } ${
                relative(process.cwd(), process.argv[1])
            } { ${
                choices.join("|")
            }}`);
        
    }
    
}

main();
