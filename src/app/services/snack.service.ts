import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackbar: MatSnackBar, private router: Router) { }

  authError(){
    this.snackbar.open('You must be logged in!','OK',{
      duration: 5000
    });

    return this.snackbar._openedSnackBarRef
    ?.onAction()
    .pipe(
      tap( () => {
        return this.router.navigate(['/login']);
      })
    )
    .subscribe()
  }
}
