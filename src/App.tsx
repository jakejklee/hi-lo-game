import React, { Component } from 'react';
import './App.css';

interface Props {

}
interface State {
  deck: any;
  isReady: boolean;
  gameRound: number;
}
const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      deck: [],
      isReady: false,
      gameRound: 1
    }
  }

  componentDidMount = () => {
    this.initialDeck()
  }

  initialDeck = () => {
    const firstDeck = []
    for (let suit in suits) {
      for (let value in values) {
        firstDeck.push(`${values[value]},${suits[suit]}`);
      }
    }
    this.setState({ deck: firstDeck })
  }

  shuffleDeck = () => {
    const shuffledDeck = this.state.deck;
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    this.setState({ deck: shuffledDeck, isReady: true })
  }

  renderRound = () => {
    const round = []
    let p1count = 0
    let p2count = 0
    for (let i = 1; i <= 5; i++) {
      const player1CardNumber = this.state.deck[i - 1].split(',')
      const player2CardNumber = this.state.deck[52 - i].split(',')
      let winner = ''

      if (player1CardNumber[0] === 'A') {
        player1CardNumber[0] = 1
      } else if (player1CardNumber[0] === 'J') {
        player1CardNumber[0] = 11
      } else if (player1CardNumber[0] === 'Q') {
        player1CardNumber[0] = 12
      } else if (player1CardNumber[0] === 'K') {
        player1CardNumber[0] = 13
      }

      if (player2CardNumber[0] === 'A') {
        player2CardNumber[0] = 1
      } else if (player2CardNumber[0] === 'J') {
        player2CardNumber[0] = 11
      } else if (player2CardNumber[0] === 'Q') {
        player2CardNumber[0] = 12
      } else if (player2CardNumber[0] === 'K') {
        player2CardNumber[0] = 13
      }

      let p1Number: number = parseInt(player1CardNumber[0])
      let p2Number: number = parseInt(player2CardNumber[0])

      if (p1Number > p2Number) {
        winner = 'player #1'
        p1count++
      } else if (p1Number < p2Number) {
        winner = 'player #2'
        p2count++
      } else {
        winner = 'draw'
      }

      round.push(<tr>
        <td>Round #{i}</td>
        <td>
          {
            i + 1 <= this.state.gameRound ?
              this.state.deck[i - 1]
              :
              null
          }
        </td>
        <td>
          {
            i + 1 <= this.state.gameRound ?
              this.state.deck[52 - i]
              :
              null
          }
        </td>
        <td>
          {
            i === this.state.gameRound ?
              <button onClick={() => { this.playGame() }}> play </button>
              :
              i + 1 <= this.state.gameRound ?
                winner
                :
                null
          }
        </td>
      </tr>
      )
    }

    return (
      <div>
        <table>
          <tr>
            <th>Round</th>
            <th>Player #1</th>
            <th>Player #2</th>
            <th>Winner</th>
          </tr>
          {round}
        </table>
        {this.getResult(p1count, p2count)}
      </div>
    )
  }

  getResult = (p1count: number, p2count: number) => {
    let gameResult = ''

    if (p1count > p2count) {
      gameResult = 'Player #1 wins the game with ' + p1count + ' rounds to ' + p2count + '!'
    } else if (p1count < p2count) {
      gameResult = 'Player #2 wins the game with ' + p2count + ' rounds to ' + p1count + '!'
    } else {
      gameResult = 'Draw with ' + p1count + ' : ' + p2count + '!'
    }

    return (
      <div>
        {
          this.state.gameRound > 5 ?
            gameResult :
            null
        }
      </div>
    )
  }


  playGame = () => {
    let round = this.state.gameRound;
    this.setState({ gameRound: ++round })

  }
  playAgain = () => {
    this.setState({ gameRound: 1, isReady: false })
  }

  render() {
    return (
      <div className="App" style={{ textAlign: 'center', width: '100%', marginTop: 50 }}>
        {
          this.state.isReady ?
            <div>
              {this.renderRound()}
            </div>
            :
            <button onClick={() => this.shuffleDeck()}>Click to shuffle cards</button>
        }
        {
          this.state.gameRound > 5 ?
            <div>
              <button onClick={() => { this.playAgain() }}>Play again</button>
            </div>
            :
            null
        }
      </div>
    );
  }
}

export default App;
