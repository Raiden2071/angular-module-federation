// import('./bootstrap').catch((err) => console.error(err));


// import { registerRemotes } from '@module-federation/enhanced/runtime';

// fetch('/module-federation.manifest.json')
//   .then((res) => res.json())
//   .then((definitions) => registerRemotes(definitions))
//   .then(() => import('./bootstrap').catch((err) => console.error(err)));
  
import { setRemoteDefinitions } from '@nx/angular/mf';

fetch('/module-federation.manifest.json')
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));