import React from 'react'

const Button = ({ children, variant = 'primary', href, target, onClick, ...props }) => {
  const baseClasses = 'btn'
  const variantClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  const className = `${baseClasses} ${variantClasses}`

  if (href) {
    return (
      <a href={href} target={target} className={className} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button
