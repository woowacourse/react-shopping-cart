import AbnormalMessage from '../components/Common/AbnormalMessage';

const NotFoundPage = () => {
  return (
    <main>
      <AbnormalMessage abnormalState='notFound' link />
    </main>
  );
};

export default NotFoundPage;
