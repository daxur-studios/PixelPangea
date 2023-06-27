import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmartFormComponent } from './standalone-components/smart-form/smart-form.component';
import { MainMenuPageComponent } from './pages/main-menu-page/main-menu-page.component';
import { LevelEditorPageComponent } from './pages/level-editor-page/level-editor-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EngineModule, EngineComponent } from '@daxur-studios/engine';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    SmartFormComponent,
    MainMenuPageComponent,
    LevelEditorPageComponent,
    EngineModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
