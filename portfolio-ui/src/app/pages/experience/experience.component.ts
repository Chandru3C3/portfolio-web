import { Component, OnInit, OnDestroy } from '@angular/core';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit, OnDestroy {

  experiences: Experience[] = [
    {
      title: 'Software Engineer',
      company: 'Sysveda Information Technology',
      period: '2023 - present',
      description: 'Full-stack development of web applications using Java Spring framework and modern frontend technologies. Worked in an agile environment building MVPs and scaling applications from prototype to production.',
      achievements: [
        'Developed REST APIs serving 10K+ daily active users',
        'Integrated third-party payment systems and APIs',
        'Implemented automated testing achieving 90% code coverage'
      ]
    },
    {
      title: 'Software Engineer Trainee',
      company: 'Sysveda Information Technology',
      period: '2022 - 2023',
      description: 'Started my professional journey developing enterprise web applications. Gained hands-on experience with Java EE, SQL databases, and agile development methodologies while working on client projects.',
      achievements: [
        'Contributed to e-commerce platform serving 50+ retail clients',
        'Learned test-driven development and code review processes',
        'Participated in client meetings and requirement gathering'
      ]
    }
  ];

  private observer!: IntersectionObserver;

  ngOnInit(): void {
    this.initializeAnimations();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initializeAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Start observing timeline items after view init
    setTimeout(() => {
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach(item => {
        this.observer.observe(item);
      });
    }, 100);
  }

  trackByIndex(index: number, item: Experience): number {
    return index;
  }

}
