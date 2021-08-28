import { IVideoItem, IVideoStatsItem } from './video-item.model'

export interface IVideosResponse {
  kind: string
  etag: string
  nextPageToken: string
  pageInfo: IPageInfo
  items: IVideoItem[]
}

export interface IVideosStatsResponse {
  kind: string
  etag: string
  pageInfo: IPageInfo
  items: IVideoStatsItem[]
}

interface IPageInfo {
  totalResults: number
  resultsPerPage: number
}
