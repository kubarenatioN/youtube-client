export enum SortType {
  None,
  Date,
  ViewsCount,
  KeyWord
}

export type SortOrder = 'desc' | 'asc'

export interface ISortOptions {
  sort: {
    type: SortType
    order: SortOrder
  }
  keywords: string
}
