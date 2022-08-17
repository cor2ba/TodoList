import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { WorksComponent } from './works/works.component';
import { HttpClientModule } from '@angular/common/http';
import { WorksIndividualComponent } from './works-individual/works-individual.component';

@NgModule({
  declarations: [AppComponent, NavComponent, FooterComponent, WorksComponent, WorksIndividualComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
