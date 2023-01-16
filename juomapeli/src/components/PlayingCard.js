import { Typography, Button, Stack, TextField } from '@mui/material'
import helenius from '../assets/helenius.webp'

const PlayingCard = ({
  playingCard,
  factor,
  nextRound,
  handleNewRule,
  rule,
  setRule,
  painostusbiisi,
}) => {
  const maistuu = new Audio('/maistuu.mp3')
  console.log('PlayingCard renderöidään:')
  console.log('kortti:', playingCard)

  if (playingCard === '') {
    return null
  }

  if (playingCard === 'Juo ') {
    const amount = Math.floor(Math.random() * factor) + 1
    if (amount > 9 && Math.random() > 0.6) {
      console.log('maistuu')
      maistuu.play()
    }

    return (
      <div>
        <Typography variant="h3">Juo {amount}</Typography>
        <NextRoundButton nextRound={nextRound} />
      </div>
    )
  }
  if (playingCard === 'Tarjoa ') {
    const amount = Math.floor(Math.random() * factor) + 1
    return (
      <div>
        <Typography variant="h3">Tarjoa {amount}</Typography>
        <NextRoundButton nextRound={nextRound} />
      </div>
    )
  }
  if (playingCard === 'Sääntö') {
    return (
      <form onSubmit={handleNewRule}>
        <Stack spacing={1} direction="row">
          <TextField
            size="medium"
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
  if (playingCard === 'Juo shotti') {
    return (
      <div>
        <img
          src={helenius}
          alt="Helenius"
          style={{ objectFit: 'cover', width: '100%', height: '70%' }}
        />
        <Typography variant="h3">{playingCard}</Typography>
        <NextRoundButton nextRound={nextRound} />
      </div>
    )
  }

  if (playingCard === 'Painostusbiisi') {
    painostusbiisi.play()

    return (
      <div>
        <Typography variant="h3">{playingCard}</Typography>
        <NextRoundButton nextRound={nextRound} />
      </div>
    )
  }
  return (
    <div>
      <Typography variant="h3">{playingCard}</Typography>
      <NextRoundButton nextRound={nextRound} />
    </div>
  )
}

const NextRoundButton = ({ nextRound }) => {
  return (
    <>
      <br />
      <Button variant="contained" size="large" onClick={nextRound}>
        Seuraava kierros
      </Button>
    </>
  )
}

export default PlayingCard
