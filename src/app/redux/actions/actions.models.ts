import { IVideoCard } from 'src/app/admin/models/video-card.model'
import { IVideoStatsItem } from 'src/app/youtube/models/video-item.model'

export interface IGetVideosAction {
  videos: IVideoStatsItem[]
}

export interface IAddCustomVideoAction {
  video: IVideoCard
}
