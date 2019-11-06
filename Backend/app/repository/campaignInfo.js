const { CampaignInfoSchema } = require('../schemas');

function getAllCampaignInfo() {
    return CampaignInfoSchema.find({
    });

};

function updateCampaignInfo(item) {
    const campaign = new CampaignInfoSchema(item);
    try {
        return CampaignInfoSchema.findOneAndUpdate({ campaignId: item.campaignId}, campaign, {upsert: true, new: true, setDefaultsOnInsert: true});
    } catch (error) {
        console.log(error);
        throw error;
    }
};

function getCampaignInfoById(id) {
    return CampaignInfoSchema.findOne({
        campaignId: id
    });
}

module.exports = {
    getAllCampaignInfo,
    updateCampaignInfo,
    getCampaignInfoById
}
