import { ErrorBoundary, ErrorFallback, LoadingFallback } from "@/components";
import { OrderCompletedSection, Step3Footer, Step3Header } from "./components";
import { Suspense } from "react";

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
    </>
  );
}
