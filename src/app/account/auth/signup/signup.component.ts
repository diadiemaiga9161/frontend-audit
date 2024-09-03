import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import Swal from 'sweetalert2';
import { TypeauditeurService } from 'src/app/core/services/typeauditeur/typeauditeur.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  type = true;
  type1 = true;
  message: string | undefined;
  public currentUser = 'Choisir';
  typeUser: any[] = [
    { nom: 'ENTREPRISE', value: 'entreprise' },
    { nom: 'AUDITEUR', value: 'auditeur' }
  ];

  onChange(typeUser: any) {
    if (typeUser.value === "auditeur") {
      this.typeauditeur;
      this.currentUser = typeUser.value;
    }else {
      // Réinitialisez typeauditeur et le currentUser si un autre type d'utilisateur est sélectionné
      this.typeauditeur = [];
      this.currentUser = 'Choisir';
    }
  }
  
  genre: any[] = [
    { nom: 'Femme', value: 'Femme' },
    { nom: 'Homme', value: 'Homme' }];
  public Toggledata = true;
  public ToggledataC = true;
  form: any = {
    nom: null,
    prenom: null,
    telephone: null,
    email: null,
    typeauditeur : "Choisir",
    genre: "Choisir",
    password: null,
    confirmPassword: null,
    role: "Choisir"
  };
  typeauditeur: any; 

  

  constructor(
    public router: Router,
    private authService: AuthService,
    private typeAuditeurService :  TypeauditeurService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    // AFFICHER LA LISTE DES TypeAudit
    this.typeAuditeurService.AfficherListeTypeAuditeur().subscribe(data => {
      this.typeauditeur = data;
      console.log(this.typeauditeur);
    });
  }

  path() {
    this.router.navigate(["/account/login"]);
  }

  //METHODE PERMETTANT DE CHANGER LE TYPE DE L'ICON EYE DANS LE CHAMP MOT DE PASSE
  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }

  //METHODE PERMETTANT DE CHANGER LE TYPE DE L'ICON EYE DANS LE CHAMP MOT DE PASSE
  iconLogleC() {
    this.ToggledataC = !this.ToggledataC;
  }

  //METHODE PERMETTANT DE S'INSCRIRE
  inscription(): void {
    if (this.form.password !== this.form.confirmPassword) {
      Swal.fire({
        text: "La confirmation du mot de passe ne correspond pas au nouveau mot de passe.",
        icon: 'error',
        confirmButtonText: 'OK',
        heightAuto: false // Ajoutez cette option pour désactiver la hauteur automatique
      });
      return;
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn',
        cancelButton: 'btn btn-danger',
      },
      heightAuto: false
    })
    const { nom, prenom, telephone, email,genre,typeAuditeur, password, role } = this.form;
    console.log(this.form)

    swalWithBootstrapButtons.fire({
      text: "Etes-vous sûre de creer un compte ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.inscription(nom, prenom, telephone,  genre, email,typeAuditeur, password, role).subscribe({
          next: data => {
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            Swal.fire({
              position: 'center',
              text: data.message,
              title: 'Creation de compte',
              icon: 'success',
              heightAuto: false,
              showConfirmButton: true,
              confirmButtonText: "OK",
              confirmButtonColor: '#0857b5',
              showDenyButton: false,
              showCancelButton: false,
              allowOutsideClick: false,

            }).then((result) => {
              this.path();
            })
            console.log(data);

          }, error: err => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
            const errorMessage = err.error && err.error.message ? err.error.message : 'Erreur inconnue';
            // console.log(error);
            swalWithBootstrapButtons.fire(
              "",
              `<h1 style='font-size: 1em !important; font-weight: bold; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${errorMessage}</h1>`,
              "error"
            );
          }
        });
      };
    })
    // }
  }


  //POPUP APRES CONFIRMATION
  popUpConfirmation() {
    const messages = [
      'Votre compte a été cree avec succès.',
      'Pour vous connecter, confirmer le  mail  pour active votre compte'
    ];
    const messageText = messages.join('\n');

    Swal.fire({
      position: 'center',
      text: messageText,
      title: 'Creation de compte',
      icon: 'success',
      heightAuto: false,
      showConfirmButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: '#0857b5',
      showDenyButton: false,
      showCancelButton: false,
      allowOutsideClick: false,

    }).then((result) => {
      this.form.nom = '',
        this.form.prenom = '',
        this.form.telephone = '',
        this.form.email = '',
        this.form.genre = "Choisir",
        this.form.adresse = '',
        this.form.password = '',
        this.form.confirmPassword = '',
        this.form.roles = "Choisir"
    })
  }
}
