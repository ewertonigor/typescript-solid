import { Messaging } from './services/messaging';
import { Order } from './class/order';
import { Persistency } from './services/persistency';
import { Product } from './class/product';
import { ShoppingCart } from './class/shopping-cart';
import { FiftyPercentDiscount } from './class/discount';

// Main -> Parte mais sujas do código
// const tenPercentDiscount = new TenPercentDiscount();
// const noDiscount = new NoDiscount();

const fiftyPercentDiscount = new FiftyPercentDiscount();
const shoppingCart = new ShoppingCart(fiftyPercentDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, messaging, persistency);

shoppingCart.addItem(new Product('Tênis', 699.99));
shoppingCart.addItem(new Product('Moletom', 399.99));
shoppingCart.addItem(new Product('Camiseta', 199.99));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
