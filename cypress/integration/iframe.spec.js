import checkIframeEligibility from '$lib/Endpoints/iframe.ts';

describe("Iframe Eligibility", () => {
  it("should return true if the url is eligible", () => {
    expect(checkIframeEligibility("https://www.nocodeneeded.com")).toBe(true)
  })
  it("should return false if the url is not eligible", () => {
    expect(checkIframeEligibility("https://www.google.com")).toBe(false)
  })
});

