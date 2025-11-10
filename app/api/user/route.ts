import { NextRequest, NextResponse } from 'next/server';
import { UserData } from '../../../types';

export async function GET(request: NextRequest): Promise<NextResponse<UserData>> {
  try {
    // Fetch from external API WITHOUT caching
    const response = await fetch('http://0.0.0.0:8000/employees/1', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const externalData = await response.json();

    // Map the external API response to our UserData format
    const userData: UserData = {
      name: externalData.name || externalData.first_name + ' ' + externalData.last_name || 'Unknown User',
      email: externalData.email || externalData.contact_email || 'no-email@example.com',
      bio: externalData.bio || externalData.description || externalData.position || 'Employee',
      timestamp: new Date().toISOString(),
      source: 'External API - Cache'
    };

    const headers = new Headers();

    return new NextResponse(JSON.stringify(userData), {
      status: 200,
      headers
    });

} catch (error) {
    console.error('Error fetching from external API without cache:', error);
    
    // Fallback data when external API is unavailable
    const fallbackData: UserData = {
      name: 'Non-Cached Fallback User',
      email: 'non-cached@example.com',
      bio: 'This is non-cached fallback data because external API is unavailable',
      timestamp: new Date().toISOString(),
      source: 'External API - Cache Fallback'
    };

    const headers = new Headers();

    return new NextResponse(JSON.stringify(fallbackData), {
      status: 200,
      headers
    });
  }
}