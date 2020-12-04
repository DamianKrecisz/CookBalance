import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, pl_PL } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import pl from '@angular/common/locales/pl';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { UserLoginComponent } from './pages/user-login/user-login.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/authentication-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ClientsComponent } from './pages/clients/clients.component';
import { ListOfProductsComponent } from './pages/products/list-of-products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AddOrderComponent } from './pages/orders/add-order/add-order.component';
import {StatsComponent} from './pages/stats/stats.component'
registerLocaleData(pl);

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    DashboardComponent,
    ClientsComponent,
    ListOfProductsComponent,
    OrdersComponent,
    AddOrderComponent,
    StatsComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: pl_PL },AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
