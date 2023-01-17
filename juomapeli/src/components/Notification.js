import { Alert } from '@mui/material'

const Notification = ({ message, severity }) => {
  const color = severity === 'error' ? 'error' : 'warning'
  return (
    <Alert severity={severity} color={color}>
      <b>{message}</b>
    </Alert>
  )
}

export default Notification
