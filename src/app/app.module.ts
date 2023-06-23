import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmartFormComponent } from './standalone-components/smart-form/smart-form.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SmartFormComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
