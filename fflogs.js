require("dotenv").config();

import axios from "axios";

//Need Master List of which servers are where to add NA/EU/JP/etc...
//https://www.fflogs.com/v1/parses/character/Really%20Newbie/Diabolos/NA


async function getFFLogs(address) {
  axios.create( {
    baseURL: "https://www.fflogs.com/v1/parses/character/",
    headers: {
      api_key: process.env.FFLOGS_KEY
    }

  })
}