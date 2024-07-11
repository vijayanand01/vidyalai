const axios = require('axios').default;

/**
 * Fetches posts from a remote API.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
async function fetchPosts(params) {
  const { start = 0, limit = 10 } = params || {};
  const { data: posts } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts',
    {
      params: {
        _start: start,
        _limit: limit,
      },
    },
  );

  return posts;
}

/**
 * Fetches images for a specific album.
 * @async
 * @param {number} albumId - The ID of the album to fetch images for.
 * @returns {Promise<Array>} - A promise that resolves to an array of images.
 */
async function fetchImagesForPost(albumId) {
  const { data: photos } = await axios.get(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  );

  return photos.map(photo => ({ url: photo.url }));
}

module.exports = { fetchPosts, fetchImagesForPost };
