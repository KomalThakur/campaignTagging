const _ = require("lodash");
var moment = require("moment-timezone");
const {
  campaignsDao,
  formDataDao,
  userDao,
  populationDao,
  campaignsInfoDao
} = require("./repository");
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
    product: body.product,
    phase: body.phase,
    touch: body.touch
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

async function getTargetData(request) {
  try {
    let dataArray = await populationDao.getSpecificTargets(request.body);
    console.log("dataArray : ", dataArray);
    let total = 0;
    if (!_.isNil(dataArray) && dataArray.length !== 0) {
      total = dataArray[0].sum;
    }
    console.log(total);

    return {
      value: total
    };
  } catch (e) {
    throw e;
  }
}

async function updateCampaignInfo(request) {
  let { body } = request;
  console.log(body.campaignInfos.length);
  for (let i = 0; i < body.campaignInfos.length; i++) {
    if(!_.isNil(body.campaignInfos[i].isChange) && body.campaignInfos[i].isChange === true)
      await campaignsInfoDao.updateCampaignInfo(body.campaignInfos[i]);
  }
  return "success";
}

function createCampaignInfo(id) {
  return campaignsInfoDao.updateCampaignInfo({
    campaignId: id,
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
  });
}
function getCampaignInfoById(request) {
  return campaignsInfoDao.getCampaignInfoById(request.params.id);
}

function getAllCampaignInfo(request) {
  return campaignsInfoDao.getAllCampaignInfo();
}

module.exports = {
  createCampaign,
  getCampaignsByUser,
  getAllCampaigns,
  getFormData,
  createFormData,
  registerUser,
  getUserProfile,
  getTargetData,
  updateCampaignInfo,
  getCampaignInfoById,
  getAllCampaignInfo,
  createCampaignInfo
};
