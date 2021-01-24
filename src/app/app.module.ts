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
import { DashboardComponent } from './admin-front/dashboard/dashboard.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StartComponent } from './client-front/start/start.component';
import { ClientLoginComponent } from './client-front/client-login/client-login.component';
import { ClientRegisterComponent } from './client-front/client-register/client-register.component';
import { UserTestComponent } from './client-front/start/user-test/user-test.component';
import { AdminTestComponent } from './client-front/start/admin-test/admin-test.component';
import { AuthService } from './services/auth.service';
import { ClientDashboardComponent } from './client-front/client-dashboard/client-dashboard.component';
import { ClientMenuComponent } from './client-front/client-dashboard/client-menu/client-menu.component';
import { ClientDetailsComponent } from './client-front/client-dashboard/client-details/client-details.component';
import { ClientFavoriteRecipesComponent } from './client-front/client-dashboard/client-favorite-recipes/client-favorite-recipes.component';
import { ClientBmiComponent } from './client-front/client-dashboard/client-bmi/client-bmi.component';
import { ClientShopListComponent } from './client-front/client-dashboard/client-shop-list/client-shop-list.component';
import { ClientCaloriesRequiredComponent } from './client-front/client-dashboard/client-calories-required/client-calories-required.component';
import { AdminIngredientsComponent } from './admin-front/admin-ingredients/admin-ingredients.component';
import { ClientBrowseRecipesComponent } from './client-front/client-dashboard/client-browse-recipes/client-browse-recipes.component';
import { ClientSingleRecipesComponent } from './client-front/client-dashboard/client-browse-recipes/client-single-recipes/client-single-recipes.component';
import { AdminEditRecipesComponent } from './admin-front/dashboard/admin-edit-recipes/admin-edit-recipes.component';
import { AdminAddRecipeComponent } from './admin-front/dashboard/admin-add-recipe/admin-add-recipe.component';

registerLocaleData(pl);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StartComponent,
    ClientLoginComponent,
    ClientRegisterComponent,
    UserTestComponent,
    AdminTestComponent,
    ClientDashboardComponent,
    ClientMenuComponent,
    ClientDetailsComponent,
    ClientFavoriteRecipesComponent,
    ClientBmiComponent,
    ClientShopListComponent,
    ClientCaloriesRequiredComponent,
    ClientBrowseRecipesComponent,
    ClientSingleRecipesComponent,
    AdminIngredientsComponent,
    AdminEditRecipesComponent,
    AdminAddRecipeComponent
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
