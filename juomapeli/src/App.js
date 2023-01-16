import titleImg from './assets/titleImg.png'
import AddPlayer from './components/AddPlayer'
import Players from './components/Players'
import DifficultyButton from './components/DifficultyButton'
import PlayingCard from './components/PlayingCard'

import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  TextField,
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
  const [showRuleForm, setShowRuleForm] = useState(false)
  const [cards, setCards] = useState([])
  const [playingCard, setPlayingCard] = useState('')
  const [painostusbiisiPlays, setPainostusbiisiPlays] = useState(false)

  useEffect(() => {
    if (round > maxRounds) {
      quitGame()
    } else if (round > 0) {
      drawCard()
    }
  }, [round])

  console.log('App renderöidään')
  const painostusbiisi = new Audio('/painostusbiisi.mp3')
  // const startPainostusbiisi = () => {
  //   painostusbiisi.play()
  // }

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
    setPlayingCard('')
  }

  const nextRound = () => {
    console.log('NextRound funkkari')
    setRound(round + 1)
    console.log('setRound')
    if (drinker + 1 < players.length) {
      console.log('setDrinker')
      setDrinker(drinker + 1)
    } else {
      setDrinker(0)
    }
    drawCard()
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
          'Painostusbiisi',
          'Painostusbiisi',
          'Painostusbiisi',
          'Painostusbiisi',
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
    console.log('startGamen lopussa')
    setRound(1)
  }

  const drawCard = () => {
    console.log('drawCard', round)

    if (showRuleForm) {
      addRule()
    } else if (round > 0) {
      shuffleCard()
    }
  }

  const shuffleCard = () => {
    console.log('shuffleCard funkkaria kutsuttiin')
    if (painostusbiisiPlays) {
      setPainostusbiisiPlays(false)
    }
    const card = cards[Math.floor(Math.random() * cards.length)]
    console.log('kortti nyt', card)
    setPlayingCard(card)
  }

  const addRule = () => {
    return (
      <form onSubmit={handleNewRule}>
        <Stack spacing={1} direction="row">
          <TextField
            size="small"
            type="text"
            value={rule}
            onChange={(event) => setRule(event.target.value)}
          ></TextField>
          <Button variant="contained" type="submit">
            Lisää sääntö
          </Button>
        </Stack>
      </form>
    )
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
        {/* {painostusbiisiPlays ? painostusbiisi.play() : null} */}
        <Grid container justify="center" style={{ marginBottom: '20px' }}>
          <img src={titleImg} alt="Juomapeli" />
        </Grid>
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
              <Typography variant="subtitle1">{`Vuorossa: ${players[drinker]}`}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1">{`Kierros: ${round}/${maxRounds}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              {rules.length > 0 ? (
                <Typography variant="h5">Säännöt:</Typography>
              ) : null}
              <List>
                {rules.map((r) => (
                  <ListItem key={r}>
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
              setShowRuleForm={setShowRuleForm}
              nextRound={nextRound}
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
