import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

interface BaseButtonProps {
  children: React.ReactNode;

  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
}

const Button: React.FC<BaseButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    size,
    children,
    href,
  } = props
  // default classes: "btn btn-lg btn-primary"
  const classes = classNames(
    'btn', 
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      'disabled': (btnType === ButtonType.Link) && disabled,
    },
  )

  if (btnType === ButtonType.Link && href) {
    return (
      <a 
        className={classes}
        href={href}
      > 
        {children}
      </a>
    )
  }
  return (
    <button
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button
