import { Typography, Button } from '@mui/material'
import helenius from '../assets/helenius.webp'

const PlayingCard = ({ playingCard, factor, setShowRuleForm, nextRound }) => {
  console.log('PlayingCard renderöidään')
  console.log(playingCard)

  if (playingCard === '') {
    return null
  }

  if (playingCard === 'Juo ') {
    const amount = Math.floor(Math.random() * factor) + 1
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
    setShowRuleForm(true)
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
    console.log('Painostusbiisi kortti')

    // setPainostusbiisiPlays(true)

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
