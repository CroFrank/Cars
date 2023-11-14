interface ButtonProps {
  style: "submit" | "delete"
  children: string
}

const styles = {
  submit: "bg-blue-700 hover:bg-blue-600",
  delete: "bg-red-700 hover:bg-red-600",
}

export default function Button({ style, children }: ButtonProps) {
  return (
    <button className={`${styles[style]} px-4 py-2 rounded text-white`}>
      {children}
    </button>
  )
}
