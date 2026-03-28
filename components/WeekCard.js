import Link from 'next/link'

/*
  WeekCard — one row in the archive.
  Shows week number, title, date, and the 10 words as small tags.
  Clicking it takes you to the full piece.
*/

export default function WeekCard({ week, date, title, words, number }) {
  return (
    <Link href={`/week/${number}`} className="week-card">
      <div className="week-card-header">
        <span className="week-card-number">Week {number}</span>
        <span className="week-card-date">{date}</span>
      </div>
      <h3 className="week-card-title">{title}</h3>
      <div className="week-card-words">
        {words.map((word, i) => (
          <span key={i} className="word-tag">{word}</span>
        ))}
      </div>
    </Link>
  )
}
