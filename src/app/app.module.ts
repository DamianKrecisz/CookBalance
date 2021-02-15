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
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';
import { AdminIngredientsComponent } from './pages/dashboard/admin-components/admin-ingredients/admin-ingredients.component';
import { AdminEditRecipesComponent } from './pages/dashboard/admin-components/admin-edit-recipes/admin-edit-recipes.component';
import { AdminAddRecipeComponent } from './pages/dashboard/admin-components/admin-add-recipe/admin-add-recipe.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { MainPageComponent } from './pages/main-page/main-page-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardMainPageComponent } from './pages/dashboard/dashboard-main-page/dashboard-main-page.component';
import { UserModuleModule } from './pages/dashboard/user-components/user-module.module';
import { AdminModuleModule } from './pages/dashboard/admin-components/admin-module.module';

registerLocaleData(pl);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardMainPageComponent,
    LoginRegisterComponent,
    MainPageComponent
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
    AngularFirestoreModule,
    UserModuleModule,
    AdminModuleModule
  ],
  providers: [AuthService, { provide: NZ_I18N, useValue: pl_PL }],
  bootstrap: [AppComponent]
})
export class AppModule { }
