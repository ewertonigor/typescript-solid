type CartItem = { name: string; price: number };

export class ShoppingCart {
  private readonly _items: CartItem[] = []; // -> Começando o array como vazio

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }
}

const shoppingCart = new ShoppingCart();
shoppingCart.addItem({ name: 'Tênis', price: 699.99 });
shoppingCart.addItem({ name: 'Moletom', price: 399.99 });
shoppingCart.addItem({ name: 'Camiseta', price: 199.99 });

shoppingCart.items[1] = { name: 'Sandalia', price: 89.99 };

console.log(shoppingCart.items);
