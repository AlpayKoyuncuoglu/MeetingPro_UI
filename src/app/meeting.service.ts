import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting } from './model/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'https://localhost:7105/api/meetings'; // API URL'inizi buraya ekleyin

  constructor(private http: HttpClient) {}

  getMeetings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(this.apiUrl, meeting);
  }

  updateMeeting(meeting: Meeting): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${meeting.id}`, meeting);
  }

  deleteMeeting(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
