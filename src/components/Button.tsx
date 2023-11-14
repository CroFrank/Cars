interface ButtonProps {
  style: "submit" | "delete"
  children: string
  action?: () => void
  type?: "button" | "reset" | "submit" | undefined
}

const styles = {
  submit: "bg-blue-700 hover:bg-blue-600",
  delete: "bg-red-700 hover:bg-red-600",
}

export default function Button({
  style,
  children,
  action,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={action}
      className={`${styles[style]} px-4 py-2 rounded text-white`}
    >
      {children}
    </button>
  )
}
