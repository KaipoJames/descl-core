/*
32 Players
2 Conferences
4 Divisions

16 Week Schedule
Play everyone in your division twice

Weeks 1-3: Division Games
Weeks 4-7: Conference Games
Weeks 8-9: Non-Conference Games
Weeks 10-12: Division Games
Weeks 13-14: Non-Confernece Games
Weeks 15-16: Conference Games

*/

import Contestant from "./contestant.js";

const CURRENT_PLAYERS = [
    [
        ["Smash", "Buick", "Kanane", "Midrange"],
        ["Riggins", "Parker", "Vulture", "Buzz"],
        ["Bonan", "Saracen", "Taylor", "Diaz"],
        ["Larusso", "Barry", "Coron", "Vidal"]
    ],
    [
        ["Lawrence", "Bronco", "Speez", "Tank"],
        ["Hawk", "Gnosh", "Keene", "Kenobi"],
        ["Agno", "Chax", "Genie", "Moon"],
        ["Barnes", "Silver", "Pixie", "Hummer"]
    ]
]

class ScheduleGenerator {
    constructor(contestants) {
        if (contestants !== null && contestants.length === 2 && Array.isArray(contestants)) {
            this.contestants = contestants;
        }
        this.createFullSchedule(this.contestants);
    }

    createFullSchedule(contestants) {

        const AXIO_CONFERENCE = contestants[0];
        const DIVISION_1_AXIO = AXIO_CONFERENCE[0];
        const DIVISION_2_AXIO = AXIO_CONFERENCE[1];
        const DIVISION_3_AXIO = AXIO_CONFERENCE[2];
        const DIVISION_4_AXIO = AXIO_CONFERENCE[3];

        const VIXEN_CONFERENCE = contestants[1];
        const DIVISION_1_VIXEN = VIXEN_CONFERENCE[0];
        const DIVISION_2_VIXEN = VIXEN_CONFERENCE[1];
        const DIVISION_3_VIXEN = VIXEN_CONFERENCE[2];
        const DIVISION_4_VIXEN = VIXEN_CONFERENCE[3];

        const singleTeamSchedule = this.createFirstTeamSchedule(contestants[0]);

        this.addDivisionGames(AXIO_CONFERENCE, DIVISION_1_AXIO, 1);

        //contestants.shift();
        // contestants.map(contestant => {
        //     console.log(contestant);
        // });
    }

    /*
            1 - Create and empty array for the contestant
            2 - Assign first week opponent. Assign itself to opponent's same week.
            3 - 
    */
    addDivisionGames(conference, division, z) {
        // Add Division Games
        for (let i = z; i < division.length; i+=2) {
            const contestant = new Contestant(division[i]);
            const nextContestant = new Contestant(division[i + 1]);

            const currentPlayerPosition = division.indexOf(division[i]);
            const nextPlayerPosition = division.indexOf(division[i + 1]);

            contestant.schedule.push(division[nextPlayerPosition]);

            nextContestant.schedule.push(division[currentPlayerPosition]);

            console.log(contestant);
        }
        for (let i = z + 1; i < division.length + 1; i+=2) {
            const contestant = new Contestant(division[i]);
            const nextContestant = new Contestant(division[i - 1]);

            const currentPlayerPosition = division.indexOf(division[i]);
            const nextPlayerPosition = division.indexOf(division[i - 1]);

            // contestant.schedule.push(division[nextPlayerPosition]);
            // nextContestant.schedule.push(division[currentPlayerPosition]);

            division[nextPlayerPosition] === undefined 
                ? contestant.schedule.push(division[0]) 
                : contestant.schedule.push(division[nextPlayerPosition]);

            division[currentPlayerPosition] === undefined 
                ? nextContestant.schedule.push(division[0]) 
                : nextContestant.schedule.push(division[currentPlayerPosition]);

            console.log(contestant);
        }

        // Replace Name(String) of Player with the Contestant Object
        for (let i = 0; i < division.length; i++) {
            
        }
    }

    createFirstTeamSchedule() {

    }

    createSingleTeamSchedule() {
        const games = [];

    }

}

const schedule = new ScheduleGenerator(CURRENT_PLAYERS);
