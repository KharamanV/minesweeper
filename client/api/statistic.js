import request from '.';

const getStats = params => (
  request('/api/stats', { params })
    .then(({ data }) => data)
);

export default getStats;
