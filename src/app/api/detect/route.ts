import { NextResponse } from 'next/server';

const API_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = 'ai-content-detector-ai-gpt.p.rapidapi.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text) {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
  } catch (err) {
    console.error('Error processing request:', err);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: err instanceof Error ? err.message : 'Unknown error'
      },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 