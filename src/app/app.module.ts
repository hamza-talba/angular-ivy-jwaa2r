import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, DashboardComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
