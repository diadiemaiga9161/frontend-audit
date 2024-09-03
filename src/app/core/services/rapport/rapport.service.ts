import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

// Définition de l'URL de base pour les requêtes API
const URL_BASE: string = environment.Url_BASE;  // Définit l'URL de base pour les requêtes API à partir de l'environnement


@Injectable({
  providedIn: 'root'
})
export class RapportService {

  private accessToken!: string; // Variable pour stocker le jeton d'accès

 // Constructeur du service avec injection des dépendances nécessaires
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


  // Méthode pour afficher la liste des referentiel
  AfficherListRapports(): Observable<any> {
    const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
    return this.http.get(`${URL_BASE}rapport/afficher`, { headers });  // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
  }

    // Méthode pour afficher la liste des rapport  par id
      AfficherListRapportsid(id: number): Observable<any> {
        const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
        return this.http.get(`${URL_BASE}rapport/rapportid/${id}`); // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
    }

  // ajouteraudites(titre: any, description: any,remarques:any,subjection:any,datedebut:any,datefin:any,audites:any): Observable<any> {
  //   const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
  //   const formData = new FormData();
  //     formData.append('titre', titre);
  //     formData.append('description', description);
  //     formData.append('remarques', remarques);
  //     formData.append('subjection', subjection);
  //     formData.append('datedebut', datedebut);
  //     formData.append('datefin', datefin);
  //     formData.append('audites', audites);

  //   console.log(titre);
  
  //   console.log(description);
  
  //   console.log(headers);
    
    
  //   return this.http.post( URL_BASE + 'rapport/ajouter',formData, { headers }
  //  );
  // }

  ajouter(data: any): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('titre', data.titre);
    formData.append('description', data.description);
    formData.append('remarques', data.remarques);
    formData.append('subjection', data.subjection);
    formData.append('datedebut', data.datedebut);
    formData.append('datefin', data.datefin);
    formData.append('audites', data.audites);  
    console.log(formData);
    console.log('data', data);
  
    console.log('data', headers);
  
    return this.http.post(URL_BASE  + 'rapport/ajouter',formData, { headers });
  }

}
