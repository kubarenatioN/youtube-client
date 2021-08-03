import { IVideoItem } from './video-item.model';

export interface IVideosResponse {
  kind: string
  etag: string
  pageInfo: IPageInfo,
  items: IVideoItem[]
}

interface IPageInfo {
  totalResults: number
  resultsPerPage: number
}
