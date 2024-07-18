import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { FridgeService } from './services/fridge.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'fridge';
  constructor(private route: ActivatedRoute, private router: Router) { }
  private fridgeId!: string;

  fridgeService = inject(FridgeService);


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.fridgeId = id ? id : '66a6805f-70e2-4670-923e-2910ee5ad79b';
      this.fridgeService.changeFridgeId(this.fridgeId);
      this.router.navigate([`fridge-menu/${this.fridgeId}`]);
    });
  }
}
