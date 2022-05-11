import S from "../../styled";

function Thumbnail({ className = "thumbnail", src }) {
  return (
    <S.Thumbnail className={className}>
      <img src={src} alt="" />
    </S.Thumbnail>
  );
}

export default Thumbnail;
