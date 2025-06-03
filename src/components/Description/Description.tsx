import { Title, Subtitle, Container } from "./Description.styles";

interface DescriptionProps {
  title: string;
  subtitle: string;
}

function Description({ title, subtitle }: DescriptionProps) {
  return (
    <section css={Container}>
      <p css={Title}>{title}</p>
      {subtitle.length > 0 && <p css={Subtitle}>{subtitle}</p>}
    </section>
  );
}

export default Description;
