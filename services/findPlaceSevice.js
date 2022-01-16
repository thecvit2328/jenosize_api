const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

const findPlaceByGGM = (text) =>
  new Promise((resolve, reject) => {
    client
      .placeQueryAutocomplete({
        params: {
          input: `ร้าน ${text}`,
          location: ["13.7563", "100.5018"],
          language: "th",
          radius: 100000,
          key: config.googleAPIKey,
        },
      })
      .then((r) => {
        resolve(JSON.stringify(r.data.predictions));
      })
      .catch((e) => {
        reject(e);
      });
  });

module.exports = { findPlaceByGGM };
