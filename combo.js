const algoliasearch = require("algoliasearch");

const client = algoliasearch("DJGUBCSQ2K", "c6b380aeace1c6fb86436271bf0e51fe");
const index = client.initIndex("product");
const axios = require("axios");

let comboobjects = [];

axios
  .get(
    `https://yx391difrl.execute-api.us-east-2.amazonaws.com/specials/comboboxes/`,
    { headers: header }
  )
  .then((res) => {
    comboobjects = [...res.data.data];
    console.log(objects);
    pushData=[]
    comboobjects.map(data=>{
      pushData.push({...data,type:"comboproducts",objectID:data.uuid})
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
    console.log(err.message);
    })
  
  });
