import produce from 'immer';
import create from 'zustand';

export interface State extends Record<string, any> {}

const useStore = create<State>((set, get) => ({}));

export default useStore;
