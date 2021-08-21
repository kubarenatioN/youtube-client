export interface IVideoItem {
  kind: string
  etag: string
  id: IVideoItemId
  snippet: IVideoSnippet
  statistics: IVideoStats
}

export interface IVideoStatsItem {
  kind: string
  etag: string
  id: string
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

export interface IVideoStats {
  viewCount: string
  likeCount: string
  dislikeCount: string
  favoriteCount: string
  commentCount: string
}

export interface IVideoItemId {
  kind: string
  videoId: string
}
