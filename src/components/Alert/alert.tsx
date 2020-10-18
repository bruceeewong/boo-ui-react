import React, { useState } from 'react'
import classNames from 'classnames'

export enum AlertType {
  DEFAULT = 'default',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
}

interface BaseAlertProps {
  title?: string;
  content?: string;
  alertType?: AlertType;
  closable?: boolean;
  onClose?: () => any;
}

type AlertProps = BaseAlertProps & React.BaseHTMLAttributes<HTMLElement>

const Alert: React.FC<AlertProps> = (props) => {
  const {
    title,
    content,
    alertType,
    closable,
    className,
    onClose,
  } = props

  const [visible, setVisible] = useState(true)

  const classes = classNames(
    'alert',
    { [`alert-${alertType}`]: alertType }, 
    { 'alert--hide': !visible },
    className,
  )

  const handleClose = () => {
    setVisible(false)

    // call user callback
    onClose && onClose()
  }

  return (
    <div className={classes}>
      <div className="alert-main">
        <h1 className="alert-title">{title}</h1>
        { closable && 
          <i
            className="alert-icon-close"
            onClick={handleClose}
          >x</i>}
      </div>
      {
        content &&
        <p className="alert-content">{content}</p>
      }
    </div>
  )
}

Alert.defaultProps = {
  title: 'default title',
  closable: true,
  alertType: AlertType.DEFAULT,
}

export default Alert