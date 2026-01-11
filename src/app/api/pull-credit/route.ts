import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ssn, firstName, lastName, dateOfBirth, address } = body;

    // Validate required fields
    if (!ssn || !firstName || !lastName || !dateOfBirth) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // MicroBilt API credentials (add these to .env.local)
    const MICROBILT_CLIENT_ID = process.env.MICROBILT_CLIENT_ID;
    const MICROBILT_CLIENT_SECRET = process.env.MICROBILT_CLIENT_SECRET;

    if (!MICROBILT_CLIENT_ID || !MICROBILT_CLIENT_SECRET) {
      console.error('MicroBilt credentials not configured');
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      );
    }

    // Step 1: Get OAuth token
    const tokenResponse = await fetch('https://api.microbilt.com/OAuth/GetAccessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: MICROBILT_CLIENT_ID,
        client_secret: MICROBILT_CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get MicroBilt access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Step 2: Pull credit report
    const creditResponse = await fetch('https://api.microbilt.com/CreditReport/GetReport', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        RequestData: {
          PersonalData: {
            Name: {
              FirstName: firstName,
              LastName: lastName,
            },
            DateOfBirth: dateOfBirth,
            SSN: ssn,
          },
          Address: address ? {
            StreetAddress: address,
          } : undefined,
        },
        RequestType: 'SoftPull', // Soft inquiry - doesn't affect score
      }),
    });

    if (!creditResponse.ok) {
      throw new Error('Failed to pull credit report from MicroBilt');
    }

    const creditData = await creditResponse.json();

    // Parse and structure the response
    const report = creditData.CreditReport || {};
    const score = report.CreditScore?.Value || 0;
    
    // Extract accounts
    const accounts = (report.TradeLines || []).map((trade: any) => ({
      name: trade.CreditorName || 'Unknown',
      balance: trade.Balance || 0,
      limit: trade.CreditLimit || 0,
      payment: trade.MonthlyPayment || 0,
      status: trade.AccountStatus || 'Unknown',
    }));

    // Extract inquiries
    const inquiries = (report.Inquiries || []).map((inq: any) => ({
      name: inq.InquirerName || 'Unknown',
      date: inq.InquiryDate || 'N/A',
      type: inq.InquiryType || 'soft',
    }));

    // Calculate bankability score (simplified algorithm)
    const utilization = accounts.reduce((sum: number, acc: any) => {
      if (acc.limit > 0) {
        return sum + (acc.balance / acc.limit);
      }
      return sum;
    }, 0) / Math.max(accounts.length, 1);

    const bankabilityScore = Math.min(10, Math.max(1, 
      (score / 85) * 7 + // 70% weight on credit score
      (1 - utilization) * 3 // 30% weight on low utilization
    ));

    // Generate recommendations
    const recommendations = [];
    if (utilization > 0.3) {
      recommendations.push('Reduce credit utilization below 30% for optimal bankability');
    }
    if (score < 680) {
      recommendations.push('Focus on paying bills on time to improve credit score');
    }
    if (accounts.length < 3) {
      recommendations.push('Consider opening additional credit accounts to diversify credit mix');
    }

    return NextResponse.json({
      success: true,
      report: {
        score,
        accounts,
        inquiries,
        score_breakdown: {
          payment_history: { label: 'Payment History', percentage: 35, status: 'good' },
          utilization: { label: 'Credit Utilization', percentage: (utilization * 100).toFixed(0), status: utilization < 0.3 ? 'excellent' : 'needs_attention' },
          credit_age: { label: 'Credit Age', percentage: 15, status: 'good' },
          account_mix: { label: 'Account Mix', percentage: 10, status: 'fair' },
          new_credit: { label: 'New Credit', percentage: 10, status: 'good' },
        },
        recommendations,
      },
      bankability_score: Number(bankabilityScore.toFixed(1)),
    });

  } catch (error) {
    console.error('Error in pull-credit:', error);
    return NextResponse.json(
      { error: 'Failed to pull credit report' },
      { status: 500 }
    );
  }
}
