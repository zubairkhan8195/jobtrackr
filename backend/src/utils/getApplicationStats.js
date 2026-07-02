const mongoose = require("mongoose");
const Application = require("../models/Application");

const DEFAULT_STATUS = {
  applied: 0,
  interview: 0,
  offer: 0,
  rejected: 0,
  accepted: 0,
};

const getApplicationStats = async (userId) => {
  const objectId = new mongoose.Types.ObjectId(String(userId));

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [result] = await Application.aggregate([
    { $match: { user: objectId } },
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

  const byStatus = { ...DEFAULT_STATUS };

  for (const { _id, count } of result.byStatus) {
    if (_id in byStatus) {
      byStatus[_id] = count;
    }
  }

  return {
    total: result.total[0]?.count ?? 0,
    byStatus,
    thisWeek: result.thisWeek[0]?.count ?? 0,
  };
};

module.exports = { getApplicationStats };
