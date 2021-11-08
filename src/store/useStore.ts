import create from "zustand";
import produce from "immer";

export interface State extends Record<string, any> {
}

const useStore = create<State>((set, get) => ({
}));

export default useStore;