import { act, cleanup, render, screen } from '@testing-library/react';
import App from '../src/App';
import { describe, it, expect } from 'vitest';
import { server } from './setupTests';

beforeAll(() => server.listen());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

describe('체크박스, 주문 결제 금액 변동 테스트', () => {
  it('체크 박스가 선택됨에 따라 총 결제 금액이 변경된다.', async () => {
    render(<App />);

    const checkBoxList = await screen.findAllByRole('checkbox');

    const totalAmountElement = await screen.findByTestId('total-amount');
    const totalAmountText = totalAmountElement.textContent!;
    const before = parseInt(totalAmountText.replaceAll(',', '').replace('원', ''));

    act(() => checkBoxList[1].click());

    const updatedTotalEl = await screen.findByTestId('total-amount');
    const afterText = updatedTotalEl.textContent!;
    const after = parseInt(afterText.replaceAll(',', '').replace('원', ''));

    expect(after).toBeLessThan(before);

    act(() => checkBoxList[1].click());
  });

  it('체크 박스가 선택됨에 따라 총 주문 금액이 변경된다.', async () => {
    render(<App />);

    const checkBoxList = await screen.findAllByRole('checkbox');

    const orderAmountElement = await screen.findByTestId('order-amount');
    const orderAmountText = orderAmountElement.textContent!;
    const before = parseInt(orderAmountText.replaceAll(',', '').replace('원', ''));

    act(() => checkBoxList[1].click());

    const updatedTotalEl = await screen.findByTestId('order-amount');
    const afterText = updatedTotalEl.textContent!;
    const after = parseInt(afterText.replaceAll(',', '').replace('원', ''));

    expect(after).toBeLessThan(before);

    act(() => checkBoxList[1].click());
  });
});

describe('주문 확인 버튼 테스트', () => {
  it('체크박스가 선택되지 않은 경우 주문 확인 버튼이 비활성화된다.', async () => {
    render(<App />);

    const checkBoxList = await screen.findAllByRole('checkbox');
    const allCheckBox = checkBoxList[0];

    const orderButton = await screen.findByRole('button', { name: '주문 확인' });

    expect(orderButton).toBeEnabled();

    act(() => allCheckBox.click());

    expect(orderButton).toBeDisabled();
  });

  it('체크박스가 하나라도 선택된 경우 주문 확인 버튼이 활성화된다.', async () => {
    render(<App />);

    const checkBoxList = await screen.findAllByRole('checkbox');
    const allCheckBox = checkBoxList[0];

    const orderButton = await screen.findByRole('button', { name: '주문 확인' });

    act(() => {
      allCheckBox.click();
      checkBoxList[1].click();
    });

    expect(orderButton).toBeEnabled();
  });
});

it('페이지가 넘어가면, 주문 수량, 상품 종류, 총 금액이 화면에 보여진다.', async () => {
  render(<App />);

  const orderButton = await screen.findByRole('button', { name: '주문 확인' });

  act(() => {
    orderButton.click();
  });

  const orderInformation = await screen.findByText('총 13종류의 상품 13개를 주문합니다.', { exact: false });
  expect(orderInformation).toBeInTheDocument();

  const totalAmountElement = await screen.findByText('188,054,867원');
  expect(totalAmountElement).toBeInTheDocument();
});
