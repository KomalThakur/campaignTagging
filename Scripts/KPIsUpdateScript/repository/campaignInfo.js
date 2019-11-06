const { CampaignInfoSchema } = require('../schemas');

function updateCampaignInfo(item) {
    const campaign = new CampaignInfoSchema(item);
    try {
        return CampaignInfoSchema.findOneAndUpdate({ campaignId: item.campaignId}, campaign, {upsert: true, new: true, setDefaultsOnInsert: true});
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    updateCampaignInfo
}
