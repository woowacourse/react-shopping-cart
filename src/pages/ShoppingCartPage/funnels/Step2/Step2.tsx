import { ErrorBoundary, ErrorFallback } from "@/components";
import { OrderConfirmSection, Step2Footer, Step2Header } from "./components";

export default function Step2() {
  return (
    <>
      <Step2Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <OrderConfirmSection />
      </ErrorBoundary>
      <Step2Footer />
    </>
  );
}
