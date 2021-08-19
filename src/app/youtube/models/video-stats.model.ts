export interface IVideoStatsResponse {
  kind: string
  etag: string
  items: IVideoStatsItem[]
}

export interface IVideoStatsItem {
  kind: string
  etag: string
  id: string
  statistics: IVideoStats
}

export interface IVideoStats {
  viewCount: string
  likeCount: string
  dislikeCount: string
  favoriteCount: string
  commentCount: string
}
