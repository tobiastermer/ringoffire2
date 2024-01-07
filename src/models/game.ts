export class Game {

    public id?: string;
    public players: string[] = [    ];
    public playerImages: string[] = [];
    public stack: string[] = [];
    public playedCards: (string | undefined)[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation: boolean = false;
    public currentCard: string | undefined = '';

    constructor() {
        for (let i = 1; i <= 13; i++) {
            this.stack.push('spades_' + i)
            this.stack.push('clubs_' + i)
            this.stack.push('diamonds_' + i)
            this.stack.push('hearts_' + i)
        }

        shuffle(this.stack);
    }

    public toJSON?() {
        const jsonObj: any = {
            players: this.players,
            playerImages: this.playerImages,
            stack: this.stack,
            playedCards: this.playedCards, 
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
        };

        if (this.id !== undefined) {
            jsonObj.id = this.id;
        }

        return jsonObj;
    }
}

function shuffle(array:string[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
