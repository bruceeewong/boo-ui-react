import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'large',
  smallall = 'small',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

type ButtonSizeProp = 'large' | 'small'
type ButtonTypeProp = 'primary' | 'default' | 'danger' | 'link'
interface BaseButtonProps {
  children: React.ReactNode;

  className?: string;
  disabled?: boolean;
  size?: ButtonSizeProp;
  btnType?: ButtonTypeProp;
  href?: string;
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    size,
    children,
    href,
    className,
    ...restProps
  } = props
  // default classes: "btn btn-large btn-primary"
  const classes = classNames(
    'btn', 
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      'disabled': (btnType === ButtonType.Link) && disabled,
    },
    className,  // user custom className
  )

  if (btnType === ButtonType.Link && href) {
    return (
      <a 
        className={classes}
        href={href}
        {...restProps}
      > 
        {children}
      </a>
    )
  }
  return (
    <button
      className={classes}
      disabled={disabled}
      {...restProps}
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
