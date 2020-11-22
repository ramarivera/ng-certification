import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  OPEN_WEATHER_MAP_APP_ID,
  OPEN_WEATHER_MAP_BASE_URL,
} from './app.tokens';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import {
  FullscreenOverlayContainer,
  OverlayContainer,
  OverlayModule,
} from '@angular/cdk/overlay';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({}),
    NgxWebstorageModule.forRoot(),
    OverlayModule,
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent],
  providers: [
    // { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
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
