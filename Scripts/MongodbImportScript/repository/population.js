const { PopulationSchema } = require('../schemas');

async function saveAllData(data) {
    await removeAllData();
    console.log("removed all data");
    return PopulationSchema.insertMany(data);

};


function removeAllData() {
   return  PopulationSchema.deleteMany({});
}

module.exports = {
    saveAllData
}
