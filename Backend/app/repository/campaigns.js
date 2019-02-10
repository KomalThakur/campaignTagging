const { CampaignSchema } = require('../schemas');

function getAllCampaigns() {
    return CampaignSchema.find({
    });

};

function createCampaign(item) {
    const campaign = new CampaignSchema(item);
    try {
        return campaign.save();
    } catch (error) {
        throw error;

    }
    

};

function getCampaignsByUser(id) {
    return CampaignSchema.find({
        userId: id
    });
}

module.exports = {
    getAllCampaigns,
    createCampaign,
    getCampaignsByUser
}
