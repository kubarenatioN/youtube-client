export interface IVideoItem {
  kind: string
  etag: string
  id: string
  snippet: IVideoSnippet
  statistics: IVideoStatistics
}

interface IVideoSnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: IVideoThumbnailSet
  channelTitle: string
  tags: string[]
  categoryId: string
  liveBroadcastContent: LiveBroadcast
  localized: ILocalized
  defaultAudioLanguage: string
}

type LiveBroadcast = 'none' | 'yes'

interface ILocalized {
  title: string
  description: string
}

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

interface IVideoStatistics {
  viewCount: string
  likeCount: string
  dislikeCount: string
  favoriteCount: string
  commentCount: string
}
