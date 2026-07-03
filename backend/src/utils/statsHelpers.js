const DEFAULT_STATUS = {
  applied: 0,
  interview: 0,
  offer: 0,
  rejected: 0,
  accepted: 0,
};

const getSevenDaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
};

const parseStatsFacetResult = (result) => {
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

module.exports = {
  getSevenDaysAgo,
  parseStatsFacetResult,
};
