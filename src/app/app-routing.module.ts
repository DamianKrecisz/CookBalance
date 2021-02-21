import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminIngredientsComponent } from './pages/dashboard/admin-components/admin-ingredients/admin-ingredients.component';
import { AdminEditRecipesComponent } from './pages/dashboard/admin-components/admin-edit-recipes/admin-edit-recipes.component';
import { AdminAddRecipeComponent } from './pages/dashboard/admin-components/admin-add-recipe/admin-add-recipe.component';
import { AdminGuardService } from './services/admin-guard.service';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { MainPageComponent } from './pages/main-page/main-page-page.component';
import { DashboardMainPageComponent } from './pages/dashboard/dashboard-main-page/dashboard-main-page.component';
import { ClientSingleRecipesComponent } from './pages/dashboard/user-components/client-single-recipes/client-single-recipes.component';
import { ClientMenuComponent } from './pages/dashboard/user-components/client-menu/client-menu.component';
import { ClientDetailsComponent } from './pages/dashboard/user-components/client-details/client-details.component';
import { ClientFavoriteRecipesComponent } from './pages/dashboard/user-components/client-favorite-recipes/client-favorite-recipes.component';
import { ClientShopListComponent } from './pages/dashboard/user-components/client-shop-list/client-shop-list.component';
import { ClientBrowseRecipesComponent } from './pages/dashboard/user-components/client-browse-recipes/client-browse-recipes.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientStartPageComponent } from './pages/dashboard/user-components/client-start-page/client-start-page.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/start' },
  { path: 'start', component: MainPageComponent },
  { path: 'login', component: LoginRegisterComponent },
  {
    path: 'client-dashboard', component: DashboardComponent
    // , canActivate: [AdminGuardService] 
    ,
    children: [
      {
        path: 'dashboard-main-page',
        component: DashboardMainPageComponent,
        outlet: 'clientDashboardOutlet'
      },
      {
        path: 'admin-add-recipe',
        component: AdminAddRecipeComponent,
        outlet: 'clientDashboardOutlet'
      },
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
        path: 'client-start-page',
        component: ClientStartPageComponent,
        outlet: 'clientDashboardOutlet'
      },
      {
        path: 'clients-favorite-recipes',
        component: ClientFavoriteRecipesComponent,
        outlet: 'clientDashboardOutlet'
      }
      ,
      {
        path: 'client-shop-list',
        component: ClientShopListComponent,
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
