import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/authentication-guard.service';
import { ClientsComponent } from './pages/clients/clients.component';
import { ListOfProductsComponent } from './pages/products/list-of-products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { StatsComponent } from './pages/stats/stats.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/userLogin' },
  { path: 'userLogin', component: UserLoginComponent },
  {
    path: 'dashboard', component: DashboardComponent,// canActivate: [AuthGuard],
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
