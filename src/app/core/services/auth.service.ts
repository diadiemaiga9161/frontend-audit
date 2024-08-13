import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';
import { environment } from 'src/environments/environment';

import { User } from '../models/auth.models';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from './storage/storage.service';

import Swal from 'sweetalert2';



const URL_PHOTO: string = environment.Url_PHOTO;
@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    user: User;
    isLoggedIn = false;
    isLoginFailed = true;
   
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) { }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        return getFirebaseBackend().getAuthenticatedUser();
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return getFirebaseBackend().loginUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, password: string) {
        return getFirebaseBackend().registerUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    // logout() {
    //     // logout the user
    //     getFirebaseBackend().logout();
    // }
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
      text: "Etes-vous sûre de vous déconnecternnnn?",
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
            this.router.navigateByUrl("/");
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
}

