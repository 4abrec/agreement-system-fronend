import {Component, Inject} from "@angular/core";
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-base-snackbar',
  templateUrl: 'base-snackbar.component.html',
  styles: [
    `
      .snack-message {
        color: #ffffff;
      }
    `,
  ],
})
export class BaseSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
}
