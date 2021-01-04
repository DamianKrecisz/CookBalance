import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './admin-front/dashboard/dashboard.component';
import { StartComponent } from './client-front/start/start.component';
import { ClientLoginComponent } from './client-front/client-login/client-login.component';
import { ClientRegisterComponent } from './client-front/client-register/client-register.component';
import { ClientDashboardComponent } from './client-front/client-dashboard/client-dashboard.component';
import { ClientDetailsComponent } from './client-front/client-dashboard/client-details/client-details.component';
import { ClientMenuComponent } from './client-front/client-dashboard/client-menu/client-menu.component';
import { ClientFavoriteRecipesComponent } from './client-front/client-dashboard/client-favorite-recipes/client-favorite-recipes.component';
import { ClientBmiComponent } from './client-front/client-dashboard/client-bmi/client-bmi.component';
import { ClientShopListComponent } from './client-front/client-dashboard/client-shop-list/client-shop-list.component';
import { ClientCaloriesRequiredComponent } from './client-front/client-dashboard/client-calories-required/client-calories-required.component';
import { AdminIngredientsComponent } from './admin-front/admin-ingredients/admin-ingredients.component';
import { ClientBrowseRecipesComponent } from './client-front/client-dashboard/client-browse-recipes/client-browse-recipes.component';
import { ClientSingleRecipesComponent } from './client-front/client-dashboard/client-browse-recipes/client-single-recipes/client-single-recipes.component';
import { AdminEditRecipesComponent } from './admin-front/dashboard/admin-edit-recipes/admin-edit-recipes.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/start' },
  { path: 'start', component: StartComponent },
  { path: 'login', component: ClientLoginComponent },
  { path: 'register', component: ClientRegisterComponent },
  //{ path: 'client-single-recipe/:id', component: ClientSingleRecipesComponent
  //},
  {
    path: 'client-dashboard', component: ClientDashboardComponent,
    children: [
      {
        path: 'client-single-recipe/:id',
        component: ClientSingleRecipesComponent,
        outlet: 'clientDashboardOutlet'
      },
      {
        path: 'client-menu',
        component: ClientMenuComponent,
        outlet: 'clientDashboardOutlet'
      },
      {
        path: 'admin-edit-recipes',
        component: AdminEditRecipesComponent,
        outlet: 'clientDashboardOutlet'
      },
      {
        path: 'client-details',
        component: ClientDetailsComponent,
        outlet: 'clientDashboardOutlet'
      },
      {
        path: 'clients-favorite-recipes',
        component: ClientFavoriteRecipesComponent,
        outlet: 'clientDashboardOutlet'
      },
      {
        path: 'client-bmi',
        component: ClientBmiComponent,
        outlet: 'clientDashboardOutlet'
      }
      ,
      {
        path: 'client-shop-list',
        component: ClientShopListComponent,
        outlet: 'clientDashboardOutlet'
      },
      {
        path: 'client-calories-required',
        component: ClientCaloriesRequiredComponent,
        outlet: 'clientDashboardOutlet'
      },
      {
        path: 'admin-ingredients',
        component: AdminIngredientsComponent,
        outlet: 'clientDashboardOutlet'
      },
      {
        path: 'client-browse-recipes',
        component: ClientBrowseRecipesComponent,
        outlet: 'clientDashboardOutlet',
      }
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
    ]
  },
  //{ path: '**', redirectTo: '/userLogin' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
