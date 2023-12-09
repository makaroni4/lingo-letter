import { MouseEventHandler } from "react"

export default function Button({
  onClick = () => {},
  children,
  className,
  disabled = false
}: {
  className?: string
  children: any
  onClick?: MouseEventHandler
  disabled?: boolean
}) {
  return (
    <button
      className={`py-1.5 px-4 bg-indigo-500 text-lg font-medium	hover:bg-indigo-700 text-white rounded-md ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
