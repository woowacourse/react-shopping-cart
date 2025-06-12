import * as checkedCtx from '../../src/contexts/CheckedCartIds/CheckedCartIdsContext';

export const mockCheckedCartIds = (ids: number[]) => {
  jest.spyOn(checkedCtx, 'useCheckCartIdsContext').mockReturnValue({
    checkedCartIds: ids,
    setCheckedCartIds: jest.fn(),
    isAllChecked: false,
  });
};
