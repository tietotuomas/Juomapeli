import titleImg from './assets/titleImg.png'
import helenius from './assets/helenius.webp'

import { useState } from 'react'
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
import SendIcon from '@mui/icons-material/Send'
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
  const [painostusbiisiPlays, setPainostusbiisiPlays] = useState(false)

 console.log("App renderöidään");
  const painostusbiisi = new Audio("/painostusbiisi.mp3")
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
  }

  const nextRound = () => {
    console.log("NextRound funkkari");
    setRound(round + 1)
    console.log("setRound");
    if (drinker + 1 < players.length) {
      console.log("setDrinker");
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
  }

  const difficultyButton = () => {
    if (round === 0 && players.length > 1) {
      return (
        <div>
          <Typography variant="h4">Aloita peli:</Typography>

          <br />
          <Stack spacing={1} direction="row" display="block">
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
          {shuffleCard()}

          <br />
          <Button variant="contained" size="large" onClick={nextRound}>
            Seuraava kierros
          </Button>
        </div>
      )
    }
  }

  const shuffleCard = () => {
    console.log("shuffleCard funkkaria kutsuttiin");
    if (painostusbiisiPlays) {
      setPainostusbiisiPlays(false)
    }
    const card = cards[Math.floor(Math.random() * cards.length)]
    console.log("kortti nyt", card);
    if (card === 'Juo ') {
      const amount = Math.floor(Math.random() * factor) + 1
      return <Typography variant="h3">Juo {amount}</Typography>
    }
    if (card === 'Tarjoa ') {
      const amount = Math.floor(Math.random() * factor) + 1
      return <Typography variant="h3">Tarjoa {amount}</Typography>
    }
    if (card === 'Sääntö') {
      setShowRuleForm(true)
    }
    if (card === 'Juo shotti') {
      return (
        <div>
          <img
            src={helenius}
            alt="Helenius"
            style={{ objectFit: 'cover', width: '100%', height: '70%' }}
          />
          <Typography variant="h3">{card}</Typography>
        </div>
      )
    }

    if (card === 'Painostusbiisi') {
      console.log("Painostusbiisi kortti");

      setPainostusbiisiPlays(true)

      return <Typography variant="h3">{card}</Typography>

    }
    return <Typography variant="h3">{card}</Typography>
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
        {painostusbiisiPlays ? painostusbiisi.play() : null}
        <Grid container justify="center" style={{ marginBottom: '20px' }}>
          <img src={titleImg} alt="Juomapeli" />
        </Grid>
        {addPlayer()}

        {round === 0 ? (
          <List>
            {players.map((p) => (
              <ListItem key={p}>
                <ListItemText>
                  <Typography variant="h3">{p}</Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        ) : null}

        {difficultyButton()}
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
            {showRuleForm === false && drawCard()}
            {showRuleForm === true && addRule()}
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
