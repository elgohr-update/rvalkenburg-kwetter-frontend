import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { store as profile, ProfileStore, State as ProfileState } from '@/store/modules/profile';

export type RootState = {
  profile: ProfileState;
};

export type Store = ProfileStore<Pick<RootState, 'profile'>>;

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

plugins.push(createPersistedState({ storage: window.sessionStorage }));

export const store = createStore({
  plugins,
  modules: {
    profile,
  },
});

export function useStore(): Store {
  return store as Store;
}