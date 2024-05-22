interface isCartItemsSelectedType {
  id: number;
  boolean: boolean;
}

const mockIsCartItemsSelected: isCartItemsSelectedType[] = [
  {
    id: 1,
    boolean: true,
  },
  {
    id: 2,
    boolean: true,
  },
  {
    id: 3,
    boolean: true,
  },
  {
    id: 4,
    boolean: false,
  },
  {
    id: 5,
    boolean: false,
  },
];

export default mockIsCartItemsSelected;
