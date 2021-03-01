const algoliasearch = require("algoliasearch");

const client = algoliasearch("DJGUBCSQ2K", "c6b380aeace1c6fb86436271bf0e51fe");
const index = client.initIndex("product");
const axios = require("axios");

let objects = [];
const header = {
  Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjo0NzY4MTMzNTg2LCJqdGkiOiI4NmUyNDc0OGRjMjg0ZWNlOTNiODM0MGI5YTc1MGI2MyIsInV1aWQiOiI1MTY1NGMxNy1hMTYwLTRiZDItYWZhNS01ODcxY2I4MDNkNDUifQ.pTQTJ6DqeJFgr_l-3gFz3QX5PUNyEBY08HxybD_QHwg`,
};
axios
  .get(
    `https://yx391difrl.execute-api.us-east-2.amazonaws.com/dev/auth/products/`,
    { headers: header }
  )
  .then((res) => {
    console.log(res);
    objects = [...res.data.data];
    console.log(objects);
    pushData = [];
    objects
      .map((data) => {
        pushData.push({ ...data, type: "products", objectID: data.uuid });
        console.log(pushData);
        index
          .saveObjects(pushData)
          .then(({ objectIDs }) => {
            console.log(objectIDs);
            console.log("Hello");
          })
          .catch((err) => {
           console.log(err);
          });
      })
      .catch((err) => {
       console.log(err);
      });
  }).catch(err=>{
    console.log(err);
  })
