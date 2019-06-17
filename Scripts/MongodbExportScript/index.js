var cron = require("cron");
var moment = require("moment-timezone");
const { campaignsDao } = require("./repository");
var mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const json2csv = require("json2csv").parse;
const type = "csv"; // can be json too
var cronJob = cron.job("00 00 08 * * *", async function() {
  try {
    let startTime = moment()
      .subtract(1, "days")
      .tz("America/New_York")
      .startOf("day")
      .format();
    let endTime = moment()
      .subtract(1, "days")
      .tz("America/New_York")
      .endOf("day")
      .format();
    let campaigns = await campaignsDao.getAllCampaignsByDate(
      startTime,
      endTime
    );
    if (campaigns.length > 0) {
      if (!fs.existsSync(path.join(__dirname, "../../../", "exports"))) {
        fs.mkdirSync(path.join(__dirname, "../../../", "exports"));
      }
      let filePath = path.join(
        __dirname,
        "../../../",
        "exports",
        "campaigns-" +
          moment()
            .subtract(1, "days")
            .format("DD-MM-YYYY") +
          "." +
          type
      );

      let data = "";

      if (type === "csv") {
        data = json2csv(campaigns, {
          fields: [
            "channel",
            "name",
            "description",
            "campaignType",
            "campaignCategory",
            "deploymentDate",
            "product",
            "alwayOn",
            "phase",
            "messageType",
            "touch",
            "numOfCreatives",
            "creativeAttributes",
            "createTimestamp",
            "userEmail",
            "campaignId",
            "userId"
          ]
        });
      } else {
        data = campaigns;
      }

      fs.writeFile(filePath, data, function(err) {
        if (err) {
          console.log("Error", err);
        }
      });
    }
  } catch (err) {
    console.log("Error", err);
  }
});

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
