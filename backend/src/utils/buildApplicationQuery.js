const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildApplicationFilter = ({ userId, status, source, search } = {}) => {
  const filter = {};

  if (userId) filter.user = userId;
  if (status) filter.status = status;
  if (source) filter.source = source;
  if (search) {
    const pattern = escapeRegex(search);
    filter.$or = [
      { company: { $regex: pattern, $options: "i" } },
      { position: { $regex: pattern, $options: "i" } },
    ];
  }

  return filter;
};

const buildSort = (sort) => {
  if (!sort) return { appliedDate: -1 };

  const field = sort.startsWith("-") ? sort.slice(1) : sort;
  const order = sort.startsWith("-") ? -1 : 1;

  return { [field]: order };
};

module.exports = { buildApplicationFilter, buildSort };
