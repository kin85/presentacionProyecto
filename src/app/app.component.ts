import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from './componentes_global/footer/footer.component';
import { HeaderComponent } from './componentes_global/header/header.component';
import { SharedService } from './service/sharedService';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

  
  
export class AppComponent implements OnInit{
  title = 'rag2daw2025frontend';
  isVisible = false;
  showFooter = false;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.hideComponent$.subscribe(hide => {
      if (hide) {
        this.isVisible = !this.isVisible; 
      }
    });
  }

}
