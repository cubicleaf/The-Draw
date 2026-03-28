import './globals.css'

export const metadata = {
  title: 'The Draw',
  description: '1,290 words. 10 drawn at random. One piece of writing. Every week.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
