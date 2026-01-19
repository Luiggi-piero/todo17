export interface IApiResponseCart {
  id: number;
  userId: number;
  date: string;
  products: IProduct[];
}

interface IProduct {
  productId: number;
  quantity: number;
}
