import { Title, Subtitle, Container } from "./Description.styles";

interface DescriptionProps {
  title: string;
  subTitle: string;
}

function Description({ title, subTitle }: DescriptionProps) {
  return (
    <section css={Container}>
      <p css={Title}>{title}</p>
      <p css={Subtitle}>{subTitle}</p>
    </section>
  );
}

export default Description;
