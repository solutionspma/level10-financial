import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        details: 'Failed to query Supabase'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connected successfully!',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      details: 'Supabase configuration error'
    }, { status: 500 });
  }
}
