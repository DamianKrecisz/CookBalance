import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientMenuComponent } from './client-menu/client-menu.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientSingleRecipesComponent } from './client-single-recipes/client-single-recipes.component';
import { ClientBrowseRecipesComponent } from './client-browse-recipes/client-browse-recipes.component';
import { ClientShopListComponent } from './client-shop-list/client-shop-list.component';
import { ClientFavoriteRecipesComponent } from './client-favorite-recipes/client-favorite-recipes.component';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClientStartPageComponent } from './client-start-page/client-start-page.component';



@NgModule({
  declarations: [
    ClientMenuComponent,
    ClientDetailsComponent,
    ClientFavoriteRecipesComponent,
    ClientShopListComponent,
    ClientBrowseRecipesComponent,
    ClientSingleRecipesComponent,
    ClientStartPageComponent
  ],
  imports: [
    CommonModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ]
})
export class UserModuleModule { }
