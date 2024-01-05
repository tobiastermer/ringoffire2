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

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    GameComponent,
    GameInfoComponent,
    StartscreenComponent,
    DialogAddPlayerComponent,
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
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
