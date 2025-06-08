import { ErrorBoundary, ErrorFallback, LoadingFallback, Spacing } from "@/components";
import { OrderCompletedSection, Step3Footer, Step3Header } from "./components";
import { Suspense } from "react";
import { size } from "@/styles";

export default function Step3() {
  return (
    <>
      <Step3Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <OrderCompletedSection />
        </Suspense>
      </ErrorBoundary>
      <Step3Footer />
      <Spacing size={size.mobileFooterHeight} />
    </>
  );
}
