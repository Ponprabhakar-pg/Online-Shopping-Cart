import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( public snackBar: MatSnackBar ) { }

  // Method to trigger toast message 
  triggerToast(message: any, duration: any) {
    this.snackBar.open(message,'Ok',{
      duration: duration*1000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

}
