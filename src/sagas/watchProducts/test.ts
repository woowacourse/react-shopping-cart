import { Task } from "@redux-saga/types";
import { takeLatest } from "redux-saga/effects";

import watchFetchProducts from ".";
import actions from "../../actions";

// TODO: Redux Saga 테스트 목적이 이해가 안되는 상황
// 학습 / 질문

// describe("productsSaga test", () => {
//   it("should watchfetchProducts", () => {
//     const fetchProductsIterator = watchFetchProducts().next().value;

//     expect(fetchProductsIterator.toPromise()).toEqual(products);
//   });
// });
