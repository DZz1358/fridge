import { Pipe, PipeTransform } from '@angular/core';
import { PaymentStatus } from '../config/payment-types.config';

@Pipe({
  name: 'paymentStatus',
  standalone: true,

})
export class PaymentStatusPipe implements PipeTransform {

  transform(type: any): any {
    switch (type) {
      case PaymentStatus.Pending:
        return 'Очікує оплати';

      case PaymentStatus.InProcess:
        return 'В процесі оплати';

      case PaymentStatus.Successful:
        return 'Успішно оплачено';

      case PaymentStatus.Failed:
        return 'Помилка оплати';

      case PaymentStatus.Timeout:
        return 'Час на оплату вийшов';

      case PaymentStatus.Refunded:
        return 'Повернуто кошти';

    }
    return null;
  }

}
