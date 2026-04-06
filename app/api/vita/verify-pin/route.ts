import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json()
    const correctPin = process.env.VITA_ADMIN_PIN

    if (!correctPin) {
      return NextResponse.json(
        { error: 'VITA_ADMIN_PIN environment variable is not set.' },
        { status: 500 },
      )
    }

    if (String(pin) === String(correctPin)) {
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Incorrect PIN' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
