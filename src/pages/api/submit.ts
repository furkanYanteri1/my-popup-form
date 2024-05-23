import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { name, email, phone, consent } = req.body

    // Mock saving data to the database
    console.log('Received data:', { name, email, phone, consent })

    res.status(200).json({ message: 'Form submitted successfully' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
