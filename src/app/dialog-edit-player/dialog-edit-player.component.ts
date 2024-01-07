import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrl: './dialog-edit-player.component.scss'
})
export class DialogEditPlayerComponent {

  avatarPictures = ['male1.jpg', 'female1.jpg', 'male2.jpg', 'female2.jpg', 'dog1.webp', 'dog2.webp', 'cat1.webp'];

  constructor(public dialogRef: MatDialogRef<DialogEditPlayerComponent>) {

  }

  ngOnInit() {

  }
  onNoClick(): void {
  }

}
