import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { NbTransService } from '@bigbear713/nb-trans';
import { WINDOW_TOKEN } from './window.token';
dayjs.extend(utc);

const defaultGtag = () => { };


@Injectable({
  providedIn: 'root'
})
export class GTagService {

  window = inject(WINDOW_TOKEN);

  private gtag: Function;
  private website_id = '@bigbear713/nb-trans';
  private website_ga_id = this.window.website_ga_id;
  private libs_ga_id = this.window.libs_ga_id;

  constructor(
    private router: Router,
    private transService: NbTransService,
  ) {
    this.gtag = this.window.gtag || defaultGtag;
  }

  trackPage(props: object): void {
    this.trackEvent('View_Page', props);
  }

  trackButton(props: object): void {
    this.trackEvent('Click_Button', props);
  }

  trackLink(props: object): void {
    this.trackEvent('Visit_Link', props);
  }

  private trackEvent(eventName: string, props: object): void {
    const trackCurrProps = {
      send_to: this.website_ga_id,
      datetime: dayjs().utc().format(),
      url: this.router.url,
      language: this.transService.lang,
      ...props,
    };
    const trackLibsProps = {
      ...trackCurrProps,
      send_to: this.libs_ga_id,
      website_id: this.website_id,
    };
    this.gtag('event', eventName, trackCurrProps);
    this.gtag('event', eventName, trackLibsProps);
  }


}
