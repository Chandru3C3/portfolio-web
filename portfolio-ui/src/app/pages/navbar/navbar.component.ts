import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-navbar',

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent { 
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const nav = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (nav && mobileMenu && !nav.contains(target) && !mobileMenu.contains(target)) {
      this.isMobileMenuOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth > 768) {
      this.isMobileMenuOpen = false;
    }
  }
}
