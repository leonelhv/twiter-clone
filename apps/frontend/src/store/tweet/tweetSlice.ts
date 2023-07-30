import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Itweet } from '../../types/tweet'

interface TweetState {
  newTweet: string
  tweets: Itweet[]
}

const initialState: TweetState = {
  newTweet: '',
  tweets: [],
}

export const tweetSlice = createSlice({
  name: 'twt',
  initialState,
  reducers: {
    setNewTweet: (state, action: PayloadAction<string>) => {
      state.newTweet = action.payload
    },
    addTweetToList: (state, action: PayloadAction<Itweet>) => {
      state.tweets = [action.payload, ...state.tweets]
    },
    addArrayTweetToList: (state, action: PayloadAction<Itweet[]>) => {
      state.tweets = [...action.payload]
    }
  },
})

export const { addTweetToList, setNewTweet, addArrayTweetToList } = tweetSlice.actions

export const selectTweet = (state: { twt: TweetState }) => state.twt.newTweet

export const selectTweets = (state: { twt: TweetState }) => state.twt.tweets

export default tweetSlice.reducer