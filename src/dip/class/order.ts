import { CustomerOrder } from './types/customer-protocol';
import { MessagingProtocol } from './types/messaging-protocol';
import { OrderStatus } from './types/order-status';
import { PersistencyProtocol } from './types/persistency-protocol';
import { ShoppingCartProtocol } from './types/shopping-cart-protocol';

// Responsavel por fazer o checkout do carrinho
export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly messaging: MessagingProtocol,
    private readonly persistency: PersistencyProtocol,
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
