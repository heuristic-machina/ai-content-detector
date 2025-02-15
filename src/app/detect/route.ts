import { DetectionResponse } from '@/types/api';

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
        'x-rapidapi-key': process.env.RAPIDAPI_KEY ?? '',
        'x-rapidapi-host': process.env.API_HOST ?? '',
      },
      body: JSON.stringify({ text }),
    });

    const data = (await response.json()) as DetectionResponse;
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: unknown) {  // Changed from 'error' to 'err' and added type
    console.error('Error processing request:', err);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: err instanceof Error ? err.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 