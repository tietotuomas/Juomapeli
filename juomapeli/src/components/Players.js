import { List, ListItem, ListItemText, Typography } from '@mui/material'

const Players = ({ players, round }) => {
  if (round === 0) {
    return (
      <List>
        {players.map((p) => (
          <ListItem key={p}>
            <ListItemText>
              <Typography variant="h3">{p}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    )
  }
}

export default Players
