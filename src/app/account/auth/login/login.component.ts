import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

 /**
 * Login component
 */
 returnUrl: any;
 User: any;
 roles: string[] = [];
 type = true;
 selectedTab: string = 'connexion'; // Déclaration de la variable selectedTab avec la valeur par défaut 'connexion'

 isLoggedIn = false;
 isLoginFailed = false;
 errorMessage = '';
 passwordFieldType: string = 'password';

 // Définissez une méthode pour basculer entre les types de champ de mot de passe
 togglePasswordVisibility() {
   this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
 }

 form: any = {
   telephoneOrEmail: null,
   password: null,
 };


 constructor(
   private router: Router,
   private route: ActivatedRoute,
   private authService: AuthService,
   private storageService: StorageService
 ) { }

 ngOnInit(): void {
 }

//  path() {
//    this.router.navigate(["/"]);
//  }

 public Toggledata = true;

 iconLogle() {
   this.Toggledata = !this.Toggledata;
 }

 seConnecter(): void {
  const { telephoneOrEmail, password } = this.form;
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: '',
      cancelButton: '',
    },
    heightAuto: false
  });

  this.authService.connexion(telephoneOrEmail, password).subscribe(
    (data) => {
      this.storageService.saveUser(data);
      this.roles = this.storageService.getUser().roles;

      const hasRequiredRole = this.roles.includes('ROLE_ENTREPRISE') || this.roles.includes('ROLE_AUDITEUR');

      if (hasRequiredRole) {
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.router.navigate(['/profil']).then(() => {
          window.location.reload();
        });
      } else {
        swalWithBootstrapButtons.fire(
          "",
          `<h1 style='font-size: 1em !important; font-weight; bold; font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;'>Vous n'êtes pas autorisé à accéder à cette section</h1>`,
          "error"
        );

        this.isLoginFailed = true;
      }
    },
    (error) => {
      let errorMessage = 'Erreur inconnue';

      if (error.error && error.error.message) {
        // Utilisez le message exact renvoyé par le backend
        errorMessage = error.error.message;
      } else if (error.status === 401) {
        errorMessage = 'Mot de passe incorrect ou email non trouvé';
      } else if (error.status === 403) {
        errorMessage = 'Compte verrouillé ou désactivé';
      } else if (error.status === 500) {
        errorMessage = 'Erreur interne du serveur';
      }

      swalWithBootstrapButtons.fire(
        "",
        `<h1 style='font-size: 1em !important; font-weight; bold; font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;'>${errorMessage}</h1>`,
        "error"
      );

      this.isLoginFailed = true;
    }
  );
}







 // Méthode pour changer l'onglet sélectionné
 changeTab(tab: string) {
   this.selectedTab = tab;
 }

 // Méthode pour vérifier si un onglet est actif
 isTabActive(tab: string): boolean {
   return this.selectedTab === tab;
 }

}
