const server = 'http://localhost:3030';
const axios = require('axios').default;  // TODO try switching to fetch()


/**
 * @param count Number of images for which metadata is retrieved.
 * @return Array of image metadata.
 */
export async function getImageData(count) {
  count = count || 1;
  return axios.get(`${server}/?count=${count}`);
}
