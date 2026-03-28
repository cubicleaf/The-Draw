import drawData from '../data/draws.json'
import WordScatter from '../components/WordScatter'
import WeekCard from '../components/WeekCard'
import SubscribeForm from '../components/SubscribeForm'

/*
  Homepage — The landing page.

  Structure:
  1. Title + tagline
  2. Short intro text
  3. This week's scattered words (most recent draw)
  4. "Read this week's piece" link
  5. Archive of past weeks
  6. Subscribe form
*/

export default function Home() {
  // Get draws sorted newest first
  const draws = [...drawData.draws].sort((a, b) => b.week - a.week)
  const latest = draws[0]
  const archive = draws.slice(1)

  return (
    <main className="container">
      {/* Header */}
      <header className="site-header">
        <h1 className="site-title">The Draw</h1>
        <p className="site-tagline">{drawData.tagline}</p>
      </header>

      {/* Current week */}
      {latest && (
        <>
          <div className="section-header">
            Week {latest.week} — {latest.date}
          </div>

          <WordScatter words={latest.words} />

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <a
              href={`/week/${latest.week}`}
              className="week-card-title"
              style={{ fontSize: '1.6rem', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '4px' }}
            >
              {latest.piece_title}
            </a>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--ink-faint)',
              marginTop: '10px',
              letterSpacing: '0.5px'
            }}>
              {latest.piece_format} · click to read
            </p>
          </div>
        </>
      )}

      {/* Archive */}
      {archive.length > 0 && (
        <>
          <div className="section-header">Archive</div>
          {archive.map((draw) => (
            <WeekCard
              key={draw.week}
              number={draw.week}
              date={draw.date}
              title={draw.piece_title}
              words={draw.words}
            />
          ))}
        </>
      )}

      {/* Subscribe */}
      <SubscribeForm />

      {/* Footer */}
      <footer className="site-footer">
        The Draw — a vocabulary project by Tim
      </footer>
    </main>
  )
}
