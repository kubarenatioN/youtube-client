import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IVideoCard } from 'src/app/admin/models/video-card.model'
import { IVideoStatsItem } from 'src/app/youtube/models/video-item.model'
import { AppState } from '../state/app.state'

export const apiVideos = createFeatureSelector<AppState, IVideoStatsItem[]>(
  'videos'
)

export const customVideos = createFeatureSelector<AppState, IVideoCard[]>(
  'customVideos'
)

export const allVideos = createSelector(
  customVideos,
  apiVideos,
  (custom, youtube) => [...custom, ...youtube]
)
