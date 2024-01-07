import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, query, where, limit, orderBy, onSnapshot, addDoc, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Game } from './../../models/game'
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameListService {

    normalGames: Game[] = [];
    firestore: Firestore = inject(Firestore);
    private currentGameSubject = new BehaviorSubject<Game | null>(null);
    currentGame = this.currentGameSubject.asObservable();

    constructor() {}

    async addNewGame(item: {}) {
        try {
            const docRef = await addDoc(collection(this.firestore, "games"), item);
            return docRef.id;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async callGame(docId: string): Promise<() => void> {
        const docRef = this.getSingleDocRef("games", docId);
    
        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const gameData = docSnapshot.data();
                const game = this.setGameObject(gameData, docId);
                this.currentGameSubject.next(game); // Aktualisieren des aktuellen Spiels
                // Hier können Sie zusätzliche Logik einfügen, z.B. das Spiel-Objekt an eine Observable senden
            } else {
                console.log("Kein solches Dokument!");
            }
        });
    
        return unsubscribe;
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
            id: game.id,
            players: game.players,
            playerImages: game.playerImages,
            stack: game.stack,
            playedCards: game.playedCards,
            currentPlayer: game.currentPlayer,
            pickCardAnimation: game.pickCardAnimation,
            currentCard: game.currentCard,
        }
    }

    ngonDestroy() {

    }


    getSingleDocRef(colId: string, docId: string) {
        return doc(collection(this.firestore, colId), docId);
    }

    setGameObject(obj: any, id: string): Game {
        const game = new Game();
        game.id = id;
        game.players = obj.players || [];
        game.playerImages = obj.playerImages || [];
        game.stack = obj.stack || [];
        game.playedCards = obj.playedCards || [];
        game.currentPlayer = obj.currentPlayer || 0;
        game.pickCardAnimation = obj.pickCardAnimation || false;
        game.currentCard = obj.currentCard || '';
        return game;
    }
}
