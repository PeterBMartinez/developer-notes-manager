import { Injectable } from "@angular/core";
import { RestService } from "./rest.service";
import { RecentParamsService } from "./recent-params.service";

@Injectable({
  providedIn: "root"
})
export class NotesService {
  categories: any = [];

  constructor(private rest: RestService, private params: RecentParamsService) {}

  getCategories() {
    const request = this.rest.getRequest("/notes/categories");
    return request;
  }

  getNotesByCategory(filterCategory?: string) {
    const category = this.params.getParams().category || filterCategory;
    const request = this.rest.getRequest(`/notes/category/${category}`);
    return request;
  }

  deleteNote(id) {
    const request = this.rest.deleteRequest(`/notes/note/${id}`);
    return request;
  }

  getNote() {
    const { category, note_id } = this.params.getParams();
    const request = this.rest.getRequest(`/notes/note/${category}/${note_id}`);
    return request;
  }

  createNewNote(note) {
    const request = this.rest.postRequest("/notes/note", note);
    return request;
  }

  updateNote(note) {
    const { note_id } = this.params.getParams();
    const request = this.rest.putRequest(`/notes/note/${note_id}`, note);
    return request;
  }

  searchNotes(params) {
    const request = this.rest.getRequest(`/notes/search${params}`);
    return request;
  }
}
