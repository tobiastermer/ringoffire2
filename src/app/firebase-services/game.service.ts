import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, query, where, limit, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from './../../models/game'

@Injectable({
  providedIn: 'root'
})
export class GameListService {

  normalGames: Game[] = [];
  firestore: Firestore = inject(Firestore);

  unsubGames;
  unsubSingle;

  constructor() {

    this.unsubGames = this.subGamesList();

    this.unsubSingle = onSnapshot(this.getSingleDocRef("games", "a57767234623847328"), (element) => {
    });
    this.unsubSingle();

  }

  async addGame(item: {}) {
    try {
      // const docRef = await addDoc(this.getGamesRef(), item);
      const docRef = await addDoc(collection(this.firestore, "games"), item);
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error(err);
    }
  }

  async updateGame(game: Game) {
    if (game.id) {
      let docRef = doc(collection(this.firestore, "games"), game.id);
      await updateDoc(docRef, this.getCleanJSON(game)).catch(
        (err) => { console.log(err); }
      )
    }
  }

  async deleteGame(colId: string, docId: string) {
    await deleteDoc(this.getSingleDocRef(colId, docId)).catch(
      (err) => { console.log(err); }
    )
  }

  getCleanJSON(game: Game): {} {
    return {
      players: game.players,
      stack: game.stack,
      playedCards: game.playedCards, 
      currentPlayer: game.currentPlayer,
    }
  }

  subGamesList() {
    const q = query(this.getGamesRef(), limit(100));
    return onSnapshot(q, (list) => {
      this.normalGames = [];
      list.forEach(element => {
        this.normalGames.push(this.setGameObject(element.data(), element.id));
      });
    });
  }

  ngonDestroy() {
    this.unsubGames();
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  setGameObject(obj: any, id: string): Game {
    return {
      id: id,
      players: obj.players || [ ],
      stack: obj.stack || [ ],
      playedCards: obj.playedCards || [ ],
      currentPlayer: obj.currentPlayer || 0,
    }
  }
}
