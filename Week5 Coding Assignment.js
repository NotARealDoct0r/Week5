class SoccerPlayer {
    constructor(playerName, position) {
        this.playerName = playerName;
        this.position = position;
    }
    
    describe() {
        return `Did you know that ${this.playerName} plays ${this.position}!?`;
    }
}

class SoccerTeam {
    constructor(teamName) {
        this.teamName = teamName;
        this.players = [];
    }

    addPlayer(player) {
        if (player instanceof SoccerPlayer) {
            this.players.push(player);
        } else {
            throw new Error(`This is not a real soccer player ("instance of SoccerPlayer")! Argument is not a ${player}.`);
        }
    }

    describe() {
        return `${this.teamName} has ${this.players.length} players, however, during a match, only 11 play at a time.`
    }
}

class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;
    }

    start() {
        let selection = this.showMenuOptions();
        while (selection != 0) {
            switch(selection) {
                case '1': 
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.displayTeams();
                    break;
                case '4':
                    this.deleteTeam();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMenuOptions();
        }
        alert('See you next time!')
    }

    showMenuOptions() {
        return prompt(`
            0) exit
            1) Create a new soccer team
            2) View a team
            3) Display all the teams
            4) Delete a team
        `);
    }

    showTeamMenuOptions(teamInfo) {
        return prompt(`
            0) Return to previous screen
            1) Add a new player
            2) Delete a player
            ------------------
            ${teamInfo}
        `);
    }

    displayTeams() {
        let teamText = '';
            for (let i = 0; i < this.teams.length; i++) {
            teamText += i+ ') ' + this.teams[i].teamName + '\n';
            }
        alert(teamText);
    }
    
    createTeam() {
        let teamName = prompt('Enter name for new soccer team: ');
        this.teams.push(new SoccerTeam(teamName));
    }

    viewTeam() {
        let teamNumber = prompt("Enter the team number that you would like to look at: ");
        if (teamNumber > -1 && teamNumber < this.teams.length) {
            this.selectedTeam = this.teams[teamNumber];
            let description = 'Soccer team name: ' + this.selectedTeam.teamName + '\n';
            description += ' ' + this.selectedTeam.describe() + '\n';
            for (let i = 0; i < this.selectedTeam.players.length; i++) {
                description += i + ') ' + this.selectedTeam.players[i].describe() + '\n';
            }
        let firstSelection = this.showTeamMenuOptions(description);
        switch (firstSelection) {
            case '1':
                this.createPlayer();
                break;
            case '2':
                this.deletePlayer();
            }
        }
    }
    
    deleteTeam() {
        let teamNumber = prompt('Enter the team number that you would like to delete: ');
        if (teamNumber > -1 && teamNumber < this.teams.length) {
            this.teams.splice(teamNumber, 1);
        } 
    }

    createPlayer() {
        let playerName = prompt('Enter name for the new soccer player: ');
        let position = prompt('Enter the position for new player: ');
        this.selectedTeam.addPlayer(new SoccerPlayer(playerName, position));
    }

    deletePlayer() {
        let playerNumber = prompt('Enter the player number you wish to delete: ');
        if (playerNumber > -1 && playerNumber < this.selectedTeam.players.length) {
            this.selectedTeam.players.splice(playerNumber,1);
        }
    }
}
let menu = new Menu();
menu.start();