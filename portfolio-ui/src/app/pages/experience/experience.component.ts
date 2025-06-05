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
      title: 'Senior Software Architect',
      company: 'TechCorp Solutions',
      period: '2022 - Present',
      description: 'Leading the architecture and development of cloud-native applications serving 5M+ users. Designed microservices architecture that improved system scalability by 300% and reduced deployment time by 80%. Mentoring a team of 12 developers and establishing best practices for code quality and DevOps.',
      achievements: [
        'Architected migration from monolith to microservices using Spring Boot and Docker',
        'Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes',
        'Led performance optimization achieving 40% improvement in response times'
      ]
    },
    {
      title: 'Senior Java Developer',
      company: 'FinanceFlow Inc',
      period: '2019 - 2022',
      description: 'Developed and maintained critical financial services applications processing $1B+ in daily transactions. Specialized in high-frequency trading systems and risk management platforms with sub-millisecond latency requirements.',
      achievements: [
        'Built real-time trading platform handling 100K+ transactions per second',
        'Implemented fraud detection system reducing false positives by 60%',
        'Optimized database queries improving system performance by 50%'
      ]
    },
    {
      title: 'Java Developer',
      company: 'StartupXYZ',
      period: '2017 - 2019',
      description: 'Full-stack development of web applications using Java Spring framework and modern frontend technologies. Worked in an agile environment building MVPs and scaling applications from prototype to production.',
      achievements: [
        'Developed REST APIs serving 10K+ daily active users',
        'Integrated third-party payment systems and APIs',
        'Implemented automated testing achieving 90% code coverage'
      ]
    },
    {
      title: 'Junior Java Developer',
      company: 'WebSolutions Ltd',
      period: '2016 - 2017',
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
