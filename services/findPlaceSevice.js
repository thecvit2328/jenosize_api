const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
const { googleAPIKey } = require("../configs");

const findPlaceByGGM = (keyword) =>
  new Promise((resolve, reject) => {
    client
      .placesNearby({
        params: {
          location: "13.764807,100.538288",
          radius: 100000,
          keyword,
          type: "restaurant",
          key: googleAPIKey,
        },
      })
      .then((r) => {
        resolve(JSON.stringify(r.data.results));
      })
      .catch((e) => {
        reject(e);
      });
  });

module.exports = { findPlaceByGGM };
