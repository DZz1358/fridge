
export interface IFridge {
  is_order_available: boolean;
  products: IProduct[];
}

export interface IProduct {
  id: string;
  price: string;
  image: string;
  description: string;
  category: string;
  category_id: string;
  title: string;
  qty: number;
  count: number;
}

export interface ICart {
  products: IProduct[];
  fridgeId: string;
  updatedAt: string;
}
