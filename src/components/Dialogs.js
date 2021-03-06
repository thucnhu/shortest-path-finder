import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { initialEdges, initialNodes } from '../constant/initialGraph'

const ConfirmDialog = props => {
	const handleAgree = () => {
		props.setIsOpen(false)
		props.setNodes(initialNodes)
		props.setEdges(initialEdges)
		props.clearStyle()
	}

	const handleDisagree = () => {
		props.setIsOpen(false)
	}

	return (
		<Dialog
			open={props.isOpen}
			onClose={() => props.setIsOpen(false)}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>Be careful</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					Are you sure you want to reset the entire board?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDisagree} color='primary'>
					No
				</Button>
				<Button onClick={handleAgree} color='primary' autoFocus>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export { ConfirmDialog }
