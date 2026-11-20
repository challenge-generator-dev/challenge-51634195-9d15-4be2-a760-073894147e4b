// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { useForm } from 'react-hook-form';
import { CreateOrderRequest } from '../../../shared/models/create-order-request.model';
import { OrderItem } from '../../../shared/models/order.model';

interface OrderFormProps {
  onSubmit: (order: CreateOrderRequest) => Promise<void>;
}

interface FormData {
  customerId: string;
  productId: string;
  quantity: string;
  price: string;
}

export function OrderForm({ onSubmit }: OrderFormProps): JSX.Element {
  throw new Error('TODO(reto): anonymous');
}