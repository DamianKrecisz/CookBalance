import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './admin-front/user-login/user-login.component';
import { DashboardComponent } from './admin-front/dashboard/dashboard.component';
import { ClientsComponent } from './admin-front/clients/clients.component';
import { ListOfProductsComponent } from './admin-front/products/list-of-products.component';
import { OrdersComponent } from './admin-front/orders/orders.component';
import { StatsComponent } from './admin-front/stats/stats.component';
import { StartComponent } from './client-front/start/start.component';
import { ClientLoginComponent } from './client-front/client-login/client-login.component';
import { ClientRegisterComponent } from './client-front/client-register/client-register.component';
import { ClientDashboardComponent } from './client-front/client-dashboard/client-dashboard.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/start' },
  { path: 'start', component: StartComponent },
  { path: 'login', component: ClientLoginComponent },
  { path: 'register', component: ClientRegisterComponent },
  { path: 'userLogin', component: UserLoginComponent },
  { path: 'client-dashboard', component: ClientDashboardComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: '',
        component: StatsComponent,
        outlet: "content"
      },
      {
        path: 'stats',
        component: StatsComponent,
        outlet: "content"
      },
      {
        path: 'listOfClients',
        component: ClientsComponent,
        outlet: "content"
      },
      {
        path: 'listOfProducts',
        component: ListOfProductsComponent,
        outlet: "content"
      },
      {
        path: 'listOfOrders',
        component: OrdersComponent,
        outlet: "content"
      }
    ]
  },
  { path: '**', redirectTo: '/userLogin' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
