/**
 * Modelo de orden para el cliente.
 * Representa una orden con sus items y estado.
 */
export interface Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}