import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IVideosResponse } from '../models/videos-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
    private http: HttpClient
  ) {}

  getVideos(): Observable<IVideosResponse> {
    return this.http.get<IVideosResponse>('./assets/response.json')
  }
}
