import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_BASE: string = environment.Url_BASE;  // Définit l'URL de base pour les requêtes API à partir de l'environnement

@Injectable({
  providedIn: 'root'
})
export class AuditService {
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
 
 
   // Méthode pour afficher la liste des audit
   AfficherListAudit(): Observable<any> {
     const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
     return this.http.get(`${URL_BASE}audit/afficher`, { headers });  // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
   }

     // Méthode pour afficher la liste des rapport  par id
     AfficherListAuditid(id: number): Observable<any> {
      const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
      return this.http.get(`${URL_BASE}audit/afficherparid/${id}`, { headers }); // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
  }

   AfficherListAudites(): Observable<any> {
    const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
    return this.http.get(`${URL_BASE}audites/afficher`, { headers });  // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
  }

  

      // Méthode pour afficher la liste des audit
      AfficherListTypeAudit(): Observable<any> {
        const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
        return this.http.get(`${URL_BASE}typeaudit/afficher`, { headers });  // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
      }

      
      // Méthode pour afficher la liste des audit
      AfficherListechelle(): Observable<any> {
        const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
        return this.http.get(`${URL_BASE}echelle/afficher`, { headers });  // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
      }
       // Méthode pour afficher la liste des audit
       AfficherListreferentiel(): Observable<any> {
        const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
        return this.http.get(`${URL_BASE}referentiel/afficher`, { headers });  // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
      }

       // Méthode pour afficher la liste des audit
       AfficherListaudites(): Observable<any> {
        const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
        return this.http.get(`${URL_BASE}audites/afficher`, { headers });  // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
      }
       // Méthode pour afficher la liste des audit
       AfficherListtypeaudite(): Observable<any> {
        const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
        return this.http.get(`${URL_BASE}typeaudit/afficher`, { headers });  // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
      }

       // Méthode pour afficher la liste des audit
       AfficherListstatutaudit(): Observable<any> {
        const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
        return this.http.get(`${URL_BASE}statutaudit/list`, { headers });  // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
      }

  //  AjouterAudit(audit: any): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http.post(`${URL_BASE}audit/ajouter`, { headers });  // Effectue une requête GET vers l'API avec les en-têtes d'autorisation
  // }


  
  AjouterAudit(
    tauxconformite: string, 
    datedebut: string, 
    langue: string, 
    version: string, 
    datefin: string, 
    conformite: string, 
    referentiel: number, 
    typeAudit: number, 
    audites: number, 
    echelle: number,
    statutAudit: number
  ): Observable<any> {
    const headers = this.getHeaders();  // Obtenez les en-têtes avec le jeton JWT
    const formData: FormData = new FormData();
  
    formData.append('tauxconformite', tauxconformite);
    formData.append('datedebut', datedebut);
    formData.append('datefin', datefin);
    formData.append('conformite', conformite);
    formData.append('langue', langue);
    formData.append('version', version);
    formData.append('typeAudit', typeAudit.toString());
    formData.append('referentiel', referentiel.toString());
    formData.append('audites', audites.toString());
    formData.append('echelle', echelle.toString());
    formData.append('statutAudit', statutAudit.toString());
  
    return this.http.post<any>(`${URL_BASE}audit/ajouter`, formData, { headers });
  }
  
  
  

// Méthode pour afficher la liste des audit
// Ajouteraudit(tauxconformite: any, datedebut: any, datefin: any, conformite: any,typeAudit: any): Observable<any> {
//   const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
//   const data = { 
//     "tauxconformite" : tauxconformite,
//     "datedebut" : datedebut,
//     "datefin" : datefin,
//     "conformite" : conformite,
//     "typeAudit" : typeAudit,
//    };
//   return this.http.post(
//     URL_BASE + 'audit/ajouter',data, { headers }
//   );
// }

// Ajouteraudit(auditData: any): Observable<any> {
//   const headers = this.getHeaders(); // Obtient les en-têtes avec le jeton d'accès
//   return this.http.post(
//     URL_BASE + 'audit/ajouter',auditData, { headers }
//   );
// }

 
}
