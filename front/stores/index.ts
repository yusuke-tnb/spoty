import { ModalsStore } from "./modals";
import { UserStore } from "./user";
import { SpotterStore } from "./spotter";
import { NotifierStore } from "./notifier";

export default {
  modals: new ModalsStore(),
  user: new UserStore(),
  spotter: new SpotterStore(),
  notifier: new NotifierStore()
};

// -------------------------------------------

// export type StoresType = {
//   modals: ModalsStore;
// };

// export const getStores = (isServer, lastUpdate): StoresType => ({
//   modals: new ModalsStore()
// });

// let stores: StoresType | null = null;

// export function initializeStore(isServer, lastUpdate = Date.now()): StoresType {
//   if (isServer) {
//     return getStores(isServer, lastUpdate);
//   } else {
//     if (stores === null) {
//       stores = getStores(isServer, lastUpdate);
//     }
//     return stores;
//   }
// }
