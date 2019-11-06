var cron = require("cron");
var moment = require("moment-timezone");
const { CampaignInfoDao, CampaignsDao } = require("./repository");
var mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const json2csv = require("json2csv").parse;
const type = "csv"; // can be json too
var csv = require("csvtojson");
const _ = require('lodash');
async function start() {
  try {
    let campaigns = await  CampaignsDao.getAllCampaigns();
    console.log(campaigns);

    for(let i = 0; i<campaigns.length; i++) {
      await CampaignInfoDao.updateCampaignInfo({
        campaignId: campaigns[i].campaignId,
        sendCount: "",
        engagement: {
          or: "",
          ctor: "",
          ctr: ""
        },
        conversions: {
          targetCategory: "",
          allCategories: ""
        }
      })
    }
  } catch (err) {
    console.log("Error", err);
  }
};

async function createMongooseConnectionWithUrl() {
  await mongoose.connect(
"mongodb://localhost:27017/campaign_tagging",
// "mongodb://komalthakur:komal123@ds225375.mlab.com:25375/campaign_tagging",
    { useNewUrlParser: true }
  );
  mongoose.set("useCreateIndex", true);
  mongoose.Promise = global.Promise;
  start();
}

createMongooseConnectionWithUrl();
