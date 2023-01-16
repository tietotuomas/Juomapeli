import { Alert } from '@mui/material'

const Notification = ({message, severity}) => {
  return <Alert severity={severity}  color='warning'><b>{message}</b></Alert>
}

export default Notification
