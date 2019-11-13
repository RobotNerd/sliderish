const server = 'http://localhost:3030';
const axios = require('axios').default;


module.exports = {
  getImageUrl: async (count) => {
    count = count || 1;
    return axios.get(`${server}/?count=${count}`);
  },
};
