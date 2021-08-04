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
  thumbnails: {
    default: IVideoThumbnail
    medium: IVideoThumbnail
    high: IVideoThumbnail
    standard: IVideoThumbnail
    maxres: IVideoThumbnail
  }
  channelTitle: string
  tags: string[]
  categoryId: string
  liveBroadcastContent: 'none' | string
  localized: {
    title: string
    description: string
  }
  defaultAudioLanguage: string
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
