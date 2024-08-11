import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../config/payment-types.config';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(type: any): any {
    switch (type) {
      case OrderStatus.New:
        return 'Нове замовлення';

      case OrderStatus.DoorOpeningAllowed:
        return 'Дозволено відкрити двері';

      case OrderStatus.DoorOpened:
        return 'Двері відкриті';

      case OrderStatus.ClosedSuccessfully:
        return 'Замовлення успішно закрито';

      case OrderStatus.ClosureError:
        return 'Помилка при закритті замовлення';

    }
    return null;
  }

}
