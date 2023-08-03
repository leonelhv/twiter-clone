import { createSlice } from '@reduxjs/toolkit'
import { getCookieByString } from '../../utils/helpersCookies'
import { User } from '../../types/user'





const initialState: User = {
  _id: '',
  name: '',
  lastname: '',
  email: '',
  username: '',
  photo: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    syncUser: (state) => {
      const user = getCookieByString<User>('user')
      state._id = user?._id ?? ''
      state.name = user?.name ?? ''
      state.lastname = user?.lastname ?? ''
      state.email = user?.email ?? ''
      state.username = user?.username ?? ''
      state.photo = user?.photo ?? ''
    },
    logout: (state) => {
      state._id = ''
      state.name = ''
      state.lastname = ''
      state.email = ''
      state.username = ''
      state.photo = ''
    }
  },
})

export const { syncUser, logout } = userSlice.actions

export const selectUser = (state: { user: User }) => state.user

export const isLogged = (state: { user: User }) => state.user?._id !== ''

export default userSlice.reducer