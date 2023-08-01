import { createSlice } from '@reduxjs/toolkit'
import { UserState } from '../../types/user'
import { getFromLocalStorage } from '../../utils/localStorage'



const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  username: '',
  photo: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    syncUser: (state) => {
      const user = getFromLocalStorage<UserState>('user')
      state.id = user?.id ?? ''
      state.name = user?.name ?? ''
      state.email = user?.email ?? ''
      state.username = user?.username ?? ''
      state.photo = user?.photo ?? ''
    },
    logout: (state) => {
      state.id = ''
      state.name = ''
      state.email = ''
      state.username = ''
      state.photo = ''
    }
  },
})

export const { syncUser, logout } = userSlice.actions

export const selectUser = (state: { user: UserState }) => state.user

export const isLogged = (state: { user: UserState }) => state.user?.id !== ''

export default userSlice.reducer