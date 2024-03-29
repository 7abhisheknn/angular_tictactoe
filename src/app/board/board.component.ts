import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  squares: any[] | undefined;
  xIsNext: boolean | undefined;
  winner: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }
  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = undefined;
    this.xIsNext = true;
  }

  get player(): string{
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number): void{
    if (!this.squares![idx]) {
      this.squares?.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
      this.calculateWinner();
    }
  }

  calculateWinner(): void{
    const lines = [
      [0, 1, 2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(let i=0;i<lines.length;i++){
      const [a,b,c]=lines[i];
      if (
        this.squares![a] &&
        this.squares![a]==this.squares![b] &&
        this.squares![a]==this.squares![c]
      ) return this.winner=this.squares![a];
    }
  }
}
