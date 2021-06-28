import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "./Backdrop";
import Button from "./Button";
import classes from "./Modal.module.css";

const ModalOverlay = ({ onClose, onConfirm, title, children, loading, showFooter }) => {
  const loadingClass = loading ? classes.loading : "";

  return (
    <div className={classes.modal}>
      <div className={`${classes.container} ${loadingClass}`}>
        <div className={classes.head}>
          <span>{title}</span>
          <span>
            <CloseIcon className={classes.close} onClick={() => onClose()} />
          </span>
        </div>
        <div className={classes.body}>{children}</div>
        {showFooter === false ? (
          ""
        ) : (
          <div className={classes.foot}>
            <Button btnType="primary" onClick={onConfirm} loading={loading}>
              OK
            </Button>
            <Button btnType="primary" onClick={onClose}>
              CANCEL
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay {...props} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Modal;
