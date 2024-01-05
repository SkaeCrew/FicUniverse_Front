import {Component, inject} from '@angular/core';
import {MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register-error-snackbar',
  templateUrl: './register-error-snackbar.component.html',
  styleUrls: ['./register-error-snackbar.component.scss']
})
export class RegisterErrorSnackbarComponent {

  snackBarRef = inject(MatSnackBarRef);
}
