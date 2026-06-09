/**
 * 
 * 
 * Roommates
Given an array of people and their roommate group, return the room assignments for a hotel stay using the following rules:

Each person has a name and a group property:
[
  { "name": "Alice", "group": "A" },
  { "name": "Bob", "group": "B" },
  { "name": "Carol", "group": "A" }
]
People can only share a room with someone from the same group and are paired in the order they are given.
Return an array of strings with names separated by " and " for a shared room, and just the name for a solo room. Names must appear in the order they were paired. For the example above, return ["Alice and Carol", "Bob"].
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[[{ "name": "Alice", "group": "A" }, { "name": "Bob", "group": "B" }, { "name": "Carol", "group": "A" }]], ["Alice and Carol", "Bob"]],
    [[[{ "name": "John", "group": "C" }, { "name": "Julia", "group": "C" }, { "name": "Jim", "group": "C" }]], ["John and Julia", "Jim"]],
    [[[{ "name": "Adam", "group": "D" }, { "name": "Abraham", "group": "E" }, { "name": "Austin","group": "E" }, { "name": "Augustus", "group": "D" }, { "name": "Angelica", "group": "D" }, { "name": "Aaron", "group": "E" }]], ["Adam and Augustus", "Angelica", "Abraham and Austin", "Aaron"]],
    [[[{ "name": "Frank", "group": "A" }, { "name": "Emitt", "group": "B" }, { "name": "Daria", "group": "F" }, { "name": "Charles", "group": "D" }, { "name": "Bailey", "group": "A" }, { "name": "Albert", "group": "F" }]], ["Frank and Bailey", "Emitt", "Daria and Albert", "Charles"]],
    [[[{ "name": "Kevin", "group": "A" }, { "name": "Yuri", "group": "A" }, { "name": "Hugo", "group": "B" }, { "name": "Violet", "group": "A" }, { "name": "Brett", "group": "A" }, { "name": "Wayne", "group": "B" }]], ["Kevin and Yuri", "Violet and Brett", "Hugo and Wayne"]]
];

function getRoommates(people){
    const result = {};

    for(const person of people){
        if(!result[person.group]){
            result[person.group] = [];
        }

        result[person.group].push(person.name);
    }

    const resultStr = [];

    for(const group in result){
        const items = result[group];
    
        if(items.length % 2 === 0){
            resultStr.push(...clearItems(items));
        
        }else{
            resultStr.push(...clearItems(items.slice(0, -1)));
            resultStr.push(items[items.length - 1]);
        }
    }

    return resultStr;

}


function clearItems(items){
    const tempList = [];

    const copy = [...items] // avoid mutating original
    while(copy.length > 0){
        tempList.push(copy[0] + " and " + copy[1]);
        copy.splice(0, 2);
    }

    return tempList;
}


function assignRooms(people){

    const rooms = [];
    const used = new Array(people.length).fill(false);

    for(let i = 0; i < people.length; i++){
        if(used[i]) continue;
        const { name, group} = people[i];
        let roommate = null;

        for(let j = i + 1; j < people.length; j++){
            if(!used[j] && people[j].group === group){
                roommate = people[j].name;
                used[j] = true;
                break;
            }
        }

        if(roommate){
            rooms.push(`${name} and ${roommate}`);
        }else{
            rooms.push(name);
        }
        used[i] = true;
    }

    return rooms;
}



if(require.main === module){
    benchmark({
        "first": getRoommates,
        // "second": assignRooms
    }, TESTCASES, 10000);
}

module.exports = { getRoommates };