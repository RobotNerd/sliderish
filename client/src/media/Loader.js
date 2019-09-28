const server = 'http://localhost:3030/';
const axios = require('axios').default;

module.exports = {
  getImageUrl: async () => {
    return axios.get(server);
  },
};
