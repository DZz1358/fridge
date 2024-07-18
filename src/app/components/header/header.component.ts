import { Component, OnChanges, OnInit, SimpleChanges, computed, inject, signal } from '@angular/core';
import { FridgeService } from '../../services/fridge.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../models/fridge.interfaces';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  cart$: Observable<IProduct[]>;
  totalPrice!: number;
  fridgeService = inject(FridgeService);
  fridgeId!: string;

  constructor() {
    this.cart$ = this.fridgeService.getCart();

    this.fridgeService.currentFridgeId.subscribe(id => {
      this.fridgeId = id;
    });

    this.cart$.subscribe((res: any) => {
      this.totalPrice = res.reduce((acc: any, curr: any) => acc + (+curr.price * curr.count), 0)
    })

  }

  ngOnInit(): void {
    this.fridgeService.getCart().subscribe();
  }
}
