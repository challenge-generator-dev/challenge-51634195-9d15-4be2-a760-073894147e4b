import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Order, OrderItem } from '../models/order.model';
import { CreateOrderRequest } from '../models/create-order-request.model';

/**
 * Servicio para interactuar con la API de órdenes.
 * Proporciona métodos para realizar operaciones CRUD sobre órdenes.
 */
export class OrderService {
    private readonly httpClient: AxiosInstance;
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost:3000';
        this.httpClient = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Crea una nueva orden.
     * @param request Datos de la orden a crear.
     * @returns La orden creada.
     */
    async createOrder(request: CreateOrderRequest): Promise<Order> {
        try {
            const response: AxiosResponse<Order> = await this.httpClient.post('/orders', request);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }

    /**
     * Obtiene todas las órdenes.
     * @returns Lista de órdenes.
     */
    async listOrders(): Promise<Order[]> {
        try {
            const response: AxiosResponse<Order[]> = await this.httpClient.get('/orders');
            return response.data;
        } catch (error) {
            console.error('Error listing orders:', error);
            throw error;
        }
    }

    /**
     * Obtiene una orden por su ID.
     * @param id ID de la orden.
     * @returns La orden correspondiente.
     */
    async getOrder(id: string): Promise<Order> {
        try {
            const response: AxiosResponse<Order> = await this.httpClient.get(`/orders/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error getting order:', error);
            throw error;
        }
    }

    /**
     * Actualiza una orden existente.
     * @param id ID de la orden a actualizar.
     * @param status Nuevo estado de la orden.
     * @returns La orden actualizada.
     */
    async updateOrder(id: string, status: string): Promise<Order> {
        try {
            const response: AxiosResponse<Order> = await this.httpClient.put(`/orders/${id}`, { status });
            return response.data;
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    }

    /**
     * Elimina una orden por su ID.
     * @param id ID de la orden a eliminar.
     */
    async deleteOrder(id: string): Promise<void> {
        try {
            await this.httpClient.delete(`/orders/${id}`);
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    }
}