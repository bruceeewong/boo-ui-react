import React, { useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export type AlertType = 'default' | 'success' | 'danger' | 'warning'

export interface BaseAlertProps {
  title?: string;
  content?: string;
  alertType?: AlertType;
  closable?: boolean;
  onClose?: () => any;
}

export type AlertProps = BaseAlertProps & React.BaseHTMLAttributes<HTMLElement>

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
    'b-alert',
    { [`b-alert-${alertType}`]: alertType },
    className,
  )

  const handleClose = () => {
    setVisible(false)

    // call user callback
    onClose && onClose()
  }

  return (
    <Transition
      in={visible}
      timeout={200}
      animation="zoom-in-top"
      wrapper
    >
      <div data-testid="alert" className={classes}>
        <div className="b-alert-main">
          <h1 className="b-alert-title">{title}</h1>
          { closable &&
            <Icon 
              className="b-alert-icon-close"
              icon="times"
              data-testid="alert-close"
              onClick={handleClose}
            />}
        </div>
        {
          content &&
          <p className="b-alert-content">{content}</p>
        }
      </div>
    </Transition>
  )
}

Alert.defaultProps = {
  title: 'default title',
  closable: true,
  alertType: 'default',
}

export default Alert