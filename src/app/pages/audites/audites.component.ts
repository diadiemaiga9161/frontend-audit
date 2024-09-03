import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';


import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuditeService } from 'src/app/core/services/audite/audite.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-audites',
  templateUrl: './audites.component.html',
  styleUrls: ['./audites.component.scss'],
})
export class AuditesComponent{
  id: any;
  type: any;
  audites: any;
  User: any;
  auditeur: any;
 
  constructor(
    private serviceUser: UserService,
    private authService: AuthService,
    private auditeService: AuditeService,
    public router: Router,
    private storageService: StorageService,  // Injection du service de stockage local

  ) {

  }

  ngOnInit() {
        // AFFICHER LA LISTE DES audites
      this.serviceUser.listeAudites().subscribe(data => {
        this.type = data;
        console.log(this.audites);
      });

    
      // AFFICHER LA LISTE DES audites
 this.auditeService.AfficherListAudites().subscribe(data => {
  this.audites = data;
  console.log(this.audites);
});
   //      //AFFICHER UN INFORMATICIEN EN FONCTION DE SON ID
    // this.serviceUser.AfficherUserParId(this.id).subscribe(data => {
    //   this.auditeur = data;
    //   this.audites = data?.audites;
    //   console.log(this.auditeur);
    // });

    //  AFFICHER UN INFORMATICIEN EN FONCTION DE SON ID
    //  this.serviceUser.AfficherUserParId(this.id).subscribe(data => {
    //   this.audites = data;
    //   console.log(this.auditeur);
    // });
  }

}
