import { createReducer, on } from '@ngrx/store'
import { IVideoStatsItem } from 'src/app/youtube/models/video-item.model'
import { addVideos, getVideos } from '../actions/videos.actions'

const initialState: IVideoStatsItem[] = []

export const videosReducer = createReducer(
  initialState,
  on(getVideos, (state, payload) => [...payload.videos]),
  on(addVideos, (state, payload) => [...state, ...payload.videos])
)
