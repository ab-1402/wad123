import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user: any;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getCurrentUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
