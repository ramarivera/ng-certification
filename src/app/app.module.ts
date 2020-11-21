import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  OPEN_WEATHER_MAP_APP_ID,
  OPEN_WEATHER_MAP_BASE_URL,
} from './app.injection-tokens';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: OPEN_WEATHER_MAP_APP_ID,
      useValue: environment.openWeatherMapAppId,
    },
    {
      provide: OPEN_WEATHER_MAP_BASE_URL,
      useValue: environment.openWeatherMapBaseUrl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
