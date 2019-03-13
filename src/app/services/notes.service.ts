import { Injectable } from '@angular/core';
import { RestService } from './rest.service'; 
import { RecentParamsService } from './recent-params.service';

@Injectable({
  providedIn: 'root'
})

export class NotesService {

  categories: any = []

  constructor( private rest: RestService, private params: RecentParamsService) { }

  getCategories() {
    let request = this.rest.getRequest('/notes/categories');
    return request;
  }

  getNotesByCategory(filterCategory? :String) {
    let category = this.params.getParams().category || filterCategory
    console.log('Notes Service',category);
    let request = this.rest.getRequest(`/notes/category/${category}`);
    return request;
  }

  deleteNote(id) {
    let request = this.rest.deleteRequest(`/notes/note/${id}`);
    return request;
  }

  getNote() {
    const { category, note_id } = this.params.getParams();
    console.log(category, note_id);
    let request = this.rest.getRequest(`/notes/note/${category}/${note_id}`);
    return request;
  }

  createNewNote (note) {
    let request = this.rest.postRequest('/notes/note', note);
    return request
  }

  updateNote (note) {
    const { note_id } = this.params.getParams()
    let request = this.rest.putRequest(`/notes/note/${note_id}`, note).subscribe(note => {
      console.log(note)
    })
    return request;
  }

  searchNotes (params) {
    let request = this.rest.getRequest(`/notes/search${params}`)
    return request;
  }
}
