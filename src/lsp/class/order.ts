import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';
import { ShoppingCart } from './shopping-cart';
import { CustomerOrder } from './types/customer-protocol';
import { OrderStatus } from './types/order-status';

// Responsavel por fazer o checkout do carrinho
export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
    private readonly customer: CustomerOrder
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio');
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Seu pedido com total de ${this.cart.totalWithDiscount()} foi recebido.`
    );
    this.persistency.saveOrder();
    this.cart.clear();

    console.log(
      'O cliente é:',
      this.customer.getName(),
      this.customer.getIDN()
    );
  }
}
