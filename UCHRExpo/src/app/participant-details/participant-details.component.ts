import { Component, OnInit, Input } from '@angular/core';
import { ParticipantService } from '../services/participant/participant.service';
import { Participant } from '../models/Participant';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-participant-details',
  templateUrl: './participant-details.component.html',
  styleUrls: ['./participant-details.component.css']
})
export class ParticipantDetailsComponent implements OnInit {

  @Input() data: Participant;
  participants: Participant[];
  

  constructor(private participantService: ParticipantService) { }

  ngOnInit(): void {
    this.participantService.getClients().subscribe(participants=>{this.participants=participants});
    
  }


  
}
