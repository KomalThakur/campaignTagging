
const express = require('express');
const router = express.Router();
const campaignController = require('./controller');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.post('/campaign', auth, campaignController.createCampaign);
router.get('/campaign/user', auth, campaignController.getCampaignsByUser);
router.get('/campaign', auth, campaignController.getAllCampaigns);
router.get('/data', auth, campaignController.getFormData);
router.post('/data', auth, campaignController.createFormData);
router.post('/target', campaignController.getTargetData);

router.post('/campaignInfo', auth, campaignController.updateCampaignInfo );
router.get('/campaignInfo/all', auth, campaignController.getAllCampaignInfo );
router.get('/campaignInfoId/:id', auth, campaignController.getCampaignInfoById );


/*------------------ Auth api------------------*/

router.post('/register', campaignController.registerUser);
router.post('/login', campaignController.loginUser);
router.get('/profile', auth, campaignController.getUserProfile);
module.exports = router;