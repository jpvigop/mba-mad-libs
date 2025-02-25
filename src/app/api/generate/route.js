import { NextResponse } from 'next/server';
import { generateBusinessJargon } from '../../../utils/generator';

export async function POST(request) {
  try {
    const { intensity = 5, businessSchoolMode = false, includeEmojis = true } = await request.json();
    
    const result = generateBusinessJargon({
      intensity: Number(intensity),
      businessSchoolMode: Boolean(businessSchoolMode),
      includeEmojis: Boolean(includeEmojis)
    });
    
    return NextResponse.json({ 
      success: true, 
      ...result
    });
  } catch (error) {
    console.error('Error generating business jargon:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate business jargon' },
      { status: 500 }
    );
  }
}

// GET method for testing purposes
export async function GET() {
  try {
    // Use a fixed seed or deterministic response for the GET method
    // This helps prevent hydration issues when testing the API directly
    const result = {
      content: "We need to leverage our disruptive ecosystem to drive growth.",
      socialContent: "Just shared this with my MBA cohort:\n\n\"We need to leverage our disruptive ecosystem to drive growth.\"\n\nThis is how you build real competitive advantage.\n\n#ThoughtLeadership #Innovation #Strategy"
    };
    
    return NextResponse.json({ 
      success: true, 
      ...result,
      message: 'This is a test response. For actual use, use POST with parameters.'
    });
  } catch (error) {
    console.error('Error generating business jargon:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate business jargon' },
      { status: 500 }
    );
  }
} 