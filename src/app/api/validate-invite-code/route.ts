import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Invalid invite code' },
        { status: 400 }
      );
    }

    // Check if invite code exists and is valid
    const { data: inviteCode, error } = await supabase
      .from('lender_invite_codes')
      .select('*')
      .eq('code', code.trim().toUpperCase())
      .single();

    if (error || !inviteCode) {
      return NextResponse.json(
        { error: 'Invalid invite code', valid: false },
        { status: 404 }
      );
    }

    // Check if code is active
    if (!inviteCode.is_active) {
      return NextResponse.json(
        { error: 'This invite code is no longer active', valid: false },
        { status: 400 }
      );
    }

    // Check if code has expired
    if (inviteCode.expires_at && new Date(inviteCode.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'This invite code has expired', valid: false },
        { status: 400 }
      );
    }

    // Check if code has reached max uses
    if (inviteCode.max_uses && inviteCode.current_uses >= inviteCode.max_uses) {
      return NextResponse.json(
        { error: 'This invite code has reached its maximum uses', valid: false },
        { status: 400 }
      );
    }

    // Code is valid
    return NextResponse.json({
      valid: true,
      code: inviteCode.code,
      message: 'Valid invite code'
    });

  } catch (error) {
    console.error('Error validating invite code:', error);
    return NextResponse.json(
      { error: 'Failed to validate invite code', valid: false },
      { status: 500 }
    );
  }
}
