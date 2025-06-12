import { render, screen } from "@testing-library/react";
import CartPage from "../CartPage";
import useApiHandler from "../../../hooks/@common/useApiHandler";
import useCartData from "../../../hooks/useCartData";
import useCheckedSet from "../../../hooks/useCheckedSet";
import useEasyNavigate from "../../../hooks/useEasyNavigate";

jest.mock("../../../hooks/@common/useApiHandler");
jest.mock("../../../hooks/useCartData");
jest.mock("../../../hooks/useCheckedSet");
jest.mock("../../../hooks/useEasyNavigate");
jest.mock("../../../services/apiClient", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe("장바구니 페이지", () => {
  const mockCallApi = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiHandler as jest.Mock).mockReturnValue({
      callApi: mockCallApi,
      loadingState: "success",
    });
    (useCartData as jest.Mock).mockReturnValue({
      cartData: [],
      updateCartItem: jest.fn(),
      increaseCartItem: jest.fn(),
      removeCartItem: jest.fn(),
      initCartData: jest.fn(),
      isProcessing: false,
    });
    (useCheckedSet as jest.Mock).mockReturnValue({
      isCheckedSet: new Set(),
      justifyIsChecked: jest.fn(),
      controlCheckBox: jest.fn(),
      controlAllCheckBox: jest.fn(),
      syncIsCheckedSet: jest.fn(),
      initIsCheckedSet: jest.fn(),
    });
    (useEasyNavigate as jest.Mock).mockReturnValue({
      goOrderComplete: jest.fn(),
    });
  });

  it("로딩 중일 때 스켈레톤이 표시되어야 한다", () => {
    (useApiHandler as jest.Mock).mockReturnValue({
      callApi: mockCallApi,
      loadingState: "initialLoading",
    });

    render(<CartPage />);
    expect(screen.getByTestId("cart-page-skeleton")).toBeInTheDocument();
  });

  it("에러 발생 시 에러 폴백이 표시되어야 한다", () => {
    (useApiHandler as jest.Mock).mockReturnValue({
      callApi: mockCallApi,
      loadingState: "error",
    });

    render(<CartPage />);
    expect(screen.getByTestId("error-fallback")).toBeInTheDocument();
  });

  it("업데이트 중일 때 dimmed 스타일이 적용되어야 한다", () => {
    (useApiHandler as jest.Mock).mockReturnValue({
      callApi: mockCallApi,
      loadingState: "updating",
    });

    render(<CartPage />);
    const wrapper = screen.getByTestId("cart-page-wrapper");
    expect(wrapper).toHaveStyle({ opacity: "0.5" });
  });

  it("로딩이 끝나면 장바구니 데이터를 가져와야 한다", () => {
    render(<CartPage />);
    expect(mockCallApi).toHaveBeenCalledWith(
      expect.any(Function),
      "장바구니 데이터를 불러왔습니다.",
      "initialLoading"
    );
  });
});
