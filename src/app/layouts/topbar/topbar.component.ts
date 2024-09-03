import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth/auth.service';

const URL_PHOTO: string = environment.Url_PHOTO;

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {

  element:any;
  cookieValue:any;
  flagvalue:any;
  countryName:any;
  valueset:any;
  User: any
  profileImageUrl: string = '';
  isLoggedIn = false;
  isLoginFailed = true;

  constructor(@Inject(DOCUMENT) private document: any, private router: Router, private authService: AuthService,
              private authFackservice: AuthfakeauthenticationService,
              private storageService: StorageService,
              public languageService: LanguageService,
              public translate: TranslateService,
              public _cookiesService: CookieService
              
            ) {
  }

  listLang:any = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    this.openMobileMenu = false;
    this.element = document.documentElement;

    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
    //methode pour la photo de navigateur
    this.User = this.storageService.getUser();
    console.log(this.User);
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    } else if (!this.storageService.isLoggedIn()) {
      this.isLoginFailed = false;
    }
    // Chargez l'image de profil actuelle depuis User.user.photo (si disponible)
    if (this.User && this.User.photos[0]) {
      this.profileImageUrl = this.generateImageUrl(this.User.photos[0]?.nom);
    }
  }

  // IMAGE PAR DEFAUT USER
  handleAuthorImageError(event: any) {
    event.target.src = 'assets/images/diadie.jpg';
  }
  // ngOnInit(): void {
  //   this.User = this.storageService.getUser();
  //   console.log(this.User);
  //   if (this.storageService.isLoggedIn()) {
  //     this.isLoggedIn = true;
  //   } else if (!this.storageService.isLoggedIn()) {
  //     this.isLoginFailed = false;
  //   }
  //   // Chargez l'image de profil actuelle depuis User.user.photo (si disponible)
  //   if (this.User && this.User.photos[0]) {
  //     this.profileImageUrl = this.generateImageUrl(this.User.photos[0]?.nom);
  //   }
  // }


    //IMAGE
    generateImageUrl(photoFileName: string): string {
      const baseUrl = URL_PHOTO;
      return baseUrl + photoFileName;
    }

    setLanguage(text: string, lang: string, flag: string) {
      this.countryName = text;
      this.flagvalue = flag;
      this.cookieValue = lang;
      this.languageService.setLanguage(lang);
    }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  //  logout() {
  //  if (environment.Url_BASE === 'firebase') {
  //     this.authService.logout();
  //   } else {
  //     this.authFackservice.logout();
  //   }
  //    this.router.navigate(['/account/login']);
  // }
   //METHODE PERMETTANT DE SE DECONNECTER
     //METHODE PERMETTANT DE SE DECONNECTER
  logout(): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn',
        cancelButton: 'btn btn-danger',
      },
      heightAuto: false
    })
    swalWithBootstrapButtons.fire({
      // title: 'Etes-vous sûre de vous déconnecter?',
      text: "Etes-vous sûre de vous déconnecter?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe({
          next: res => {
            // console.log(res);
            this.storageService.clean();
            this.router.navigateByUrl("/account/login");
            if (this.storageService.isLoggedIn()) {
              this.isLoggedIn = true;
            } else if (!this.storageService.isLoggedIn()) {
              this.isLoginFailed = false;
            }
          },
          error: err => {
            // console.log(err);
          }
        });
      }
    })

  }

    // goToProfilUserOrInfo pour envoyer sur la page profil apres la connexion 
    goToProfilUserOrInfo() {
      this.User = this.storageService.getUser();
      this.router.navigate(["/profil"]);
      }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}


