
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// ✅ Routing module import
import { AppRoutingModule } from './app-routing.module';

// ✅ Component imports
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Add this
import { HttpClientModule } from '@angular/common/http'; // Add this for service calls

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    ExperienceComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // Required for reactive forms
    FormsModule,         // Required for template-driven forms
    HttpClientModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
