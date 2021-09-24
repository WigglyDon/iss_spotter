const request = require("request");

const fetchMyIP = function (callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(message), null);
      return;
    }
    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback("error", null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback("error", null);
      return;
    }

    callback(null, JSON.parse(body).response);

  });

};



const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };