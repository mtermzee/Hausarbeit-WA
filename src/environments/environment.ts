// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
   // Api Call
  API_KEY : '0291bdf03f0cc96a65e251c4580f3a00',
  BASE_URL: 'https://api.themoviedb.org/3',
  
  // 2. Add your credentials from step 1
  firebaseConfig: {
  apiKey: "AIzaSyBcI-hhISMm7Vxv4WpS55FjAqHAv-mYSrM",
  authDomain: "hausarbeit-wa.firebaseapp.com",
  projectId: "hausarbeit-wa",
  storageBucket: "hausarbeit-wa.appspot.com",
  messagingSenderId: "619618195607",
  appId: "1:619618195607:web:16ca48820b1806cc0031d2"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
