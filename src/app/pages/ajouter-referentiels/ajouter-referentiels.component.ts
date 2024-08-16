import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ReferentielService } from 'src/app/core/services/referentiel/referentiel.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-ajouter-referentiels',
  templateUrl: './ajouter-referentiels.component.html',
  styleUrls: ['./ajouter-referentiels.component.scss']
})
export class AjouterReferentielsComponent {
  selectedTab: string = 'profil'
  id: any;
  User: any;
  form: any;
  referentiel: any;
  constructor(
    private serviceUser: UserService,
    private storageService: StorageService,
    private referentielService: ReferentielService,
    private authService: AuthService,

    private router: Router,
  ) {

    this.User = this.storageService.getUser();
    this.form = {
      nom: this.User.nom,
      prenom: this.User.prenom,
      telephone: this.User.telephone,
      email: this.User.email,
      genre: this.User.genre,
      adresse: this.User.adresse,
    };
    console.log(this.User); 
    
  };

  form1: any = {
    referentiel: null,
    finalite: null,
    nom: null,
    dervnierversion: null,
    langue: null,
    datecreation: null,
    idinf: null
  };
  ngOnInit(): void {
 // AFFICHER LA LISTE DES referentiel
 this.referentielService.AfficherListReferentiel().subscribe(data => {
  this.referentiel = data;
  console.log(this.referentiel);
});
}

submitForm1(form1:NgForm){
  this.referentielService.Ajouter(this.form1.referentiel, this.form1.finalite, this.form1.nom, this.form1.dervnierversion,this.form1.langue,this.form1.datecreation,this.form1.idinf).subscribe((data) => {
    // Enregistrez les données de l'utilisateur dans le service de stockage (session storage ou autre).
    console.log(data);
    console.log(this.referentiel.id);
    location.reload();
  });
}

}
