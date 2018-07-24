import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class CacheService {


  // TO-DO MIKE: rename app-data service to cache service EVERYWHERE!!
  // app data service serves as a central data store (global variables, constants, emitters)

  apiDataTimeout = 100 * 60 * 15; // set the api data service timeout to 15 seconds
  loggedInUser = new EventEmitter<any>();
  loggedInUser$: any;

  userPLMData: any;

  autoLogout = new EventEmitter<any>(); // send an object to the login component with message, icon class and color
  autoLogout$: any;

  noticeModalData = new EventEmitter<any>();

  toast = new EventEmitter<any>();

  resetTimer = new EventEmitter<boolean>();

  clickedClass = new EventEmitter<string>();

  nestedOrgData = new EventEmitter<any>();
  $nestedOrgData: any;
  nestedOrgDataRequested: boolean;
  nestedOrgDataCached: boolean;

  appLoadPath: string;  // the url that was hit on app load/refresh, stored for deep linking if user is not authenticated

  // emit data to the dashboard component telling it to remove the message telling user to update their job title
  profileHasBeenUpdated = new EventEmitter<boolean>();

  // standard red color for alert icon
  alertIconColor = 'rgb(193, 27, 27)';

  constructor() { }

  // TO-DO BRYAN: create a toast service and move
  raiseToast( toastType: 'success' | 'warn' | 'error', toastText: string) {
    this.toast.emit({
      type: toastType,
      text: toastText
    });
  }

}
