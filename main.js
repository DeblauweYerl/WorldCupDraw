const pot1 = [
    {
        country: 'Qatar',
        region: 'AFC',
        ranking: 0 // 0 because it's the host
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
        ranking: -1
    },
    {
        country: 'Playoff2',
        region: 'CONCACAF',
        ranking: -1
    },
    {
        country: 'EuroPlayoff',
        region: 'UEFA',
        ranking: -1
    }
]


var groups = [  [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null]  ]; // Groups A to H

var chosenTeams = []; // To make sure a team doesn't get chosen twice


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