
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


/** 
 * Take a url in and return the iframe url for it
 * @param {string} url
 * @returns {string}
*/
export function getIframeUrl(url: string): string {
  // if a youtube link, return the iframe url
  if (url.match(/^https?:\/\/(?:www\.)?youtube\.com/)) {
        return `https://www.youtube.com/embed/${url.split('v=')[1]}`
  }
  // if a vimeo link, return the iframe url 
  if (url.match(/^https?:\/\/(?:www\.)?vimeo\.com/)) {
        return `https://player.vimeo.com/video/${url.split('/')[3]}`
  }
  // if a soundcloud link, return the iframe url
  if (url.match(/^https?:\/\/(?:www\.)?soundcloud\.com/)) {
        return `https://w.soundcloud.com/player/?url=${url}`
  }
  // if a google drive link, return the iframe url
  if (url.match(/^https?:\/\/drive\.google\.com/)) {
        return `https://drive.google.com/file/d/${url.split('id=')[1]}/preview`
  }
}

