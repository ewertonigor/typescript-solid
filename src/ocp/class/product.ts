import { CartItem } from './types/cart-item';

export class Product implements CartItem {
  constructor(public name: string, public price: number) {}
}
