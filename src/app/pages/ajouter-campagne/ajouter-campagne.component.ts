import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajouter-campagne',
  templateUrl: './ajouter-campagne.component.html',
  styleUrls: ['./ajouter-campagne.component.scss']
})
export class AjouterCampagneComponent { 
   // bread crumb items
 breadCrumbItems: Array<{}>;
 constructor() { }
//  ngOnInit() {
//   this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];
// }

}
