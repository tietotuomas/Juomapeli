import { Stack, TextField, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const AddPlayer = ({ round, handleNewName, name, setName }) => {
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

export default AddPlayer
