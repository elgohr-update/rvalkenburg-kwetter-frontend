import { GetterTree } from 'vuex';
import { User } from './profile'
import { RootState } from '@/store';
import { State } from './state';

export type Getters = {
  user(state: State): User;
}

export const getters: GetterTree<State, RootState> & Getters = {
  user: (state) => state.user,
};