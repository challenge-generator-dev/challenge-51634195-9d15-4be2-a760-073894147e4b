// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Order, OrderStatus } from '../../domain/models/order.model';

export class InvalidStateTransitionError extends Error {
  constructor(from: OrderStatus, to: OrderStatus) {
    super(`Invalid state transition from ${from} to ${to}`);
    this.name = 'InvalidStateTransitionError';
  }
}

export class InvalidStateError extends Error {
  constructor(state: string) {
    super(`Invalid order state: ${state}`);
    this.name = 'InvalidStateError';
  }
}

export class OrderStateMachine {
  private static readonly VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.PENDING]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    [OrderStatus.PROCESSING]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
    [OrderStatus.COMPLETED]: [],
    [OrderStatus.CANCELLED]: []
  };

  static transition(order: Order, newStatus: OrderStatus): Order {
    throw new Error('TODO(reto): transition');
  }

  static canTransition(order: Order, newStatus: OrderStatus): boolean {
    throw new Error('TODO(reto): canTransition');
  }

  static getAllowedTransitions(order: Order): OrderStatus[] {
    throw new Error('TODO(reto): getAllowedTransitions');
  }

  private static isValidStatus(status: any): status is OrderStatus {
    throw new Error('TODO(reto): isValidStatus');
  }

  static isTerminalState(status: OrderStatus): boolean {
    throw new Error('TODO(reto): isTerminalState');
  }

  static isActiveState(status: OrderStatus): boolean {
    throw new Error('TODO(reto): isActiveState');
  }
}