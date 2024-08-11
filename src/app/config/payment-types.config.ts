export enum PaymentStatus {
  Pending = 0,
  InProcess = 1,
  Successful = 2,
  Failed = 3,
  Timeout = 4,
  Refunded = 5
}


export enum OrderStatus {
  New = 0,
  DoorOpeningAllowed = 1,
  DoorOpened = 2,
  ClosedSuccessfully = 3,
  ClosureError = 4
}
