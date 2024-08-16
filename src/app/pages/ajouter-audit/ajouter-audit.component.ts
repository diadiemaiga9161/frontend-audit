import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuditeService } from 'src/app/core/services/audite/audite.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-ajouter-audit',
  templateUrl: './ajouter-audit.component.html',
  styleUrls: ['./ajouter-audit.component.scss']
})
export class AjouterAuditComponent {
  [x: string]: any;
  User: any;

  constructor(
    private serviceUser: UserService,
    private authService: AuthService,
    private auditeService: AuditeService,
    public router: Router,
  ) {

  }
  form: any = {
    tauxconformite: null,
    datedebut: null,
    datefin: null,
    conformite: null,
    typeAudit: null,
    idinf: null
  };
//Methode pour afficher les information de user connecter
  ngOnInit(): void {

    this.serviceUser.AfficherInfoUserConnecte().subscribe(data => {
      this.User = data;
      console.log(this.User);
    }
    );

}
//Methode pour ajouter un audit

submitForm() {
  this.auditeService.Ajouteraudit(this.form.tauxconformite, this.form.datedebut, this.form.datefin, this.form.conformite,this.typeAudit,this.form.idinf).subscribe((data) => {
    // Enregistrez les données de l'utilisateur dans le service de stockage (session storage ou autre)
    console.log(data);
    console.log(this.users.id);
    location.reload();
  });
}
}
