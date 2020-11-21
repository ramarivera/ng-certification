import { inject, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const OPEN_WEATHER_MAP_APP_ID = new InjectionToken<string>(
  'OPEN_WEATHER_MAP_APP_ID'
);
export const OPEN_WEATHER_MAP_BASE_URL = new InjectionToken<string>(
  'OPEN_WEATHER_MAP_BASE_URL'
);

export const WINDOW = new InjectionToken<Window>(
  'An abstraction over global window object',
  {
    factory: () => {
      const { defaultView } = inject(DOCUMENT);

      if (!defaultView) {
        throw new Error('Window is not available');
      }

      return defaultView;
    },
  }
);
