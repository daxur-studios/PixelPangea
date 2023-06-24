import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuPageComponent } from './pages/main-menu-page/main-menu-page.component';
import { LevelEditorPageComponent } from './pages/level-editor-page/level-editor-page.component';

const routes: Routes = [
  {
    path: 'main-menu',
    component: MainMenuPageComponent,
  },
  {
    path: 'level-editor',
    component: LevelEditorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
