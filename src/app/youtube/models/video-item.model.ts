import { IVideoStats } from './video-stats.model'

export interface IVideoItem {
  kind: string
  etag: string
  id: IVideoItemId
  snippet: IVideoSnippet
  statistics: IVideoStats
}

interface IVideoSnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: IVideoThumbnailSet
  channelTitle: string
  liveBroadcastContent: LiveBroadcast
  publishTime: string
}

type LiveBroadcast = 'none' | 'yes'

interface IVideoThumbnailSet {
  default: IVideoThumbnail
  medium: IVideoThumbnail
  high: IVideoThumbnail
  standard: IVideoThumbnail
  maxres: IVideoThumbnail
}

interface IVideoThumbnail {
  url: string
  width: string
  height: string
}

interface IVideoItemId {
  kind: string
  videoId: string
}
