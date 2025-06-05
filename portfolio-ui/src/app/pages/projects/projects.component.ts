import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


export interface Project {
  title: string;
  description: string;
  technologies: string[];
  links: { label: string; url: string }[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {


  projects: Project[] = [
    {
      title: 'IPAS - Investment Portfolio Adviser Solution ( June 2023 - present )',
      description: 'A comprehensive online platform tailored for fund advisors. It facilitates seamless access to crucial information such as client Profiles, account summaries, transaction histories and detailed portfolio insights. Noteworthy is the real-time tracking of portolio values, providing advisors with up to the minute market data for informed decision making.',
      technologies: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Apache Camel', 'Apache Zookeeper'],
      links: [
        { label: 'GitHub', url: '/projects' }
       
      ]
    },
    {
      title: 'IPAS ( Sep 2022 - May 2023 )',
      description: 'Desgined and implemented an equity calculation service and batches usig java within an MVC (Model-View-Controller) architecture.',
      technologies: ['Java', 'Spring WebFlux', 'Kafka', 'MongoDB', 'React', 'WebSocket'],
      links: [
        { label: 'GitHub', url: '/projects' }
        
      ]
    },
    // {
    //   title: 'Banking API Gateway',
    //   description: 'Designed and implemented a secure API gateway for a major bank, handling authentication, rate limiting, and routing for 50+ microservices with 99.9% uptime.',
    //   technologies: ['Java', 'Spring Cloud', 'OAuth2', 'JWT', 'Consul', 'Prometheus'],
    //   links: [
    //     { label: 'Case Study', url: '#' },
    //     { label: 'Architecture', url: '#' }
    //   ]
    // },
    // {
    //   title: 'Machine Learning Pipeline',
    //   description: 'Developed a complete ML pipeline for fraud detection in financial transactions. Integrated TensorFlow models with Java microservices for real-time inference.',
    //   technologies: ['Java', 'TensorFlow', 'Apache Beam', 'Google Cloud', 'BigQuery', 'Airflow'],
    //   links: [
    //     { label: 'GitHub', url: '#' },
    //     { label: 'Research Paper', url: '#' }
    //   ]
    // },
    // {
    //   title: 'Inventory Management System',
    //   description: 'Full-stack inventory management solution for retail chains with barcode scanning, automated reordering, and real-time stock tracking across multiple locations.',
    //   technologies: ['Java', 'Spring Boot', 'JPA', 'MySQL', 'Angular', 'PWA'],
    //   links: [
    //     { label: 'GitHub', url: '#' },
    //     { label: 'Demo', url: '#' }
    //   ]
    // },
    // {
    //   title: 'Open Source Library: FastCache',
    //   description: 'A high-performance, thread-safe caching library for Java applications with advanced features like TTL, LRU eviction, and distributed caching support.',
    //   technologies: ['Java', 'Concurrent APIs', 'JMH', 'Maven', 'JUnit', 'Hazelcast'],
    //   links: [
    //     { label: 'GitHub', url: '#' },
    //     { label: 'Maven Central', url: '#' }
    //   ]
    // }
  ];

  ngOnInit(): void {
    this.animateProjectCards();
  }

  private animateProjectCards(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    setTimeout(() => {
      document.querySelectorAll('.project-card').forEach(card => {
        const element = card as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
      });
    }, 100);
  }
}