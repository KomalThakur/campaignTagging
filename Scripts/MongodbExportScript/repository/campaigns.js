const { CampaignSchema } = require('../schemas');

function getAllCampaignsByDate(start, end) {
    return CampaignSchema.find({"createTimestamp": {"$gte": start, "$lt": end}});

};

module.exports = {
    getAllCampaignsByDate
}
