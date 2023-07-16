import { create } from 'zustand'

type ActionsProps = {
  toggleMenu: () => void
}

type StoreProps = {
  state: {
    isShown: boolean
  }
  actions: ActionsProps
}

export const useMenuStore = create<StoreProps>((set) => ({
  state: {
    isShown: false,
  },
  actions: {
    toggleMenu: () =>
      set((state) => ({
        state: { isShown: !state },
      })),
  },
}))
