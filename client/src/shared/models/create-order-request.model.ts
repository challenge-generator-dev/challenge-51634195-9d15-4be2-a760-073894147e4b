/**
 * DTO para creación de órdenes en el cliente.
 * Contiene los datos necesarios para crear una nueva orden.
 */
export interface CreateOrderRequest {
    customerId: string;
    items: OrderItem[];
}

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}