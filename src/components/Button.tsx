import { MouseEventHandler } from "react";

export default function Button({ onClick = () => {}, children, className }: { className?: string, children: any, onClick?: MouseEventHandler }) {
  return (
    <button
      className={`py-2 px-4 bg-indigo-500 text-white rounded-md ${className}`}
      onClick={onClick}>
      { children }
    </button>
  )
}
