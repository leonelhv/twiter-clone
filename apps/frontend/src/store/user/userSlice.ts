import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '../../types/user'



const initialState: UserState = {
  id: '',
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
      state.email = action.payload.email
      state.username = action.payload.username
      state.photo = action.payload.photo
    },
    logout: (state) => {
      state.id = ''
      state.email = ''
      state.username = ''
      state.photo = ''
    }

  },
})

export const { syncUser, logout } = userSlice.actions

export const selectUser = (state: { user: UserState }) => state.user

export default userSlice.reducer