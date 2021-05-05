import { ActionContext, ActionTree } from 'vuex';
import { Mutations, MutationType } from './mutations';
import { State } from './state';
import { RootState } from '../../index'
import { User } from './profile';

export enum ActionTypes {
    SET_USER = 'SET_USER',
}

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.SET_USER](
        { commit }: ActionAugments,
        payload: User
    ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
    [ActionTypes.SET_USER](
        { commit }: ActionAugments,
        payload: User
    ): void {
        commit(MutationType.SET_USER, payload);
    }
}