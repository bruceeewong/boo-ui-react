import React, { FC, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

export type ButtonSize = 'large' | 'small'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
interface BaseButtonProps {
  children: ReactNode;

  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = (props) => {
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
    'b-btn', 
    {
      [`b-btn-${btnType}`]: btnType,
      [`b-btn--${size}`]: size,
      'b-btn--disabled': (btnType === 'link') && disabled,
    },
    className,  // user custom className
  )

  if (btnType === 'link' && href) {
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
  btnType: 'default',
}

export default Button
