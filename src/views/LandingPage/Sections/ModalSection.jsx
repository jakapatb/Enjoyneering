import React from 'react';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";

import modalStyle from "assets/jss/material-kit-react/modalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}
//Modal for Admin only!
//for make this post to public
class ModalSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: props.isOpen,
        };
    }
/**
 *     componentWillUpdate(nextProps, nextState) {
      if(nextProps.isOpen !== this.props.isOpen){
          this.setState({modal:nextProps.isOpen})
      }
    }
 */

    handleClose=()=>{
        this.props.handleModal()
    }

    render() {
        const { classes,isOpen,allow } = this.props;

        return (
                <Dialog
                    classes={{
                        root: classes.center,
                        paper: classes.modal
                    }}
                    open={isOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.handleClose()}
                    aria-labelledby="modal-slide-title"
                    aria-describedby="modal-slide-description">
                    <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}>
                        <IconButton
                            className={classes.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => this.handleClose()}>
                            <Close className={classes.modalClose} />
                        </IconButton>
                        <h4 className={classes.modalTitle}>Public Permission</h4>
                    </DialogTitle>
                    <DialogContent
                        id="modal-slide-description"
                        className={classes.modalBody}>
                        <h5>คุณต้องการเปิด Public บทความนี้หรือไม่</h5>
                    </DialogContent>
                    <DialogActions
                        className={classes.modalFooter + " " + classes.modalFooterCenter}>
                        <Button
                            onClick={() => this.handleClose()}
                        >
                            No
            </Button>
                        <Button
                            onClick={() => {
                            allow();
                            this.handleClose()
                            }}
                            color="successNoBackground">
                            Yes
            </Button>
                    </DialogActions>
                </Dialog>
        );
    }
}

export default withStyles(modalStyle)(ModalSection);