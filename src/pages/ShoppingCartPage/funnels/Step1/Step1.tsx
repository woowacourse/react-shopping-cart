import { ErrorBoundary, ErrorFallback } from "@/components";
import { CartItemSection, Step1Footer, Step1Header } from "./components";

export default function Step1() {
  return (
    <>
      <Step1Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <CartItemSection />
      </ErrorBoundary>
      <Step1Footer />
    </>
  );
}
