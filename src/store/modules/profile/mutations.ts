import { MutationTree } from 'vuex';
import { State } from './state';
import { User } from './profile'

export enum MutationType {
    SET_USER = 'SET_USER',
}

export type Mutations = {
    [MutationType.SET_USER](state: State, payload: User):void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.SET_USER](state, item) {
        state.user = item;
    },
}