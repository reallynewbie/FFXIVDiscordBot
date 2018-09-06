require("dotenv").config();
const axios = require("axios");
const ffURL = "https://www.fflogs.com/v1/parses/character/"

//https://www.fflogs.com/v1/parses/character/Really%20Newbie/Diabolos/NA
//https://www.fflogs.com/character/na/diabolos/really%20newbie
//https://www.fflogs.com/character/eu/phoenix/chayo%20kyota
//https://www.fflogs.com/character/jp/bahamut/beere%20hellrot


async function getFFLogs(address) {
  try {
    let addrInfo = await getRegionServer(address);
    let fullURL = ffURL + addrInfo.charName + "/" + addrInfo.server + "/" + addrInfo.region
    let ffJSON = await axios.get(fullURL, {
        params: {
          api_key: process.env.FFLOGS_KEY
        }
      })
      .then(res => {
        return {
          parses: res.data,
          charName: addrInfo.charName.split("%20")
        };
      })
      .catch(err => {
        throw (err.response.data);
      })
    return ffJSON;
  } catch (err) {
    throw (err);
  }
}

function getRegionServer(address) {
  return new Promise((resolve, reject) => {
    if (address.startsWith("https://www.fflogs.com/character/")) {
      let strArray = address.substring(33).split("/"); //33 is the length of the above string
      //Ex:  [ 'na', 'diabolos', 'really%20newbie' ]

      if (strArray.length == 3) {
        resolve({
          region: strArray[0],
          server: strArray[1],
          charName: strArray[2]
        })
      } else {
        //Failcase for strarray length 3.
        reject("getRegionServer:  Not enough fields");

      }
    } else {
      //fail case for not finding opening address.
      reject("getRegionServer:  Unable to find https://www.fflogs.com/character/");
    }
  })
}
// const testAddr = "https://www.fflogs.com/character/na/diabolos/really%20newbie";
// console.log(getFFLogs(testAddr));

module.exports = {
  getFFLogs
}