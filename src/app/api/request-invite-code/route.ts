import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, message } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if email already has a pending or approved request
    const { data: existingRequest } = await supabase
      .from('lender_invite_requests')
      .select('*')
      .eq('email', email)
      .in('status', ['pending', 'approved'])
      .single();

    if (existingRequest) {
      if (existingRequest.status === 'approved') {
        return NextResponse.json(
          { error: 'Your invite code request has already been approved. Check your email.' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: 'You already have a pending invite request. We\'ll review it soon.' },
        { status: 400 }
      );
    }

    // Create new invite request
    const { error } = await supabase
      .from('lender_invite_requests')
      .insert({
        name,
        email,
        phone: phone || null,
        company: company || null,
        message: message || null,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating invite request:', error);
      return NextResponse.json(
        { error: 'Failed to submit request' },
        { status: 500 }
      );
    }

    // TODO: Send notification to admin about new request
    // TODO: Send confirmation email to requester

    return NextResponse.json({
      success: true,
      message: 'Your request has been submitted. We\'ll review it and send you an invite code within 24 hours.'
    });

  } catch (error) {
    console.error('Error requesting invite code:', error);
    return NextResponse.json(
      { error: 'Failed to submit request' },
      { status: 500 }
    );
  }
}
