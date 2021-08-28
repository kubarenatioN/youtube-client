import { IVideoCard } from 'src/app/admin/models/video-card.model'
import { IVideoStatsItem } from 'src/app/youtube/models/video-item.model'

export enum EVideoType {
  Youtube = 'youtube#video',
  Custom = 'custom#video'
}

export interface AppState {
  videos: IVideoStatsItem[]
  customVideos: IVideoCard[]
}
