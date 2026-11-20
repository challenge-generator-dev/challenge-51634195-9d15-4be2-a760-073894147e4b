// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { useState, useCallback } from 'react';
import { Order } from '../../../shared/models/order.model';

interface UseOrderStateReturn {
  orders: Order[];
  loading: boolean;
  error: Error | null;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrderInState: (updatedOrder: Order) => void;
  removeOrder: (orderId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export function useOrderState(): UseOrderStateReturn {
  throw new Error('TODO(reto): useOrderState');
}