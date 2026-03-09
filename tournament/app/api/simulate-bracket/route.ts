import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { runSimulations } = require('../../../lib/bracketSim');

export async function POST(request: NextRequest) {
  try {
    const { numSims = 100 } = await request.json();

    if (numSims < 1 || numSims > 1000) {
      return NextResponse.json({ error: 'numSims must be between 1 and 1000' }, { status: 400 });
    }

    const results = runSimulations(numSims);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Simulation error:', error);
    return NextResponse.json({ error: 'Simulation failed' }, { status: 500 });
  }
}
