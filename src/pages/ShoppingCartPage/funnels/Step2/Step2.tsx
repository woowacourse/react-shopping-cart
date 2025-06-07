import { ErrorBoundary, ErrorFallback, LoadingFallback } from "@/components";
import { OrderConfirmSection, Step2Footer, Step2Header } from "./components";
import { Suspense } from "react";

export default function Step2() {
  return (
    <>
      <Step2Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <OrderConfirmSection />
        </Suspense>
      </ErrorBoundary>
      <Step2Footer />
    </>
  );
}
