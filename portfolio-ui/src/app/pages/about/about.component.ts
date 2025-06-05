import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  skills = [
    'Java',
    'Spring Boot',
    'Microservices',
    'PostgreSQL',
    'MongoDB',
    'Apache Kafka',
    'Service Registry',
    'Git'
  ];

  ngOnInit(): void {
    this.animateSkills();
  }

  private animateSkills(): void {
    const skillElements = document.querySelectorAll('.skill-item');
    skillElements.forEach((skill, index) => {
      const element = skill as HTMLElement;
      element.style.animationDelay = `${index * 0.1}s`;
      element.style.animation = 'float 3s ease-in-out infinite';
    });
  }
}
