import { NextRequest, NextResponse } from 'next/server';
import { fetchFixtures } from '@/lib/football-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { teamId: string } }
) {
  const teamId = parseInt(params.teamId);

  if (isNaN(teamId)) {
    return NextResponse.json({ error: 'Invalid team ID' }, { status: 400 });
  }

  try {
    const fixtures = await fetchFixtures(teamId);
    return NextResponse.json(fixtures);
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return NextResponse.json({ error: 'Failed to fetch fixtures' }, { status: 500 });
  }
}
