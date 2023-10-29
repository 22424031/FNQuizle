import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './shared/components/footer/footer.module';
import { HeaderModule } from './shared/components/header/header.module';
import { LoadingSpinnerModule } from './shared/components/loading-spinner/loading-spinner.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthModule } from './modules/auth/auth.module';


export function tokenGetter() {
  return localStorage.getItem("token");
}
const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: tokenGetter,
      allowedDomains: ["localhost:4200"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
  }
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    FooterModule,
    LoadingSpinnerModule,
    FormsModule,MatFormFieldModule,
    ReactiveFormsModule, HttpClientModule,JwtModule.forRoot(JWT_Module_Options), AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
