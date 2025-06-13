import {
  notFoundPageLayout,
  notFoundPageMessage,
  notFoundPageTitle,
} from "./NotFoundPage.style";

export default function NotFoundPage() {
  return (
    <div css={notFoundPageLayout}>
      <h1 css={notFoundPageTitle}>404 Not Found</h1>
      <p css={notFoundPageMessage}>
        요청하신 페이지를 찾을 수 없습니다. <br />
        주소가 잘못되었거나, 페이지가 삭제되었을 수 있습니다.
      </p>
    </div>
  );
}
