import { Component, OnInit } from "@angular/core";
import { NotesService } from "../services/notes.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.less"]
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  notes: any = [];
  loading = true;
  searchForm: FormGroup;

  constructor(
    private notesService: NotesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private user: UserService
  ) {}

  ngOnInit() {
    this.getNoteCategories();

    this.InitalNotes();
    this.searchForm = this.formBuilder.group({
      term: [""]
    });

    this.onChanges();
  }

  InitalNotes() {
    this.notesService.searchNotes("?limit=10").subscribe(notes => {
      this.notes = notes;
    });
  }

  getNoteCategories() {
    this.notesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getNotesByCategory(category) {
    this.notesService.searchNotes(`?category=${category}`).subscribe(notes => {
      this.notes = notes;
    });
  }

  deleteNote(id) {
    this.notesService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter(note => note._id !== id);
      this.getNoteCategories();
    });
  }

  onChanges() {
    this.searchForm.get("term").valueChanges.subscribe(val => {
      this.notesService
        .searchNotes(`?limit=10&content=${val}`)
        .subscribe(notes => {
          this.notes = notes;
        });
    });
  }

  get currentRole() {
    return this.user.role;
  }
}
