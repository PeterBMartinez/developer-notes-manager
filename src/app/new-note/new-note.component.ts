import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';


export interface INote {
  category?: String
  _id?: String
  note: {
    title: String
    description: String
    body: String
  }
}

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.less']
})
export class NewNoteComponent implements OnInit {

  constructor(
    private notes: NotesService,
    private router: Router, 
    private formBuilder: FormBuilder
    ) { }

  newNoteForms: FormGroup;
  submitted: Boolean = false;

  options: Object = {
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'embedly', 'insertTable', '|', 'emoticons', 'fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', 'spellChecker', 'html']
  }

  ngOnInit() {
    this.newNoteForms = this.formBuilder.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  createNote() {
    this.submitted = true;
    const {category, title, description, body} = this.newNoteForms.value;
    const note = {
      category,
      note: {title, description, body}
    }
    if (this.newNoteForms.invalid) {
      return;
    }
    this.notes.createNewNote(note).subscribe((newNote: INote) => {
      this.goToRoute('categories', category, newNote._id)
    });
  }

  goToRoute(url, category, id) {
    var myurl = `/${url}/${category}/${id}`
    this.router.navigateByUrl(myurl);
  }
}
