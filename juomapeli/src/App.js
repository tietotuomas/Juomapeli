import titleImg from './assets/titleImg.png'
import AddPlayer from './components/AddPlayer'
import Players from './components/Players'
import DifficultyButton from './components/DifficultyButton'
import PlayingCard from './components/PlayingCard'
import Notification from './components/Notification'

import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  createTheme,
  ThemeProvider,
} from '@mui/material'

import { orange } from '@mui/material/colors'

const App = () => {
  const [name, setName] = useState('')
  const [players, setPlayers] = useState([])
  const [round, setRound] = useState(0)
  const [maxRounds, setMaxRounds] = useState(0)
  const [factor, setFactor] = useState(0)
  const [drinker, setDrinker] = useState(0)
  const [rules, setRules] = useState([])
  const [rule, setRule] = useState('Puhukaa englantia')
  const [cards, setCards] = useState([])
  const [playingCard, setPlayingCard] = useState('')
  const [message, setMessage] = useState({ msg: '', severity: '' })
  const [timeOutId, setTimeOutId] = useState(null)
  const painostusbiisi = new Audio('/painostusbiisi.mp3')
  const maistuu = new Audio('/maistuu.mp3')
  const kommunismilla = new Audio('/kommunismilla.mp3')
  const velaton = new Audio('/velaton.mp3')
  const sakkoa = new Audio('./sakkoa.mp3')

  const audios = [painostusbiisi, maistuu, kommunismilla, velaton, sakkoa]

  useEffect(() => {
    if (round === 1) {
      shuffleCard()
    }
  }, [round])

  console.log('App renderöidään')

  const handleNewName = (event) => {
    event.preventDefault()
    setPlayers(players.concat(name))
    setName('')
  }

  const handleNewRule = (event) => {
    event.preventDefault()
    setRules(rules.concat(rule))
    setRule('')
    nextRound()
  }

  const quitGame = () => {
    round > maxRounds
      ? createMessage(`Winner winner chicken dinner`, 'success', 10)
      : createMessage(`Luuserit!`, 'error', 5)
    setRound(0)
    setPlayers([])
    setDrinker(0)
    setFactor(0)
    setMaxRounds(0)
    setRules([])
    setRule('')
    setCards([])
    setPlayingCard('')
    audios.forEach((a) => {
      a.pause()
      a.currentTime = 0
    })
  }

  // severity='info' so severity would be info if left blank
  // time=5 so duration would be 5 seconds if left blank
  const createMessage = (msg, severity = 'info', time = 5) => {
    setMessage({ msg: msg, severity: severity })
    if (timeOutId) {
      //clear timeOutId so the current notification won't disappear too early
      clearTimeout(timeOutId)
    }
    const id = setTimeout(() => {
      setMessage({ msg: '', severity: '' })
    }, time * 1000)

    setTimeOutId(id)
  }

  const nextRound = () => {
    console.log('NextRound funkkari')
    setRound(round + 1)
    console.log('setRound')
    if (drinker + 1 < players.length) {
      setDrinker(drinker + 1)
    } else {
      setDrinker(0)
    }
    audios.forEach((a) => {
      a.pause()
      a.currentTime = 0
    })
    shuffleCard()
  }

  const startGame = (level) => {
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
      setMaxRounds(30)
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
          'Kaikki juo 1',
          'Kaikki juo 2',
          'Nouskaa ylös ja huutakaa "mestari", viimeinen juo 3',
        ]
      )
      setCards(cardsToBeAdded)
    }
    if (level === 'tiistai') {
      setFactor(12)
      setMaxRounds(52)
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
          'Kaikki juo 1',
          'Juo shotti',
          'Nouskaa ylös ja huutakaa "mestari", viimeinen juo 3',
        ]
      )
      setCards(cardsToBeAdded)
    }
    // if (level === 'custom') {
    //   VALITSE ITSE KORTIT?
    // }
    console.log('startGamen lopussa')
    createMessage(
      `Pelaajat: ${players.slice(0, -1).join(', ')} ja ${players.slice(
        -1
      )}. GL HF!`
    )
    setRound(1)
  }

  const shuffleCard = () => {
    console.log('shuffleCard funkkaria kutsuttiin, round:', round)
    let card = cards[Math.floor(Math.random() * cards.length)]

    //ad hoc fix to a extra render caused by notification at the start of the game
    while (round < 3 && card === 'Painostusbiisi') {
      console.log(card, 'uusi arvonta')
      card = cards[Math.floor(Math.random() * cards.length)]
    }

    //no rules at the end of the game and maximum of 4 rules
    while (
      (round + 3 > maxRounds && card === 'Sääntö') ||
      (rules.length > 3 && card === 'Sääntö')
    ) {
      console.log(card, 'uusi arvonta')
      card = cards[Math.floor(Math.random() * cards.length)]
    }

    console.log('kortti nyt', card)
    console.log('----------')

    setPlayingCard(card)
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: orange[700],
      },
      secondary: {
        main: '#212121',
      },
      // text: { primary: '#FFFFFF' },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      {/* <Container sx={{ backgroundColor: '#000000' }}> */}
      <Container>
        {round > maxRounds ? quitGame() : null}
        <Grid container justify="center" style={{ marginBottom: '20px' }}>
          <img src={titleImg} alt="Juomapeli" />
        </Grid>
        {message.msg ? (
          <Notification message={message.msg} severity={message.severity} />
        ) : null}
        <AddPlayer
          round={round}
          handleNewName={handleNewName}
          name={name}
          setName={setName}
        />

        <Players round={round} players={players} />

        <DifficultyButton
          round={round}
          players={players}
          startGame={startGame}
        />
        {round > 0 ? (
          <Grid container my={4}>
            <Grid item xs={2}>
              <Typography variant="subtitle1">
                <b>{`Vuorossa: ${players[drinker]}`}</b>
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1">
                <b>{`Kierros: ${round}/${maxRounds}`}</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {rules.length > 0 ? (
                <Typography variant="h5">Säännöt (rikkoja juo 1):</Typography>
              ) : null}
              <List style={{ padding: 0, margin: 0 }}>
                {rules.map((r) => (
                  <ListItem style={{ padding: 0, margin: 0 }} key={r}>
                    <ListItemText primary={r} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        ) : null}

        <Grid container my={10}>
          <Grid item xs={3}>
            <PlayingCard
              playingCard={playingCard}
              factor={factor}
              handleNewRule={handleNewRule}
              rule={rule}
              setRule={setRule}
              nextRound={nextRound}
              painostusbiisi={painostusbiisi}
              maistuu={maistuu}
              kommunismilla={kommunismilla}
              velaton={velaton}
              sakkoa={sakkoa}
            />
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}></Grid>
        </Grid>

        <Box style={{ marginTop: 30 }}>
          {round > 0 ? (
            <Button type="submit" variant="outlined" onClick={quitGame}>
              Lopeta peli
            </Button>
          ) : null}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
