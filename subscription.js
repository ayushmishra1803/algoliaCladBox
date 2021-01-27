const algoliasearch = require("algoliasearch");

const client = algoliasearch("DJGUBCSQ2K", "c6b380aeace1c6fb86436271bf0e51fe");
const index = client.initIndex("product");
const axios = require("axios");

let objects = [];
const header = {
  Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjo0NzYyNDMzMjAwLCJqdGkiOiJkODUxMzI2YmI1MGI0MGQ0YmMyYTk5MDI3YzA1MWY0YSIsInV1aWQiOiI0MzZmMjY2MS0zMDgxLTQ0YjAtOGY0ZC03OWFjODNlNWUzYWEifQ.2EIskIUkz_ewobRSDnSZ00_VPOaX1zhZDgE8hiPsrZc`,
};
axios
  .get(
    `https://yx391difrl.execute-api.us-east-2.amazonaws.com/specials/subscription_boxes`,
    { headers: header }
  )
  .then((res) => {
    objects = [...res.data.data];
    console.log(objects);
    pushData = [];
    objects
      .map((data) => {
        pushData.push({
          ...data,
          type: "subscriptionProducts",
          objectID: data.uuid,
        });
        console.log(pushData);
        index
          .saveObjects(pushData)
          .then(({ objectIDs }) => {
            console.log(objectIDs);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
