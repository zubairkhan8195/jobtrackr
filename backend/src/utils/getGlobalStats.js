const Application = require("../models/Application");
const { getSevenDaysAgo, parseStatsFacetResult } = require("./statsHelpers");

const getGlobalStats = async () => {
  const sevenDaysAgo = getSevenDaysAgo();

  const [result] = await Application.aggregate([
    {
      $facet: {
        total: [{ $count: "count" }],
        byStatus: [{ $group: { _id: "$status", count: { $sum: 1 } } }],
        thisWeek: [
          { $match: { appliedDate: { $gte: sevenDaysAgo } } },
          { $count: "count" },
        ],
      },
    },
  ]);

  return parseStatsFacetResult(result);
};

module.exports = { getGlobalStats };
