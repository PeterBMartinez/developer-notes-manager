import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecentParamsService } from '../services/recent-params.service';
import { NotesService } from '../services/notes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INote } from '../new-note/new-note.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.less']
})
export class NoteComponent implements OnInit {

  note: any = {};
  loading: Boolean = true;
  categoryTitle: String = '';
  noteForm: FormGroup;
  editing: Boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private recentParams: RecentParamsService, 
    private notes: NotesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private user: UserService
    ) { 
    this.route.params.subscribe(params => {
      this.recentParams.setState(params)
      this.categoryTitle = params.category
    })
  }

  ngOnInit() {
    this.getNote()
  }

  getNote() {
    this.notes.getNote().subscribe((note: INote)=> {
      this.loading = false;
      this.noteForm = this.formBuilder.group({
        category: [note.category, Validators.required],
        title: [note.note.title, Validators.required],
        description: [note.note.description, Validators.required],
        body: [note.note.body, Validators.required]
      })
    })
  }

  goToRoute(url, category) {
    console.log(category)
    var myurl = `/${url}`
    this.router.navigateByUrl(category ? myurl + `/${category}` : myurl);
  }

  editToggle() {
    this.editing = !this.editing;
  }

  updateNote() {
    console.log(this.noteForm.value)
    const {category, title, description, body} = this.noteForm.value;
    const note = {
      category,
      note: {title, description, body}
    }
    this.notes.updateNote(note);
    this.editToggle();
  }

  get currentRole() {
    return this.user.role;
  }

}
