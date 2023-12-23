import axios from 'axios'

export async function downloadFile(fileUrl) {
  return axios
    .get(fileUrl, {
      responseType: 'stream',
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}
