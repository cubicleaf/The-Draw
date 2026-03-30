/*
  API Route — /api/subscribe

  This runs on the SERVER, not in the browser.
  That means the API key stays hidden from visitors.

  When the SubscribeForm submits an email, it hits this route,
  which then forwards the request to Buttondown with the secret key.
*/

// GET handler — just for testing that the route is alive
export async function GET() {
  return Response.json({
    status: 'ok',
    hasKey: !!process.env.BUTTONDOWN_API_KEY,
  })
}

export async function POST(request) {
  try {
    const { email } = await request.json()

    const apiKey = process.env.BUTTONDOWN_API_KEY
    if (!apiKey) {
      console.error('BUTTONDOWN_API_KEY is not set')
      return Response.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const res = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({
        email_address: email,
        tags: ['the-draw'],
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (res.ok) {
      return Response.json({ success: true })
    }

    console.error('Buttondown API error:', res.status, JSON.stringify(data))
    return Response.json(
      { success: false, error: data },
      { status: res.status }
    )
  } catch (err) {
    console.error('Subscribe route error:', err.message)
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
