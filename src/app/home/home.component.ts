import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../meeting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  meetings: any[] = [];
  meetingForm: FormGroup;
  errorMessage: string | null = null;
  editingMeeting: any | null = null;

  constructor(
    private fb: FormBuilder,
    private meetingsService: MeetingService,
    private router: Router
  ) {
    this.meetingForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadMeetings();
  }

  loadMeetings() {
    this.meetingsService.getMeetings().subscribe({
      next: (meetings:any) => this.meetings = meetings,
      error: (err:any) => this.errorMessage = 'Failed to load meetings'
    });
  }

  onSubmit() {
    if (this.meetingForm.valid) {
      if (this.editingMeeting) {
        // Update meeting
        const updatedMeeting = { ...this.editingMeeting, ...this.meetingForm.value };
        this.meetingsService.updateMeeting(updatedMeeting).subscribe({
          next: () => {
            this.loadMeetings();
            this.onReset();
          },
          error: (err:any) => this.errorMessage = 'Failed to update meeting'
        });
      } else {
        // Add new meetinzg
        this.meetingsService.addMeeting(this.meetingForm.value).subscribe({
          next: () => {
            this.loadMeetings();
            this.meetingForm.reset();
          },
          error: (err:any) => this.errorMessage = 'Failed to add meeting'
        });
      }
    }
  }

  onEdit(meeting:any) {
    this.editingMeeting = meeting;
    this.meetingForm.patchValue(meeting);
  }

  onDelete(id: number) {
    this.meetingsService.deleteMeeting(id).subscribe({
      next: () => this.loadMeetings(),
      error: (err:any) => this.errorMessage = 'Failed to delete meeting'
    });
  }

  onReset() {
    this.editingMeeting = null;
    this.meetingForm.reset();
  }

  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }
}
