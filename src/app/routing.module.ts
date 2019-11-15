import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { CategoriesComponent } from "./categories/categories.component";
import { NewNoteComponent } from "./new-note/new-note.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoteComponent } from "./note/note.component";
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { HomeComponent } from "./home/home.component";
import { ContactComponent } from "./contact/contact.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "categories/:category/:note_id", component: NoteComponent },
  { path: "new-note", component: NewNoteComponent },
  { path: "contact", component: ContactComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  declarations: [
    CategoriesComponent,
    NewNoteComponent,
    NoteComponent,
    LoginComponent,
    NotFoundComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
