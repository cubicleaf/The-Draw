'use client'

import { useState } from 'react'

/*
  SubscribeForm — Buttondown email signup.

  How it works:
  When someone types their email and clicks "Subscribe", this sends
  a request to Buttondown's API to add them to your mailing list.

  To connect this to YOUR Buttondown account:
  Replace 'YOUR_BUTTONDOWN_USERNAME' below with your actual username.
  You get this when you sign up at buttondown.email.
*/

const BUTTONDOWN_USERNAME = 'YOUR_BUTTONDOWN_USERNAME'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(`https://api.buttondown.email/v1/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_address: email,
          tags: ['the-draw'],
        }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="subscribe-section">
        <p className="subscribe-prompt">You're in. Check your inbox.</p>
      </div>
    )
  }

  return (
    <div className="subscribe-section">
      <p className="subscribe-prompt">Get the draw in your inbox.</p>
      <form className="subscribe-form" onSubmit={handleSubmit}>
        <input
          className="subscribe-input"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="subscribe-button"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="subscribe-note" style={{ color: '#8b2500' }}>
          Something went wrong. Try again.
        </p>
      )}
      <p className="subscribe-note">No spam. Just ten words and whatever they become.</p>
    </div>
  )
}
