import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const URL_BASE: string = environment.Url_BASE;  // Définit l'URL de base pour les requêtes API à partir de l'environnement


@Injectable({
  providedIn: 'root'
})


export class AuditeService {

  private accessToken!: string; // Variable pour stocker le jeton d'accès

  constructor(
    private http: HttpClient,  // Injection du service HttpClient pour effectuer des requêtes HTTP
    private storageService: StorageService,  // Injection du service de stockage local
  ) { }

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


// Ajouteraudit(tauxconformite: any, datedebut: any, datefin: any, conformite: any,typeAudit: any, id_utilisateur: any): Observable<any> {
//   const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
//   const data = { 
//     "tauxconformite" : tauxconformite,
//     "datedebut" : datedebut,
//     "datefin" : datefin,
//     "conformite" : conformite,
//     "typeAudit" : typeAudit,
//     "id_utilisateur" : id_utilisateur
//   };
//   return this.http.post(
//     URL_BASE + 'audit/ajouter',data, { headers }
//   );
// }

// Méthode pour effectuer l'ajout 
ajouteraudites(audite: any, siteaudite: any,description:any): Observable<any> {
  const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
  const formData = new FormData();
    formData.append('audite', audite);
    formData.append('siteaudite', siteaudite);
    formData.append('description', description);
  console.log(audite);
  console.log(siteaudite);

  console.log(description);

  console.log(headers);
  
  
  return this.http.post( URL_BASE + 'audites/ajouter',formData, { headers }
 );
}
// Méthode pour afficher la liste des referentiel
AfficherListAudites(): Observable<any> {
  const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
  return this.http.get(`${URL_BASE}audites/afficher`, { headers });  // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
}



ajouter(data: any): Observable<any> {
  const headers = this.getHeaders();
  const formData = new FormData();
  formData.append('audite', data.audite);
  formData.append('siteaudite', data.siteaudite);
  formData.append('description', data.description);

  console.log(formData);
  console.log('data', data);

  console.log('data', headers);

  return this.http.post(URL_BASE  + 'audites/ajouter',formData, { headers });
}

}
