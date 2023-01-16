import { Typography, Button, Stack } from '@mui/material'

const DifficultyButton = ({ round, startGame, players }) => {
  if (round === 0 && players.length > 1) {
    return (
      <div>
        <Typography variant="h4">Valitse vaikeustaso:</Typography>

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

export default DifficultyButton
