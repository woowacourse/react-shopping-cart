import { ErrorBoundary, ErrorFallback, LoadingFallback, Spacing } from "@/components";
import { CartItemSection, Step1Footer, Step1Header } from "./components";
import { Suspense } from "react";
import { size } from "@/styles";

export default function Step1() {
  return (
    <>
      <Step1Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <CartItemSection />
        </Suspense>
      </ErrorBoundary>
      <Step1Footer />
      <Spacing size={size.mobileFooterHeight} />
    </>
  );
}
