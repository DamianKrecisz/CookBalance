import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminIngredientsComponent } from './admin-ingredients/admin-ingredients.component';
import { AdminEditRecipesComponent } from './admin-edit-recipes/admin-edit-recipes.component';
import { AdminAddRecipeComponent } from './admin-add-recipe/admin-add-recipe.component';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AdminIngredientsComponent,
    AdminEditRecipesComponent,
    AdminAddRecipeComponent
  ],
  imports: [
    CommonModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ]
})
export class AdminModuleModule { }
