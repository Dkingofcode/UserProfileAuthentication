import create from 'zustand';

export const useAuthStore = create((set) => ({
   auth : {
     username : ''
   },
   setUsername: () => set((state) => ({auth : { ...state.auth, username: name }})) 
})) 