//new class created with the method 'constructor' that accepts 2 params
//2 new variables created with 'this.' attached which means that it is referrencing this class 
class SoccerPlayer {
    constructor(playerName, position) {
        this.playerName = playerName;
        this.position = position;
    }
    //describe method with the return output using a template literal to include 2 variables (scripts)
    describe() {
        return `Did you know that ${this.playerName} plays ${this.position}!?`;
    }
}
//another class created in a similar manner as above, except the players variable is an array
class SoccerTeam {
    constructor(teamName) {
        this.teamName = teamName;
        this.players = [];
    }
    //newly taught in the lecture - new method created with 1 param using if/else statement. 'If' the player is an object / 'instanceof'
    //the class soccerplayer, then the code will be excuted. otherwise, the else statement will anticipate a potential error and allow
    //the application to continue running witout crashing
    addPlayer(player) {
        if (player instanceof SoccerPlayer) {
            this.players.push(player);
        } else {
            throw new Error(`This is not a real soccer player ("instance of SoccerPlayer")! Argument is not a ${player}.`);
        }
    }
    //describe method again with return output - 2 scripts, filling in with variables defined above
    describe() {
        return `${this.teamName} has ${this.players.length} players, however, during a match, only 11 play at a time.`
    }
}
//another class - this is the main menu that will allow the application to start later on. 2 variables with both arrays
class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;
    }
    //start method that will help initialize the whole application. variable is set to display the available menu options - using
    //while loop to keep repeating/iterating as long as the user does not select '0' (which exits the app)
    //using switch/case - depending on user input, it will either create, view, display, or delete team. upon exit, alert msg
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

    //this method shows the user the available options
    showMenuOptions() {
        return prompt(`
            0) exit
            1) Create a new soccer team
            2) View a team
            3) Display all the teams
            4) Delete a team
        `);
    }

    //this is the sub-menu options
    showTeamMenuOptions(teamInfo) {
        return prompt(`
            0) Return to previous screen
            1) Add a new player
            2) Delete a player
            ------------------
            ${teamInfo}
        `);
    }

    //this method will show the user the newly created teamname and the index/number on every new line (using a for loop)
    displayTeams() {
        let teamText = '';
            for (let i = 0; i < this.teams.length; i++) {
            teamText += i+ ') ' + this.teams[i].teamName + '\n';
            }
        alert(teamText);
    }
    
    //this method will first show a prompt then add a new 'object' / teamname that will be added into the array defined above
    createTeam() {
        let teamName = prompt('Enter name for new soccer team: ');
        this.teams.push(new SoccerTeam(teamName));
    }

    //this method will show a slightly more detailed view of the team that is selected. using if statement with a for loop nested.
    //first a prompt followed by if statement (as long as user doesn't exit by inputting '0' and teamnumber is less than # of elements)
    //depending on user selection, it will be displayed on a new line(s). describe method added involving a for loop (iterating through
    //every element in the array, displaying on every new line)
    //new variable 'firstselection' created to show 2 different options for user, depending on input (create or delete player)
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
    
    //defining the method using an if statement. if statement is identical to the previous one above. depending on the user selection,
    //using splice method, it will be deleted
    deleteTeam() {
        let teamNumber = prompt('Enter the team number that you would like to delete: ');
        if (teamNumber > -1 && teamNumber < this.teams.length) {
            this.teams.splice(teamNumber, 1);
        } 
    }

    //this method has 2 prompts first then will add a new object of the class based on 2 params
    createPlayer() {
        let playerName = prompt('Enter name for the new soccer player: ');
        let position = prompt('Enter the position for new player: ');
        this.selectedTeam.addPlayer(new SoccerPlayer(playerName, position));
    }

    //this will delete the player - prompt first then if statement iterating through the elements. depending on user input/selection,
    //using splice method, it will delete the player
    deletePlayer() {
        let playerNumber = prompt('Enter the player number you wish to delete: ');
        if (playerNumber > -1 && playerNumber < this.selectedTeam.players.length) {
            this.selectedTeam.players.splice(playerNumber,1);
        }
    }
}

//setting the variable menu to equal a new object of the class menu
//adding the start method is what initializes the application
let menu = new Menu();
menu.start();