import { BottomButton, ErrorFallback, LoadingSpinner } from '@components/common';
import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import * as Styled from './PurchaseProcessLayout.styled';

interface PurchaseProcessLayoutProps {
  pageTitle: string;
  children: ReactNode;
  handleBottomBtnClick: () => void;
  bottomButtonDisable?: boolean;
  bottomButtonText: string;
}
const PurchaseProcessLayout = (props: PurchaseProcessLayoutProps) => {
  const { pageTitle, children, handleBottomBtnClick, bottomButtonText, bottomButtonDisable = false } = props;
  return (
    <>
      <Styled.PageTitle>{pageTitle}</Styled.PageTitle>
      <ErrorBoundary FallbackComponent={({ error }) => <ErrorFallback $height="70vh" error={error} reload />}>
        <Suspense fallback={<LoadingSpinner $width="100%" $height="70vh" />}>{children}</Suspense>
      </ErrorBoundary>
      <BottomButton onClick={handleBottomBtnClick} disabled={bottomButtonDisable}>
        {bottomButtonText}
      </BottomButton>
    </>
  );
};

export default PurchaseProcessLayout;
