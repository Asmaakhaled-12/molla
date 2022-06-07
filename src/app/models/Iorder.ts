export interface IOrderTocreate{
  basketId:string;
  deliveryMethodId:number;

}

export interface IOrder {
  id: number;
  buyerEmail: string;
  orderDate: string;
  deliveryMethod: string;
  orderItems: IOrderItem[];
  total: number;
  status: string;
}
export interface IOrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
