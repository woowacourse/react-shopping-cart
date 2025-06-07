import { ErrorBoundary, ErrorFallback } from "@/components";
import { OrderCompletedSection, Step3Footer, Step3Header } from "./components";

export default function Step3() {
  return (
    <>
      <Step3Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <OrderCompletedSection />
      </ErrorBoundary>
      <Step3Footer />
    </>
  );
}
