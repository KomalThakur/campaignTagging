const campaignService = require("./service");
var passport = require("passport");

async function getAllCampaigns(req, res, next) {
  if (!req.payload._id) {
    next({
      status : 401,
      message : 'Unauthorised'
    })
  } else {
    try {
      let campaigns = await campaignService.getAllCampaigns(req);
      res.status(200);
      res.send({
        data : campaigns,
        status : 200,
        message : "Success"});
    } catch (error) {
      next(error);
    }
  }
}

async function getCampaignsByUser(req, res, next) {
  if (!req.payload._id) {
    next({
      status : 401,
      message : 'Unauthorised'
    })
  } else {
    try {
      let campaigns = await campaignService.getCampaignsByUser(req);
      res.status(200);
      res.send({
        data : campaigns,
        status : 200,
        message : "Success"});
    } catch (error) {
      next(error);
    }
  }
}

async function createCampaign(req, res, next) {
  if (!req.payload._id) {
    next({
      status : 401,
      message : 'Unauthorised'
    })
  } else {
    try {
      await campaignService.createCampaign(req);
      res.status(201);
      res.send({
        data : {},
        status : 201,
        message : "Success"});
    } catch (error) {
      console.log(error);
      if(error.code === 11000) {
        next({
          status : 400,
          message : 'Campiagn channel, type, products promoted, phase, touch and audience segment values are not unique.'
        });
      }
      
    }
  }
}

async function getFormData(req, res, next) {
  if (!req.payload._id) {
    next({
      status : 401,
      message : 'Unauthorised'
    })
  } else {
    try {
      let formData = await campaignService.getFormData(req);
      res.status(200);
      res.send({
        data : formData,
        status : 200,
        message : "Success"});
    } catch (error) {
      next(error);
    }
  }
}

async function createFormData(req, res, next) {
  if (!req.payload._id) {
    next({
      status : 401,
      message : 'Unauthorised'
    })
  } else {
    try {
      await campaignService.createFormData(req);
      res.status(201);
      res.send({
        data : {},
        status : 201,
        message : "Success"});
    } catch (error) {
      next(error);
    }
  }
}

async function registerUser(req, res, next) {
  try {
    let token = await campaignService.registerUser(req);
    res.status(201);
    res.send({
      data : {
        token
      },
      status : 201,
      message : "Success"});
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(201);
      res.json({
        data : {
          token
        },
        status : 201,
        message : "Success"});
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
}

async function getUserProfile(req, res, next) {
  if (!req.payload._id) {
    next({
      status : 401,
      message : 'Unauthorised'
    })
  } else {
    try {
      let profile = await campaignService.getUserProfile(req);
      res.status(200);
      res.send({
        data : profile,
        status : 200,
        message : "Success"});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  getAllCampaigns,
  getCampaignsByUser,
  createCampaign,
  getFormData,
  createFormData,
  registerUser,
  loginUser,
  getUserProfile
};
