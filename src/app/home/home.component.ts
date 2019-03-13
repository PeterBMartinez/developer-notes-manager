import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { INote } from '../new-note/new-note.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  recentNotes: any;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.searchNotes('?limit=3').subscribe(notes => {
      this.recentNotes = notes
      console.log(notes)
    })
  }

}
