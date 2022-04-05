let html_pot1, html_pot2, html_pot3, html_pot4, html_btn_draw, html_groups;

const pot1 = [
    {
        country: 'Qatar',
        region: 'AFC',
        ranking: 51
    }, 
    {
        country: 'Brazil',
        region: 'CONMEBOL',
        ranking: 1
    },
    {
        country: 'Belgium',
        region: 'UEFA',
        ranking: 2
    },
    {
        country: 'France',
        region: 'UEFA',
        ranking: 3
    },
    {
        country: 'Argentina',
        region: 'CONMEBOL',
        ranking: 4
    },
    {
        country: 'England',
        region: 'UEFA',
        ranking: 5
    },
    {
        country: 'Spain',
        region: 'UEFA',
        ranking: 7
    },
    {
        country: 'Portugal',
        region: 'UEFA',
        ranking: 8
    }
]
const pot2 = [
    {
        country: 'Mexico',
        region: 'CONCACAF',
        ranking: 9
    }, 
    {
        country: 'Netherlands',
        region: 'UEFA',
        ranking: 10
    },
    {
        country: 'Denmark',
        region: 'UEFA',
        ranking: 11
    },
    {
        country: 'Germany',
        region: 'UEFA',
        ranking: 12
    },
    {
        country: 'Uruguay',
        region: 'CONMEBOL',
        ranking: 13
    },
    {
        country: 'Switzerland',
        region: 'UEFA',
        ranking: 14
    },
    {
        country: 'USA',
        region: 'CONCACAF',
        ranking: 15
    },
    {
        country: 'Croatia',
        region: 'UEFA',
        ranking: 16
    }
]
const pot3 = [
    {
        country: 'Senegal',
        region: 'CAF',
        ranking: 20
    }, 
    {
        country: 'Iran',
        region: 'AFC',
        ranking: 21
    },
    {
        country: 'Japan',
        region: 'AFC',
        ranking: 23
    },
    {
        country: 'Morocco',
        region: 'CAF',
        ranking: 24
    },
    {
        country: 'Serbia',
        region: 'UEFA',
        ranking: 25
    },
    {
        country: 'Poland',
        region: 'UEFA',
        ranking: 26
    },
    {
        country: 'South Korea',
        region: 'AFC',
        ranking: 29
    },
    {
        country: 'Tunisia',
        region: 'CAF',
        ranking: 35
    }
]
const pot4 = [
    {
        country: 'Cameroon ',
        region: 'CAF',
        ranking: 37
    }, 
    {
        country: 'Canada',
        region: 'CONCACAF',
        ranking: 38
    },
    {
        country: 'Ecuador',
        region: 'CONMEBOL',
        ranking: 46
    },
    {
        country: 'Saudi Arabia',
        region: 'AFC',
        ranking: 49
    },
    {
        country: 'Ghana',
        region: 'CAF',
        ranking: 60
    },
    {
        country: 'Playoff1',
        region: 'CONMEBOL',
        ranking: 50
    },
    {
        country: 'Playoff2',
        region: 'CONCACAF',
        ranking: 50
    },
    {
        country: 'EuroPlayoff',
        region: 'UEFA',
        ranking: 50
    }
]

const LoadData = function() {
    for (country of pot1) {
        html_pot1.innerHTML += `<p class="bg-light p-1 mb-1 text-danger rounded">${country.ranking} - ${country.country}</p>`
    };
    for (country of pot2) {
        html_pot2.innerHTML += `<p class="bg-light p-1 mb-1 text-danger rounded">${country.ranking} - ${country.country}</p>`
    };
    for (country of pot3) {
        html_pot3.innerHTML += `<p class="bg-light p-1 mb-1 text-danger rounded">${country.ranking} - ${country.country}</p>`
    };
    for (country of pot4) {
        if (country.ranking != 50) {
            html_pot4.innerHTML += `<p class="bg-light p-1 mb-1 text-danger rounded">${country.ranking} - ${country.country}</p>`
        }
        else {
            html_pot4.innerHTML += `<p class="bg-light p-1 mb-1 text-danger rounded">${country.country}</p>`
        }
    };
};
    
    
var groups;
var chosenTeams;
var groups = [  [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]  ]; // Groups A to H
chosenTeams = []; // To make sure a team doesn't get chosen twice

function Start(){
    var groups = [  [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]  ]; // Groups A to H
    chosenTeams = []; // To make sure a team doesn't get chosen twice
}



function ChooseRandomTeam(pot){
    var tries = [];
    // Pick a random team from given pot
    var idx = Math.floor(Math.random() * pot.length);
    while(chosenTeams.indexOf(pot[idx]) >= 0){
        idx = Math.floor(Math.random() * pot.length);
        if(!tries.includes(idx)){
            tries.push(idx);
        }
        // If all teams have been tried
        if(tries.length >= pot.length){
            break;
        }
    }
    return pot[idx];
}

function DrawTeams(){
    Start();
    // Host team goes to group A1
    groups[0][0] = pot1[0];
    chosenTeams.push(pot1[0]);
    // Pot 1:
    // For each group
    for(i = 1; i < groups.length; i++){
        var team = ChooseRandomTeam(pot1);
        chosenTeams.push(team);
        // Asign position 1 of group
        groups[i][0] = team;
    };
    // Pots 2-4
    // For each group
    for(i = 0; i < groups.length; i++){
        // Chose a random team from pot2
        var team = PickFromPot(groups[i], pot2);
        // Assign place in group
        var place = AssignPlace(groups[i]);
        groups[i][place] = team;
    }
    for(i = 0; i < groups.length; i++){
        
        team = PickFromPot(groups[i], pot3);
        place = AssignPlace(groups[i]);
        groups[i][place] = team;
    }

    for(i = 0; i < groups.length; i++){
        
        team = PickFromPot(groups[i], pot4);
        place = AssignPlace(groups[i]);
        groups[i][place] = team;
    }
}

function AssignPlace(group){
    var place = Math.floor(Math.random() * group.length);
    // If the place has already a team assigned to it
    while(group[place] != null){
        // Try with another place
        place = Math.floor(Math.random() * group.length);
    }
    return place;
}

var queue = [];

function PickFromPot(group, pot){
    var team;
    // Check if any teams are enqueued
    if( queue.length > 0){
        // Pop method takes last element of array, so we reverse to get the first one
        queue.reverse();
        team = queue.pop();
        // Reverse it again to put it back to normal
        queue.reverse();
    } else {
        team = ChooseRandomTeam(pot);
    }
    // While we don't find a team from pot than can play
    while(!CheckRestrictions(group, team)){
        // Try with another team
        team = ChooseRandomTeam(pot);
    }
    chosenTeams.push(team);
    return team;
}

function CheckRestrictions(group, team){
    var canPlay = true;
    // For each team in the group
    group.forEach(team2 => {
        // If the region is the same as the chosen team
        if(team2 != null){
            if(team2.region == team.region){
                // If it's not UEFA
                if(team.region != 'UEFA'){
                    // Add to queue for next group
                    queue.push(team);
                    // This team cannot play in this group
                    canPlay = false;
                } else {
                // If it's UEFA
                    var UEFAcount = 0;
                    group.forEach(x =>{
                        if(x != null){
                            if(x.region == 'UEFA'){
                                UEFAcount++;
                            }
                        }
                    });
                    // If number of UEFA countries >= 2
                    if(UEFAcount >= 2){
                        // Queue for next group
                        queue.push(team);
                        canPlay = false;
                    }
                }
            }
        }
    });
    return canPlay;
}


function GroupStage(group){
    // Simulate the games for group X
    // Add the points field for the classification
    for(i=0; i<group.length; i++){
        group[i].points = 0;
    }
    // 1st game: X1-X2 X3-X4
    group[0], group[1] = GroupStageGame(group[0], group[1]);
    group[2], group[3] = GroupStageGame(group[2], group[3]);
    // 2nd game: X2-X4 X1-X3
    group[1], group[3] = GroupStageGame(group[1], group[3]);
    group[0], group[2] = GroupStageGame(group[0], group[2]);
    // 3rd game: X1-X4 X2-X3
    group[0], group[3] = GroupStageGame(group[0], group[3]);
    group[1], group[2] = GroupStageGame(group[1], group[2]);
    return group;
}

function GroupStageGame(team1, team2){
    /* To calculate the winner of a game,
    it will get a random number in the [0, 1)
    interval, which will later be multiplied by
    the ranking position of the team. This way,
    better teams will have more chance to win */

    // Team 1 result
    let t1 = Math.random() * team1.ranking;
    // Team 2 result
    let t2 = Math.random() * team2.ranking;
    // The team with the smallest number wins
    let winner;
    if(t1 < t2){
        team1.points += 3;
        winner = team1;
    } else if (t2 < t1){
        team2.points += 3;
        winner = team2;
    } else {
        team1.points += 1;
        team2.points += 1;
        winner = null;
    }
    return team1, team2;
}

function PlayGroupStage(){
    var i = 0
    // For some reaso the for loop didn't work :(
    while(i < groups.length){
        
        groups[i] = GroupStage(groups[i]);
        i += 1;
    }
}

function GroupStageResults(){
    // Sort the groups by the points obtained in the group stage
    var i = 0;
    while(i < groups.length){
        let sortedGroup = SortGroup(groups[i]);
        groups[i] = sortedGroup;
        i += 1;
    }
    // console.log(groups);
    groups = auxGroups;

    var groupStageWinners = [];
    // Choose the winners for the next stage
    i = 0;
    // For each group
    while(i < groups.length){
        // Choose the teams that won the group stage
        groupStageWinners.push([groups[i][0], groups[i][1]]);
        i += 1;
    }
    return groupStageWinners;
}

function SortGroup(group){
    var i = 1;
    var auxGroup = group;
    while(i < auxGroup.length){
        if(auxGroup[i].points > auxGroup[i-1].points){
            let aux = auxGroup[i];
            auxGroup[i] = auxGroup[i-1];
            auxGroup[i-1] = aux;
        }
        i += 1;
    }
    return auxGroup;
}

function StartSimulation(){
    // First it creates the groups from the draw pots
    DrawTeams(); // The result of this goes to the global variable groups!!
    // Then the teams play the groups stage
    PlayGroupStage();
    // Get the results from the group stage
    let winners = GroupStageResults();
    // Place the teams for the next stage
    let roundOf16 = SetRoundOf16Teams(winners);
    console.log("OCTAVOS DE FINAL");
    let roundOf8 = PlayRound(roundOf16);
    console.log("CUARTOS DE FINAL");
    let roundOf4 = PlayRound(roundOf8);
    console.log("SEMIFINAL");
    let semifinal = PlayRound(roundOf4);
    console.log("FINAL");
    let final = PlayRound(semifinal);
    console.log("Ganador: " + final[0].country);
}

function PlayRound(teams){
    var nextRound = [];
    var i = 0;
    while (i < teams.length){
        let winner = Game(teams[i], teams[i+1]);
        nextRound.push(winner);
        i += 2
    }
    return nextRound;
}

function Game(team1, team2){
    /* This works the same as the
    GroupStageGame function to calculate
    the winner, but here no draws are
    accepted */
    let winner = null;
    do {
        // Team 1 result
        let t1 = Math.random() * team1.ranking;
        // Team 2 result
        let t2 = Math.random() * team2.ranking;
        if(t1 < t2){
            winner = team1;
        } else if (t2 < t1){
            winner = team2;
        }
    } while (winner == null);
    console.log("The game between "+ team1.country + " and " + team2.country + " was won by " + winner.country);
    return winner;
}

function SetRoundOf16Teams(winners){
    var roundOf16 = [];
    // Push the teams in the correct order so team i plays against i+1
    // A1 vs B2
    roundOf16.push(winners[0][0]);
    roundOf16.push(winners[1][1]);
    // A2 vs B1
    roundOf16.push(winners[0][1]);
    roundOf16.push(winners[1][0]);
    // C1 vs D2
    roundOf16.push(winners[2][0]);
    roundOf16.push(winners[3][1]);
    // C2 vs D1
    roundOf16.push(winners[2][1]);
    roundOf16.push(winners[3][0]);
    // E1 vs F2
    roundOf16.push(winners[4][0]);
    roundOf16.push(winners[5][1]);
    // E2 vs F1
    roundOf16.push(winners[4][1]);
    roundOf16.push(winners[5][0]);
    // G1 vs H2
    roundOf16.push(winners[6][0]);
    roundOf16.push(winners[7][1]);
    // G2 vs H1
    roundOf16.push(winners[6][1]);
    roundOf16.push(winners[7][0]);

    return roundOf16;
}

function LoadGroups(){
    for (groupNr in groups) {
        for (country of groups[groupNr]) {
            html_groups[groupNr].innerHTML += `<p class="bg-light p-1 mb-1 text-danger rounded">${country.ranking} - ${country.country}</p>`
            console.log(country)
            console.log(groups[groupNr])
        }
    }
}

const AddEventListeners = function() {
    $("#js-btn-draw").click(function() {
        SimulateDrawing();
        LoadGroups();
    });
};
$(document).ready(function() {
    html_pot1 = document.getElementById("js-pot1");
    html_pot2 = document.getElementById("js-pot2");
    html_pot3 = document.getElementById("js-pot3");
    html_pot4 = document.getElementById("js-pot4");
    html_btn_draw = document.getElementById("js-btn-draw");
    html_groups = document.getElementsByClassName("js-group");
    console.log(html_groups);

    AddEventListeners();

    LoadData();
});