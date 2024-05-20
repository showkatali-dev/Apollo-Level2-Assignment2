interface IVariant {
  type: string;
  value: string;
}

interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IVariant[];
  inventory: {
    quantity: number;
    inStock: boolean;
  };
}

export { IVariant, IProduct };
