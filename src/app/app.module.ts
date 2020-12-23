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
import { UserLoginComponent } from './admin-front/user-login/user-login.component'
import { DashboardComponent } from './admin-front/dashboard/dashboard.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ClientsComponent } from './admin-front/clients/clients.component';
import { ListOfProductsComponent } from './admin-front/products/list-of-products.component';
import { OrdersComponent } from './admin-front/orders/orders.component';
import { AddOrderComponent } from './admin-front/orders/add-order/add-order.component';
import {StatsComponent} from './admin-front/stats/stats.component'
import { StartComponent } from './client-front/start/start.component';
import { ClientLoginComponent } from './client-front/client-login/client-login.component';
import { ClientRegisterComponent } from './client-front/client-register/client-register.component';
import { UserTestComponent } from './client-front/start/user-test/user-test.component';
import { AdminTestComponent } from './client-front/start/admin-test/admin-test.component';
import { AuthService } from './services/auth.service';
import { ClientDashboardComponent } from './client-front/client-dashboard/client-dashboard.component';

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
    StatsComponent,
    StartComponent,
    ClientLoginComponent,
    ClientRegisterComponent,
    UserTestComponent,
    AdminTestComponent,
    ClientDashboardComponent
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
  providers: [AuthService, { provide: NZ_I18N, useValue: pl_PL }],
  bootstrap: [AppComponent]
})
export class AppModule { }
