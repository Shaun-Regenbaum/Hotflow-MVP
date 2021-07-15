
import fetch from 'node-fetch'

/**
 * Check Url's eligibility to be a valid iframe
 * @param url
 * @returns a boolean promise
 */
export default async function checkIframeEligibility(url: string): Promise<boolean|void> {
  return fetch(url)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`)
      }
      return response.headers
    })
    .then(headers => {
      if (headers.has('x-frame-options')) {
        console.log(`X-Frame-Options: ${headers.get('x-frame-options')}`)
        if (headers.get('x-frame-options') === 'DENY'||headers.get('x-frame-options') === 'SAMEORIGIN') {
          console.log(`${url} is not allowed to be framed`)
          return false
        }
      } else {
        console.log("no x-frame-option")
        return true
      };
    })
    .catch((error) => {
      console.error(error)
    })
}  


