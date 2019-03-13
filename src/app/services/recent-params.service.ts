import { Injectable } from '@angular/core';

export interface RecentStateParams {
  category?: string;
  note_id?: string;
}

@Injectable({
  providedIn: 'root'
})

export class RecentParamsService {
  private state: RecentStateParams = {}

  constructor() { }

  setState(overrides) {
    this.state = Object.assign({}, this.state, overrides)
  }

  getParams() {
    return this.state
  }

  clearState() {
    this.state = {}
  }
}
