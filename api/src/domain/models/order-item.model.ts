import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class OrderItem {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    if (this.price < 0) {
      throw new Error('Price cannot be negative');
    }
  }

  get total(): number {
    return this.quantity * this.price;
  }

  updateQuantity(newQuantity: number): void {
    if (newQuantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    this.quantity = newQuantity;
  }

  updatePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new Error('Price cannot be negative');
    }
    this.price = newPrice;
  }
}