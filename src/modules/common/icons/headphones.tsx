import React from "react"

import { IconProps } from "types/icon"

const Headphones: React.FC<IconProps> = ({
  size = "24",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        d="M3 14V11C3 8.61305 3.94821 6.32387 5.63604 4.63604C7.32387 2.94821 9.61305 2 12 2C14.3869 2 16.6761 2.94821 18.364 4.63604C20.0518 6.32387 21 8.61305 21 11V14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14C21 15.1046 20.1046 16 19 16H17C15.8954 16 15 15.1046 15 14V11C15 9.89543 15.8954 9 17 9H19C20.1046 9 21 9.89543 21 11V14Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 14C3 15.1046 3.89543 16 5 16H7C8.10457 16 9 15.1046 9 14V11C9 9.89543 8.10457 9 7 9H5C3.89543 9 3 9.89543 3 11V14Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Headphones
