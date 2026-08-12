import './globals.css'

export const metadata = {
  title: 'The Draw',
  description: "10 words drawn randomly at a time, original writing—no ai—that's a promise",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
