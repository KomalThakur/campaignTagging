const { CampaignSchema } = require('../schemas');

function getAllCampaigns() {
    return CampaignSchema.find({
    });

};

module.exports = {
    getAllCampaigns
}
