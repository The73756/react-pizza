export type CartItem = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  imageUrl: string;
  count: number;
  typeFactor?: number;
  sizeFactor?: number;
  isFullRemove?: boolean;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
