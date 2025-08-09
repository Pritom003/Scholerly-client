import React from 'react'
import './button.css'

interface ButtonProps {
  buttontext: string
}

const Button: React.FC<ButtonProps> = ({ buttontext }) => {
  return (
    <div>
      <span className='btn'>
        <span className="box border-2 border-[#815606]
         p-4 text-[#815606]">
          {buttontext}
        </span>
      </span>
    </div>
  )
}

export default Button
