import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @Output() pageChange = new EventEmitter<string>();

  heroText = 'A Software professional with 2.9 years of experience specializing in data integration gateways within the trading sector.';
  displayText = '';
  
  ngOnInit(): void {
    this.typeWriter();
  }

  onButtonClick(pageId: string, event: Event): void {
    event.stopPropagation();
    this.pageChange.emit(pageId);
  }

  private typeWriter(): void {
    let i = 0;
    const speed = 30;
    
    const type = () => {
      if (i < this.heroText.length) {
        this.displayText += this.heroText.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };
    
    setTimeout(type, 500); // Start after component loads
  }
}
