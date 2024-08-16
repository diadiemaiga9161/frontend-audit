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

  // Méthode pour effectuer la connexion
Ajouteraudit(tauxconformite: any, datedebut: any, datefin: any, conformite: any,typeAudit: any, id_utilisateur: any): Observable<any> {
  const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
  const data = { 
    "tauxconformite" : tauxconformite,
    "datedebut" : datedebut,
    "datefin" : datefin,
    "conformite" : conformite,
    "typeAudit" : typeAudit,
    "id_utilisateur" : id_utilisateur
  };
  return this.http.post(
    URL_BASE + 'audit/ajouter',data, { headers }
  );
}
}
