import { createReducer, on } from '@ngrx/store'
import { IVideoCard } from 'src/app/admin/models/video-card.model'
import { addCustomVideo } from '../actions/videos.actions'

const initialState: IVideoCard[] = []

export const customVideosReducer = createReducer(
  initialState,
  on(addCustomVideo, (state, payload) => [...state, payload.video])
)
