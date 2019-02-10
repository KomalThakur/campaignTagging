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

  //add channel as well in hashObj
  let hashObj = {
    campaignType: body.campaignType,
    product:body.product,
    phase:body.phase,
    touch:body.touch,
    audienceSegment:body.audienceSegment
  };
  

  item.userId = request.payload._id;
  item.createTimestamp = moment()
    .tz("America/Los_Angeles")
    .format();
  item.campaignId = hash(hashObj);

  if (body.deploymentDate !== "") {
    item.deploymentDate = moment(body.deploymentDate)
      .tz("America/Los_Angeles")
      .format();
      cleanItem = JSON.parse(JSON.stringify(item));
  } else {
    cleanItem = _.omit(item, ["deploymentDate", "touch"]);
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
