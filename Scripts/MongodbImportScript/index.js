var cron = require("cron");
var moment = require("moment-timezone");
const { populationDao } = require("./repository");
var mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const json2csv = require("json2csv").parse;
const type = "csv"; // can be json too
var csv = require("csvtojson");
const _ = require('lodash');
var cronJob = cron.job("00 07 16 * * *", async function() {
  try {
    let filePath = path.join(__dirname, "../../../imports", "export_testdata.csv")
    let jsonArray=await csv().fromFile(filePath);
    let modifiedJson = modifyJson(jsonArray);
    await populationDao.saveAllData(modifiedJson);
    //console.log(modifiedJson[0]);
  } catch (err) {
    console.log("Error", err);
  }
});

function modifyJson(jsonArray) {
  let returnArray = [];
  _.each(jsonArray, ele => {
    let values = Object.values(ele);
    returnArray.push({
      channel: values[12],
      total: values[13],
      subsegments: values.splice(0, 12)
    })
  })

  return returnArray;
}

async function createMongooseConnectionWithUrl() {
  await mongoose.connect(
    "mongodb://localhost:27017/campaign_tagging",
    { useNewUrlParser: true }
  );
  mongoose.set("useCreateIndex", true);
  mongoose.Promise = global.Promise;
  cronJob.start();
}

createMongooseConnectionWithUrl();
