const server = 'http://localhost:3030/';
const axios = require('axios').default;

// TODO make this configurable based on animation type or video duration
const interval = 8000;

module.exports = {
  getImageUrl: async () => {
    return axios.get(server);
  },
  getInterval: () => {
    return interval;
  },
  getAnimationDuration: () => {
    return `${interval/1000}s`;
  },
};
