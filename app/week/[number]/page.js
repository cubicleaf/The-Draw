import { notFound } from 'next/navigation'
import Link from 'next/link'
import drawData from '../../../data/draws.json'
import WordScatter from '../../../components/WordScatter'
import SubscribeForm from '../../../components/SubscribeForm'

/*
  Week Page — Individual piece view.

  URL pattern: /week/1, /week/2, etc.
  The [number] in the folder name is a "dynamic route" —
  Next.js replaces it with whatever number is in the URL.

  Structure:
  1. Back link
  2. Week label + title + date
  3. Scattered words
  4. The full piece (with drawn words highlighted in red)
  5. Subscribe form
*/

// This tells Next.js to pre-build a page for each week
export function generateStaticParams() {
  return drawData.draws.map((draw) => ({
    number: String(draw.week),
  }))
}

// Highlight drawn words in the piece text
function highlightWords(text, words) {
  // Build a regex that matches any of the drawn words (case-insensitive)
  // We sort by length (longest first) so "etiolate" matches before "late"
  const sorted = [...words].sort((a, b) => b.length - a.length)
  const pattern = sorted.map(w =>
    w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  ).join('|')
  const regex = new RegExp(`\\b(${pattern})(s|ed|ing|ly|tion|ity|ness|ment|ous|al|ive|ize|ise|ates?|ated?)?\\b`, 'gi')

  return text.split(regex).map((part, i) => {
    if (!part) return null
    const isMatch = words.some(w =>
      part.toLowerCase().startsWith(w.toLowerCase())
    )
    if (isMatch) {
      return <span key={i} className="drawn-word">{part}</span>
    }
    return part
  })
}

export default async function WeekPage({ params }) {
  const { number } = await params
  const weekNum = parseInt(number)
  const draw = drawData.draws.find(d => d.week === weekNum)

  if (!draw) {
    notFound()
  }

  // Split piece body into paragraphs
  const paragraphs = draw.piece_body.split('\n\n')

  return (
    <main className="container">
      <Link href="/" className="back-link">← Back to The Draw</Link>

      <div className="piece-header">
        <p className="piece-week-label">Week {draw.week}</p>
        <h1 className="piece-title">{draw.piece_title}</h1>
        <p className="piece-date">{draw.date}</p>
      </div>

      <WordScatter words={draw.words} />

      <article className="piece-body">
        {paragraphs.map((para, i) => (
          <p key={i}>{highlightWords(para, draw.words)}</p>
        ))}
      </article>

      <SubscribeForm />

      <footer className="site-footer">
        The Draw — a vocabulary project by Tim
      </footer>
    </main>
  )
}
