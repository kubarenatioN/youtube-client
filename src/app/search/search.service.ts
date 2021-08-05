import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IVideosResponse } from '../models/videos-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private url = './assets/response.json'

  videos = this.http.get<IVideosResponse>(this.url)

  constructor(
    private http: HttpClient
  ) {}

  getVideos(): Observable<IVideosResponse> {
    return this.http.get<IVideosResponse>(this.url)
  }
}
