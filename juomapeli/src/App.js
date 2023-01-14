import { useState } from 'react'
import { Typography, Button, Stack, TextField, Container } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const App = () => {
  const [name, setName] = useState('')
  const [players, setPlayers] = useState([])
  const [round, setRound] = useState(0)
  const [maxRounds, setMaxRounds] = useState(0)
  const [factor, setFactor] = useState(0)
  const [drinker, setDrinker] = useState(0)
  const [rules, setRules] = useState([])
  const [rule, setRule] = useState('Puhukaa englantia')
  const [showRuleForm, setShowRuleForm] = useState(false)
  const [cards, setCards] = useState([])

  const handleNewName = (event) => {
    event.preventDefault()
    setPlayers(players.concat(name))
    setName('')
  }

  const handleNewRule = (event) => {
    event.preventDefault()
    setRules(rules.concat(rule))
    setRule('')
    setShowRuleForm(false)
    nextRound()
  }

  const quitGame = () => {
    setRound(0)
    setPlayers([])
    setDrinker(0)
    setFactor(0)
    setMaxRounds(0)
    setRules([])
    setRule('')
    setCards([])
    setShowRuleForm(false)
  }

  const nextRound = () => {
    setRound(round + 1)
    if (drinker + 1 < players.length) {
      setDrinker(drinker + 1)
    } else {
      setDrinker(0)
    }
  }

  const startGame = (level) => {
    setRound(1)
    const cardsToBeAdded = []
    if (level === 'kutsut') {
      setFactor(5)
      setMaxRounds(20)
      for (let i = 0; i < 5; i++) {
        cardsToBeAdded.push('Juo ')
        cardsToBeAdded.push('Tarjoa ')
      }
      cardsToBeAdded.push(
        ...[
          'Painostusbiisi',
          'Sääntö',
          'Sääntö',
          'Sanaleikki',
          'Sanaleikki',
          'Kaikki juo 1',
          'Juokaa vettä/mehua/teetä',
        ]
      )
      setCards(cardsToBeAdded)
    }
    if (level === 'seitin') {
      setFactor(10)
      setMaxRounds(40)
      for (let i = 0; i < 5; i++) {
        cardsToBeAdded.push('Juo ')
        cardsToBeAdded.push('Tarjoa ')
      }
      cardsToBeAdded.push(
        ...[
          'Painostusbiisi',
          'Sääntö',
          'Vesiputous',
          'Sanaleikki',
          'Kaikki juo 2',
        ]
      )
      setCards(cardsToBeAdded)
    }
    if (level === 'tiistai') {
      setFactor(15)
      setMaxRounds(52)
      for (let i = 0; i < 4; i++) {
        cardsToBeAdded.push('Juo ')
        cardsToBeAdded.push('Tarjoa ')
      }
      cardsToBeAdded.push(
        ...[
          'Painostusbiisi',
          'Sääntö',
          'Vesiputous',
          'Sanaleikki',
          'Kaikki juo 2',
          'Juo shotti',
        ]
      )
      setCards(cardsToBeAdded)
    }
    // if (level === 'custom') {
    //   VALITSE ITSE KORTIT?
    // }
  }

  const drawButton = () => {
    if (round > 0) {
      return (
        <div>
          <Button type="submit" onClick={quitGame}>
            Lopeta peli
          </Button>
        </div>
      )
    }
    if (players.length > 1) {
      return (
        <div>
          <Typography variant="h4">Aloita peli:</Typography>

          <br />
          <Stack spacing={1} direction="row">
            <Button
              variant="contained"
              type="submit"
              onClick={() => startGame('kutsut')}
            >
              Teekutsut
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => startGame('seitin')}
            >
              Seitin ohuet
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => startGame('tiistai')}
            >
              Tiistai-ilta
            </Button>
          </Stack>
        </div>
      )
    }
  }

  const drawCard = () => {
    if (round > maxRounds) {
      quitGame()
    }

    if (round > 0) {
      return (
        <div>
          <br />
          {shuffleCard()}
          <br />
          <br />
          <button onClick={nextRound}>Seuraava kierros</button>
        </div>
      )
    }
  }

  const shuffleCard = () => {
    const card = cards[Math.floor(Math.random() * cards.length)]
    if (card === 'Juo ') {
      const amount = Math.floor(Math.random() * factor) + 1
      return <span>Juo {amount}</span>
    }
    if (card === 'Tarjoa ') {
      const amount = Math.floor(Math.random() * factor) + 1
      return <span>Tarjoa {amount}</span>
    }
    if (card === 'Sääntö') {
      setShowRuleForm(true)
    }
    return <span>{card}</span>
  }

  const addPlayer = () => {
    if (round < 1) {
      return (
        <form onSubmit={handleNewName}>
          <Stack spacing={1} direction="row">
            <TextField
              size="small"
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
            ></TextField>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Lisää pelaaja
            </Button>
          </Stack>
        </form>
      )
    }
  }

  const addRule = () => {
    return (
      <form onSubmit={handleNewRule}>
        <input
          type="text"
          value={rule}
          onChange={(event) => setRule(event.target.value)}
        ></input>
        <button type="submit">Lisää sääntö</button>
      </form>
    )
  }

  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Juomapeli
      </Typography>

      {addPlayer()}
      <ul>
        {players.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      {drawButton()}
      {round > 0 ? (
        <div>
          {`Vuorossa: ${players[drinker]}`}
          <br />
          {`Kierros: ${round}/${maxRounds}`}
        </div>
      ) : null}

      {showRuleForm === false && drawCard()}
      {showRuleForm === true && addRule()}
      {rules.length > 0 ? <Typography variant="h3">Säännöt:</Typography> : null}
      <ul>
        {rules.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </Container>
  )
}

export default App
