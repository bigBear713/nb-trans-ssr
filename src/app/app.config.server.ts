import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WINDOW_TOKEN } from './window.token';
import { NB_TRANS_DEFAULT_LANG, NB_TRANS_LOADER, NbTransLang } from '@bigbear713/nb-trans';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(HttpClientModule),
    {
      provide: WINDOW_TOKEN,
      useFactory: () => {
        return typeof window === 'undefined' ? {} : window;
      },
      deps: []
    },
    // {
    //   provide: NB_TRANS_MAX_RETRY,
    //   useValue: 0
    // },
    {
      provide: NB_TRANS_DEFAULT_LANG,
      useValue: NbTransLang.ZH_CN,
    },
    // {
    //   provide: NB_TRANS_LOADER,
    //   useValue: {
    //     // dyn load and the content is a ts file
    //     [NbTransLang.EN]: () => import('./localization/en/translations').then(data => data.trans),
    //     [NbTransLang.ZH_CN]: () => import('./localization/zh-CN/translations').then(data => data.trans),
    //     // direct load
    //     // [NbTransLang.ZH_CN]: trans,
    //   },
    // },
    {
      provide: NB_TRANS_LOADER,
      useFactory: (http: HttpClient) => {
        // it should be an url which can be accessed.
        const urlPrefix = 'http://localhost:4200/';
        return {
          // it is expecting to get the translation file using HTTP via absolute URL when angualr SSR.
          // So here change the file's path as relative/absolute via environment

          // dyn load and the content is a json file
          // [NbTransLang.EN]: () => http.get('./assets/localization/en/translations.json').toPromise(),
          [NbTransLang.EN]: () => http.get(urlPrefix + 'assets/localization/en/translations.json'),
          // [NbTransLang.ZH_CN]: () => http.get('./assets/localization/zh-CN/translations.json').toPromise(),
          [NbTransLang.ZH_CN]: () => http.get(urlPrefix + 'assets/localization/zh-CN/translations.json'),
        };
      },
      deps: [HttpClient]
    },
    // { provide: NB_TRANS_PARAM_KEY_INVALID_WARNING, useValue: false }
    provideRouter(routes)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
