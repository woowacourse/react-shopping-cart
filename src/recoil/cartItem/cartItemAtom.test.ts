import { snapshot_UNSTABLE } from 'recoil';
import { cartItemQuantityAtomFamily, cartItemSelectedIdListAtom } from './cartItemAtom';

describe('cartItemQuantityAtomFamily test', () => {
  test('cartItemQuantityAtomFamily의 set method에 주어진 값으로 업데이트 되어야 한다.', () => {
    const initialSnapshot = snapshot_UNSTABLE();
    expect(initialSnapshot.getLoadable(cartItemQuantityAtomFamily(0)).valueOrThrow()).toBe(0);

    const testSnapshot = snapshot_UNSTABLE(({ set }) => set(cartItemQuantityAtomFamily(0), 3));
    expect(testSnapshot.getLoadable(cartItemQuantityAtomFamily(0)).valueOrThrow()).toBe(3);
  });
});

describe('cartItemSelectedIdListAtom test', () => {
  test('cartItemSelectedIdListAtom set method에 주어진 값으로 업데이트 되어야 한다.', () => {
    const initialSnapshot = snapshot_UNSTABLE();
    expect(initialSnapshot.getLoadable(cartItemSelectedIdListAtom).valueOrThrow()).toStrictEqual([]);

    const testSnapshot = snapshot_UNSTABLE(({ set }) => set(cartItemSelectedIdListAtom, [1, 2, 3]));
    expect(testSnapshot.getLoadable(cartItemSelectedIdListAtom).valueOrThrow()).toStrictEqual([1, 2, 3]);
  });
});
