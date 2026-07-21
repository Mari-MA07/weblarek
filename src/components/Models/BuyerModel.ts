import { IBuyer, TPayment } from '../../types';

export class BuyerModel {
  payment: TPayment = '';
  address: string = '';
  phone: string = '';
  email: string = '';

  setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.address !== undefined) this.address = data.address;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.email !== undefined) this.email = data.email;
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };
  }

  validate(): Record<string, string> | null {
    const errors: Record<string, string> = {};
    if (!this.payment) errors.payment = 'Не выбран способ оплаты';
    if (!this.email) errors.email = 'Укажите email';
    if (!this.phone) errors.phone = 'Укажите телефон';
    if (!this.address) errors.address = 'Укажите адрес';
    return Object.keys(errors).length > 0 ? errors : null;
  }

  clear(): void {
    this.payment = '';
    this.address = '';
    this.phone = '';
    this.email = '';
  }
}