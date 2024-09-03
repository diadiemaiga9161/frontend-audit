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
  // referentiel: any;
  referentiel: any = {};
  finalite: string = '';
  nom: string = '';
  dervnierversion: string = '';
  langue: string = '';
  datecreation: string = '';
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
  };
  ngOnInit(): void {
 // AFFICHER LA LISTE DES referentiel
 this.referentielService.AfficherListReferentiel().subscribe(data => {
  this.referentiel = data;
  console.log(this.referentiel);
});
}

// submitForm1(form1:NgForm){
//   this.referentielService.Ajouter(this.form1.referentiel, this.form1.finalite, this.form1.nom, this.form1.dervnierversion,this.form1.langue,this.form1.datecreation).subscribe((data) => {
//     // Enregistrez les données de l'utilisateur dans le service de stockage (session storage ou autre).
//     console.log(data);
//     console.log(this.referentiel.finalite);
//     location.reload();
//   });
// }

submitForm1(form1: NgForm) {
  // Récupérer les valeurs du formulaire
  const referentiel = form1.value.referentiel;
  const finalite = form1.value.finalite;
  const nom = form1.value.nom;
  const dervnierversion = form1.value.dervnierversion;
  const langue = form1.value.langue;
  const datecreation = form1.value.datecreation;

  // Appeler le service pour ajouter le référentiel
  this.referentielService.Ajouter(referentiel, finalite, nom, dervnierversion, langue, datecreation)
    .subscribe((data) => {
      console.log('Référentiel ajouté avec succès:', data);
      console.log('Finalité:', finalite);
      
      // Recharger la page après l'ajout
      location.reload();
    }, (error) => {
      console.error('Erreur lors de l\'ajout du référentiel:', error);
    });
}


}
