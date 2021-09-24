const { nextISSTimesForMyLocation } = require("./iss");


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`next pass: ${datetime} for ${duration} secs...`);
  }
};




nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
  
// });

// fetchCoordsByIP("68.145.192.83", (error, data) => { 
//   console.log("SUCCESS!\n", data);
// });

// const coords = { latitude: '49.5845', longitude: '-114.386' };


// fetchISSFlyOverTimes(coords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log("zuccsess!~ ", passTimes);
// });





