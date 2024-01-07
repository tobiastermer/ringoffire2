import { Input, NgModule, OnInit, OnChanges } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PlayerComponent } from './player/player.component';
import { GameComponent } from './game/game.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { PlayerMobileComponent } from './player-mobile/player-mobile.component';
import { DialogEditPlayerComponent } from './dialog-edit-player/dialog-edit-player.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    GameComponent,
    GameInfoComponent,
    StartscreenComponent,
    DialogAddPlayerComponent,
    PlayerMobileComponent,
    DialogEditPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-8cbc5","appId":"1:104821536968:web:67d3ba9b0b0f4138844dfd","storageBucket":"ring-of-fire-8cbc5.appspot.com","apiKey":"AIzaSyBGSwwm4-KUOjiyVoaSFe_Vvy9Bj4dhbc8","authDomain":"ring-of-fire-8cbc5.firebaseapp.com","messagingSenderId":"104821536968"})), provideFirestore(() => getFirestore()), 
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
