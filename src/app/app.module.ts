import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OPEN_WEATHER_MAP_APP_ID, OPEN_WEATHER_MAP_BASE_URL } from './app.injection-tokens';
import { environment } from '../environments/environment';

@NgModule({
  imports: [BrowserModule, AppRoutingModule],
  declarations: [AppComponent],
  providers: [
    { provide: OPEN_WEATHER_MAP_APP_ID, useValue: environment.openWeatherMapAppId },
    { provide: OPEN_WEATHER_MAP_BASE_URL, useValue: environment.openWeatherMapBaseUrl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
