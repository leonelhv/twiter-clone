import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '../../types/user'



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
    syncUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.username = action.payload.username
      state.photo = action.payload.photo
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

export const isLogged = (state: { user: UserState }) => state.user.id !== ''

export default userSlice.reducer