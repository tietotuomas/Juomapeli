import { useState } from 'react'

const App = () => {
  const [name, setName] = useState('')
  const [players, setPlayers] = useState([])
  const [round, setRound] = useState(0)
  const [drinker, setDrinker] = useState(0)
  const [cards, setCards] = useState([
    'Juo ',
    'Juo ',
    'Juo ',
    'Juo ',
    'Tarjoa ',
    'Tarjoa ',
    'Tarjoa ',
    'Tarjoa ',
    'Vesiputous',
    'Sanaleikki',
    'Sääntö',
    'Painostusbiisi',
  ])
  const [difficulty, setDifficulty] = useState(0)

  const handleNewName = (event) => {
    event.preventDefault()
    setPlayers(players.concat(name))
    setName('')
  }

  const quitGame = () => {
    setRound(0)
    setPlayers([])
    setDrinker(0)
  }

  const nextRound = () => {
    setRound(round + 1)
    if (drinker + 1 < players.length) {
      setDrinker(drinker + 1)
    } else {
      setDrinker(0)
    }
  }

  const startGame= (level) => {
    console.log("startGamea kutsuttiin");
    setRound(1)
    if (level==='kutsut') {
      setDifficulty(5)
    }
    if (level==='tiistai') {
      setDifficulty(15)
    }
  }

  const drawButton = () => {
    if (round > 0) {
      return (
        <div>
          <button type="submit" onClick={quitGame}>
            Lopeta peli
          </button>
        </div>
      )
    }
    if (players.length > 1) {
      console.log("drawButton-funkkarissa mentiin aloita-peli lohkoon");
      return (
        <div>
          Aloita peli:
          <br/>
          <button type="submit" onClick={() => startGame('kutsut')}>
            Teekutsut
          </button>
          <button type="submit" onClick={() => startGame('tiistai')}>
            Tiistai-ilta
          </button>
        </div>
      )
    }
  }

  const drawCard = () => {
    console.log('drawCrad-funkkarissa')
    if (round > 3*difficulty) {

      quitGame()
    }

    if (round > 0) {
      return (
        <p>
          Vuorossa: {players[drinker]}
          <br/>
          <br/>
          {pickCard()}
          <br/>
          <br/>
          <button onClick={nextRound}>Seuraava kierros</button>
        </p>
      )
    }

  }

  const pickCard = () => {
    const card = cards[Math.floor(Math.random() * cards.length)]
    if (card === 'Juo ') {
      const amount = Math.floor(Math.random() * difficulty)+1
      return <span>Juo {amount}</span>
    }
    if (card === 'Tarjoa ') {
      const amount = Math.floor(Math.random() * difficulty)+1
      return <span>Tarjoa {amount}</span>
    }
    return <span>{card}</span>
  }

  const drawAddPlayer = () => {
    if (round < 1) {
      return (
        <form onSubmit={handleNewName}>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
          ></input>
          <button type="submit">Lisää pelaaja</button>
        </form>
      )
    }
  }

  return (
    <div>
      <h1>Juomapeli</h1>
      {drawAddPlayer()}
      <ul>
        <p>
          {players.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </p>
      </ul>

      {drawButton()}
      {drawCard()}
    </div>
  )
}

export default App
