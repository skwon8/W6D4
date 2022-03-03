// There are 3 edits that can be done on a string: add a acharacter, remove a character, 
// or replace a character. Given 2 strings, write a function that checks if they are 
// one edit or fewer away from eachother (see samples below)
function oneAway(str1, str2) {
    // your code here
    let edits = 1;
    let long = str1.length > str2.length ? str1 : str2;
    let short = str1.length <= str2.length ? str1 : str2;

    let maxLength = Math.max(str1.length, str2.length);
    let diff = long.length - short.length;

    if(diff > edits) {
        return false;
    }

    for (let i = 0, j = 0; i < maxLength || j < maxLength; i++, j++) {
        let x1 = long[i];
        let x2 = short[j];
        if (x1 !== x2) {
            edits--;
            if (edits < 0) {
                return false;
            }
            if (long[i + 1] === x2) {
                i++;
            }
        }
    }
    return true;
}

console.log(oneAway("hello", "eello")) // true
console.log(oneAway("hello", "eelloo")) // false 
console.log(oneAway("ello", "hello")) // true
console.log(oneAway("helllo", "hello")) // true
console.log(oneAway("hello", "helo")) // true
console.log(oneAway("hello", "hell")) // true
console.log(oneAway("hjllo", "helo")) // false

// =============================================================================
// Mapping Itineraries
// =============================================================================
// Given a list of itineraries, find the proper path of the trip. 
// A list of itineraries will be an array of arrays, where the inner array will always be length two. 
// For example, here is an example list of itineraries: [ ['LAX', 'SFO'], ['ICN', 'LAX'], ['SJC', 'ICN'] ].

// The first element in each inner array is the "from" airport, and the latter is the "to" airport. 
// So, ['LAX', 'SFO'] means "from LAX to SFO." Running with this example, given this list of itineraries,
// your code should then print out 'SJC -> ICN -> LAX -> SFO', or you can just comma-separate 
// those airports if you don't like the arrows. Whatever method you choose, 
// you should produce the proper route of the trip. It's guaranteed that the itineraries 
// have exactly one start airport, and exactly one end airport, and that there aren't any loops. 

// return a single string of the mapped itineraries

function mappingItineraries(arr) {
    // your code here
    var start = []
    var end = []

    // organize start and endpoints
    for(var i = 0; i <arr.length; i++){
        start.push(arr[i][0]);
        end.push(arr[i][1]);
    }

    // find the start point by comparing and finding the outlier
    var j = 0;
    var k = 0;
    while(k < end.length) {
        if(start[j] == end[k]){
            j++;
            k = 0;
        } else {
            k++;
        }
    }

    // construct final order from start/endpoints
    var order = [];
    order.push(start[j], end[j]);
    start.splice(j, 1);
    end.splice(j, 1);

    var m = 0;
    while(end.length > 0){
        if(start[m] == order[order.length - 1]) {
            start.splice(m, 1);
            order.push(end[m]);
            end.splice(m, 1);
            m = 0;
        } else {
            m++;
        }
    }
    return order.join(" --> ")
}

console.log(mappingItineraries( [  ['ICN', 'LAX'], ['LAX', 'SFO'], ['SJC', 'ICN'], ['NYU', 'SJC'], ['AMS', 'NYU'] ]));
// AMS -> NYU -> SJC -> ICN -> LAX -> SFO