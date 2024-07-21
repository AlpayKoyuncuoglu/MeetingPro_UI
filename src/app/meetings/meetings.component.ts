import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  meetings: any[] = [];
  errorMessage: string | null = null;

  constructor(private meetingService: MeetingService) {}

  ngOnInit(): void {
    this.loadMeetings();
  }

  loadMeetings(): void {
    this.meetingService.getMeetings().subscribe({
      next: (data:any) => this.meetings = data,
      error: (err:any) => this.errorMessage = 'Failed to load meetings'
    });
  }
}
