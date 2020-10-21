import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

import activify from "@src/hoc/activify"
import useKeyboard from "@src/hooks/useKeyboard"
import CrossIcon from "@src/icons/cross.svg"
import styles from "./Modal.scss"

function Modal({
  id,
  children,
  className,
  active,
  onClose,
  onEnter,
  closeOnOutsideClick = true,
  disableEscape,
}) {
  const modalRef = React.useRef()
  const activeClassName = active ? `${styles.active} active` : ""
  useKeyboard({
    ref: modalRef,
    onEnter: onEnter ? onEnter : () => {},
    onEscape: disableEscape ? () => {} : onClose,
  })

  const component = (
    <div
      ref={modalRef}
      id={id}
      className={`${styles.modal} ${className} ${activeClassName}`}
    >
      <div
        onClick={closeOnOutsideClick && onClose}
        className={styles.modalOverlay}
      />
      <div
        id={id && `${id}-body`}
        className={`${styles.modalBody} ${className}-body`}
      >
        {children}
      </div>
    </div>
  )

  return ReactDOM.createPortal(component, document.body)
}

Modal.Header = ({ title, subtitle, onClose, className }) => (
  <div className={`${styles.modalHeader} ${className}`}>
    <div className={styles.modalHeaderText}>
      <div className={styles.modalHeaderTextTitle}>{title}</div>
      <div className={styles.modalHeaderTextSubtitle}>{subtitle}</div>
    </div>
    <div onClick={onClose} className={styles.modalHeaderCloseIcon}>
      <CrossIcon />
    </div>
  </div>
)

Modal.propTypes = {
  className: PropTypes.string,
  cta: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}

Modal.defaultProps = {
  className: "",
  cta: "",
  subtitle: "",
  title: "",
}

const ActivifiedModal = activify(Modal)
ActivifiedModal.Header = Modal.Header

export default ActivifiedModal
