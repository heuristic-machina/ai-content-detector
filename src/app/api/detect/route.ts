import { NextResponse } from 'next/server';

const API_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = 'ai-content-detector-ai-gpt.p.rapidapi.com';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const response = await fetch('https://ai-content-detector-ai-gpt.p.rapidapi.com/api/detectText/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': API_KEY!,
        'x-rapidapi-host': API_HOST,
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to detect AI content' }, { status: 500 });
  }
} 