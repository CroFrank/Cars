const styles = {
  create: "bg-green-700 hover:bg-green-600",
  edit: "bg-blue-700 hover:bg-blue-600",
  cancel: "bg-red-700 hover:bg-red-600",
}

export default function AnchorTagBtn({
  location,
  style,
  children,
}: AnchorTagProps) {
  return (
    <a
      href={location}
      className={`${styles[style]} px-4 py-2 rounded text-white`}
    >
      {children}
    </a>
  )
}
