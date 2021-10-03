'use strict'
// Julia's data [3,5,2,12.7]
// kae's data [9,16,6,8,3]
const dogsJulia =[3,5,2,12,7] ;
const dogsKate = [9,16,6,8,3];

const checkDogs = function(jDogs, kDogs){
    const correctDogsJulia = jDogs.slice(0,-2);
    console.log(correctDogsJulia)
    const combinedArray= correctDogsJulia.concat(kDogs)
    console.log(combinedArray)
    combinedArray.forEach(function(value, index){
        if(value>3) console.log(` dog number ${index +1} is an adult`)
        else console.log(` Dog number ${index + 1} is still a puppy`)
    })

}
checkDogs(dogsJulia, dogsKate)