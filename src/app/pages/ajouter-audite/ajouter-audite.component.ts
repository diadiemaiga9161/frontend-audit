import { HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuditeService } from 'src/app/core/services/audite/audite.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-ajouter-audite',
  templateUrl: './ajouter-audite.component.html',
  styleUrls: ['./ajouter-audite.component.scss']
})
export class AjouterAuditeComponent {
  User: any;
  private accessToken!: string; // Variable pour stocker le jeton d'accès

  constructor(
    private serviceUser: UserService,
    private authService: AuthService,
    private auditeService: AuditeService,
    public router: Router,
    private storageService: StorageService,  // Injection du service de stockage local

  ) {

  }

   // Méthode pour définir le jeton d'accès
   setAccessToken(token: string) {
    this.accessToken = token;  // Affecte la valeur du jeton d'accès reçu à la variable privée accessToken
  }

  // Méthode pour obtenir les en-têtes avec le token JWT
  getHeaders(): HttpHeaders {
    const token = this.storageService.getUser().token;  // Obtient le jeton d'accès à partir du service de stockage local
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Crée et retourne les en-têtes HTTP avec le jeton d'accès
    });
  }

  form: any = {
    audite: null,
    siteaudite: null,
    description: null,
  };

  formData = {
    audite: '',
    siteaudite: '',
    description: ''
  };

  onSubmit() {
    console.log(this.formData);
    
    this.auditeService.ajouter(this.formData)
      .subscribe(response => {
        console.log('Response:', response);
      }, error => {
        console.error('Error:', error);
      });
      location.reload();

  }

//Methode pour afficher les information de user connecter
  ngOnInit(): void {

    this.serviceUser.AfficherInfoUserConnecte().subscribe(data => {
      this.User = data;
      console.log(this.User);
    }
    );}

    submitForm() {
      this.auditeService.ajouteraudites(this.form.audite,this.form.siteaudite,this.form.description).subscribe((data) => {
        // Enregistrez les données de l'utilisateur dans le service de stockage (session storage ou autre)
        location.reload();
        console.log(data);
        console.log(this.form.audite)
        
      });
    }  
}
