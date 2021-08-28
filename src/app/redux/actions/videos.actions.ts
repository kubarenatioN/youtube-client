import { createAction, props } from '@ngrx/store'
import { IAddCustomVideoAction, IGetVideosAction } from './actions.models'

export const getVideos = createAction(
  '[Search Service] Search Videos',
  props<IGetVideosAction>()
)

export const addVideos = createAction(
  '[Catalog Component] Load More Videos',
  props<IGetVideosAction>()
)

export const addCustomVideo = createAction(
  '[Admin Page] Add Custom Video',
  props<IAddCustomVideoAction>()
)
