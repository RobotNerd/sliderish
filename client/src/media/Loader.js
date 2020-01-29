const server = 'http://localhost:3030';
const axios = require('axios').default;  // TODO try switching to fetch()


/**
 * @param count Number of image URLs to get.
 * @return Array of URLs for images to be displayed.
 */
export async function getImageUrls(count) {
  count = count || 1;
  return axios.get(`${server}/?count=${count}`);
}


/**
 * @param imageUrl Image to download.
 * @return Image data to be displayed.
 */
export async function readImageData(imageUrl) {
  return axios.get(imageUrl, { responseType: 'blob' })
    .then((response) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(response.data);
      });
    });
}
