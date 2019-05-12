const _ = require("lodash");
var moment = require("moment-timezone");
const { campaignsDao, formDataDao, userDao } = require("./repository");
var hash = require("object-hash");

function getAllCampaigns(request) {
  return campaignsDao.getAllCampaigns();
}

async function getCampaignsByUser(request) {
  let userId = request.payload._id;
  return campaignsDao.getCampaignsByUser(userId);
}

async function createCampaign(request) {
  let { body } = request;
  
  let item = JSON.parse(JSON.stringify(body));
  let cleanItem = {};
  let hashObj = {
    channel: body.channel,
    campaignType: body.campaignType,
    product:body.product,
    phase:body.phase,
    touch:body.touch
  };

  item.userId = request.payload._id;
  let user = await userDao.getUserProfile(request);
  item.userEmail = user.email;
  item.createTimestamp = moment()
    .tz("America/New_York")
    .format();
  item.campaignId = hash(hashObj);
  if (!_.isNil(body.deploymentDate) && body.deploymentDate !== "") {
    item.deploymentDate = moment(body.deploymentDate)
      .tz("America/New_York")
      .format();
      let temp = JSON.parse(JSON.stringify(item));
      cleanItem = _.omit(temp, ["_id"]);
  } else {
    cleanItem = _.omit(item, ["deploymentDate", "touch", "_id"]);
  }

  return campaignsDao.createCampaign(cleanItem);
}

function getFormData(request) {
  return formDataDao.getAllFormData();
}

function createFormData(request) {
  return formDataDao.createFormData(request.body);
}

function registerUser(request) {
  return userDao.registerUser(request.body);
}


function getUserProfile(request) {
  return userDao.getUserProfile(request);
}

module.exports = {
  createCampaign,
  getCampaignsByUser,
  getAllCampaigns,
  getFormData,
  createFormData,
  registerUser,
  getUserProfile
};
