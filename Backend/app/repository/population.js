const { PopulationSchema } = require("../schemas");
const _ = require("lodash");

async function getSpecificTargets(data) {
  console.log("data :", data);
  // return PopulationSchema.aggregate({
  //     subsegments: {'$all' : data.audienceSubsegment},
  //     channel: data.channel
  // });

  let matchObj = createSubsegmentQuery(data.audienceSubsegment);
  if(matchObj.length === 0) {
    return [];
  }

  return PopulationSchema.aggregate([
    {
      $match: {
        $and: matchObj,
        channel: data.channel
      }
    },
    { $group: { _id: "total", sum: { $sum: "$total" }, count: { $sum: 1 } } }
  ]);
}

function createSubsegmentQuery(subsegmentArray) {
  let segmentObj = {};
  let matchObj = [];
  _.each(subsegmentArray, sub => {
    let splitArray = sub.split("_");
    if (_.isNil(segmentObj[splitArray[0]])) {
      segmentObj[splitArray[0]] = [];
    }
    segmentObj[splitArray[0]].push(sub);
  });

  console.log(segmentObj);

  _.each(_.keys(segmentObj), obj => {
    matchObj.push({ subsegments: { $in: segmentObj[obj] } });
  });

  console.log(matchObj);

  return matchObj;
}

module.exports = {
  getSpecificTargets
};
