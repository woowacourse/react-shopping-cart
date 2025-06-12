import { getImageUrl } from "../imageUrl";

describe("getImageUrl", () => {
  const DEFAULT_IMAGE_URL = "./planet-default-image.svg";

  it("http://로 시작하는 유효한 URL을 그대로 반환한다.", () => {
    const validUrl = "http://example.com/image.jpg";
    expect(getImageUrl(validUrl)).toBe(validUrl);
  });

  it("https://로 시작하는 유효한 URL을 그대로 반환한다.", () => {
    const validUrl = "https://example.com/image.jpg";
    expect(getImageUrl(validUrl)).toBe(validUrl);
  });

  it("빈 문자열이 입력되면 기본 이미지 URL을 반환한다.", () => {
    expect(getImageUrl("")).toBe(DEFAULT_IMAGE_URL);
  });

  it("http:// 또는 https://로 시작하지 않는 경로는 기본 이미지 URL을 반환한다.", () => {
    expect(getImageUrl("./image.jpg")).toBe(DEFAULT_IMAGE_URL);
    expect(getImageUrl("/image.jpg")).toBe(DEFAULT_IMAGE_URL);
    expect(getImageUrl("example/https://image.jpg")).toBe(DEFAULT_IMAGE_URL);
  });
});
