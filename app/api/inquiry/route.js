import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '所有字段都是必填的' },
        { status: 400 }
      );
    }

    // In production, save to database
    // await createInquiry({ name, email, subject, message });

    console.log('Inquiry received:', { name, email, subject });

    return NextResponse.json({
      success: true,
      message: '咨询已提交，我们会在 24 小时内回复您'
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: '提交失败，请重试' },
      { status: 500 }
    );
  }
}
