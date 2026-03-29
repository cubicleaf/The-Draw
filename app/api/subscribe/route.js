/*
  API Route — /api/subscribe

  This runs on the SERVER, not in the browser.
  That means the API key stays hidden from visitors.

  When the SubscribeForm submits an email, it hits this route,
  which then forwards the request to Buttondown with the secret key.
*/

export async function POST(request) {
  const { email } = await request.json()

  const res = await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
    },
    body: JSON.stringify({
      email_address: email,
      tags: ['the-draw'],
    }),
  })

  if (res.ok) {
    return Response.json({ success: true })
  }

  const data = await res.json().catch(() => ({}))
  return Response.json(
    { success: false, error: data },
    { status: res.status }
  )
}
