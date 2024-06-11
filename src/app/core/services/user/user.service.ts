import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from '../storage/storage.service';

// Définition de l'URL de base de l'API
const API_URL = 'http://localhost:8380/api/test/';
const URL_BASE: string = environment.Url_BASE;
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // ajouterProjet(titre: string, description: string, typeProjet: string, photo: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('titre', titre);
  //   formData.append('description', description);
  //   formData.append('typeProjet', typeProjet);
  //   formData.append('photo', photo);
  
  //   const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
  
  //   return this.http.post(`${URL_BASE}projetInformatique/ajouter`, formData, { headers });
  // }
 
  getAuditeur // Récupération du jeton CSRF depuis le cookie (commenté car non utilisé dans le code actuel)
    () {
    throw new Error('Method not implemented.');
  }
  updateUser(userId: any, formData: any) {
    throw new Error('Method not implemented.');
  }
  private accessToken!: string; // Déclaration d'une variable pour stocker le token

  // Options pour les requêtes HTTP
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem(USER_KEY) // Remplacez par votre token JWT valide
    })
  };

  constructor(
    private http: HttpClient,
    // private cookieService: CookieService,
    private storageService: StorageService
  ) { }

  // Méthode pour définir le token d'accès
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  // Méthode pour ajouter le token JWT aux en-têtes de la requête
  getHeaders(): HttpHeaders {
    const token = this.storageService.getUser().token;
    // Récupération du jeton CSRF depuis le cookie (commenté car non utilisé dans le code actuel)
    // const csrfToken = this.cookieService.get('csrftoken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      // 'X-CSRFToken': csrfToken
    });
  }

  // Méthode pour afficher les informations de l'utilisateur connecté
  AfficherInfoUserConnecte(): Observable<any> {
    const headers = this.getHeaders();
    console.log(headers);
    return this.http.get(`${URL_BASE}user/afficherinfo`, { headers });
  }
  
 // Méthode pour afficher la liste des clients
 AfficherListeUser(): Observable<any> {
  return this.http.get(`${URL_BASE}user/byRole/ROLE_AUDITEUR`);
}


  // Méthode pour modifier le profil de l'utilisateur
  modifierProfilUser(
    nom: string,
    prenom: string,
    telephone: string,
    genre: string,
    email: string,
  ): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(
      URL_BASE + 'user/update',
      {
        nom,
        prenom,
        telephone,
        genre,
        email,
      },
      { headers }
    );
  }



  // Méthode pour afficher la photo de l'utilisateur connecté
  AfficherPhotoUserConnecter(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${URL_BASE}/user/photo/get`, { headers });
  }

  // Méthode pour modifier le mot de passe de l'utilisateur
  modifierMotDePasse(oldPassword: string, newPassword: string): Observable<any> {
    const headers = this.getHeaders();
    console.log(headers);
    console.log(oldPassword);
    console.log(newPassword);
    const formData = new FormData();
    formData.append('oldPassword', oldPassword);
    formData.append('newPassword', newPassword);
    return this.http.post(
      URL_BASE + 'auth/updatePassword',
      formData,
      { headers }
    );
  }

  // Méthode pour changer la photo de profil de l'utilisateur
  changerPhoto(photo: File): Observable<any> {
    const headers = this.getHeaders();
    // Désactive le cache pour cette requête
    headers.set('Cache-Control', 'no-cache');
    const formData = new FormData();
    formData.append('photo', photo);
    return this.http.put(`${URL_BASE}user/updatePhoto`, formData, { headers });
  }

  // Méthode pour envoyer un email pour changer le mot de passe
  forgotPassword(email: string): Observable<any> {
    // const headers = this.getHeaders();
    return this.http.post(`${URL_BASE}auth/api/password_reset/`, {
      email
    });
  }

  // Méthode pour changer le mot de passe après l'oubli
  ChangerPassword(token: string, password: any): Observable<any> {
    console.log(password);
    console.log(token);
    return this.http.post(`${URL_BASE}auth/api/password_reset/confirm/?token=${token}`, {
      password
    });
  }
}
