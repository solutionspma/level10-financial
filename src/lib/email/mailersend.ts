import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

const fromEmail = process.env.MAIL_FROM_ADDRESS || 'noreply@level10.financial';
const fromName = 'Level 10 Financial';

export async function sendVerificationEmail(email: string, verificationToken: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;

  const sentFrom = new Sender(fromEmail, fromName);
  const recipients = [new Recipient(email, email)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject('Verify Your Level 10 Financial Account')
    .setHtml(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #22c55e;">Welcome to Level 10 Financial</h1>
        <p style="font-size: 16px; color: #333;">Thanks for signing up! Please verify your email address to get started.</p>
        <div style="margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background: #22c55e; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p style="font-size: 14px; color: #666;">
          Or copy and paste this link into your browser:<br/>
          <a href="${verificationUrl}" style="color: #22c55e;">${verificationUrl}</a>
        </p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;"/>
        <p style="font-size: 12px; color: #999;">
          If you didn't create this account, you can safely ignore this email.
        </p>
      </div>
    `)
    .setText(`Welcome to Level 10 Financial! Please verify your email by visiting: ${verificationUrl}`);

  try {
    await mailerSend.email.send(emailParams);
    return { success: true };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string, firstName: string) {
  const sentFrom = new Sender(fromEmail, fromName);
  const recipients = [new Recipient(email, firstName)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject('Welcome to Level 10 Financial — Your Bankability Journey Starts Here')
    .setHtml(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #22c55e;">Welcome, ${firstName}!</h1>
        <p style="font-size: 16px; color: #333;">
          You're now part of the Level 10 Financial community. We're here to help you become bankable — on purpose.
        </p>
        <div style="background: #f9f9f9; border-left: 4px solid #22c55e; padding: 16px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">What Happens Next</h3>
          <ol style="color: #666; line-height: 1.8;">
            <li>Complete your profile setup</li>
            <li>Authorize credit analysis</li>
            <li>Get your personalized roadmap</li>
            <li>Connect with approved lenders</li>
          </ol>
        </div>
        <div style="margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
             style="background: #22c55e; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Go to Dashboard
          </a>
        </div>
        <p style="font-size: 14px; color: #666;">
          We don't sell hope. We surface requirements. No more guessing. No more silence.
        </p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;"/>
        <p style="font-size: 12px; color: #999;">
          Questions? Reply to this email or visit our <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact" style="color: #22c55e;">contact page</a>.
        </p>
      </div>
    `)
    .setText(`Welcome to Level 10 Financial, ${firstName}! Your bankability journey starts here. Visit ${process.env.NEXT_PUBLIC_APP_URL}/dashboard to get started.`);

  try {
    await mailerSend.email.send(emailParams);
    return { success: true };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}

export async function sendWaitlistEmail(email: string) {
  const sentFrom = new Sender(fromEmail, fromName);
  const recipients = [new Recipient(email, email)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("You're on the Waitlist — Early Access to Level 10 Financial")
    .setHtml(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #22c55e;">You're In!</h1>
        <p style="font-size: 16px; color: #333;">
          Thanks for your interest in Level 10 Financial. You're on our early access waitlist.
        </p>
        <div style="background: #f9f9f9; border-left: 4px solid #22c55e; padding: 16px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">What to Expect</h3>
          <p style="color: #666; margin: 0;">
            Our full bankability engine goes live January 12, 2025. You'll receive an email with access instructions 
            and your personalized onboarding link. 
          </p>
        </div>
        <p style="font-size: 14px; color: #666;">
          In the meantime, you can explore the platform and learn more about our process.
        </p>
        <div style="margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/how-it-works" 
             style="background: #22c55e; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            How It Works
          </a>
        </div>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;"/>
        <p style="font-size: 12px; color: #999;">
          Waitlist position is first-come, first-served. You'll hear from us very soon.
        </p>
      </div>
    `)
    .setText(`You're on the waitlist for Level 10 Financial. Our full bankability engine goes live January 12, 2025. Visit ${process.env.NEXT_PUBLIC_APP_URL}/how-it-works to learn more.`);

  try {
    await mailerSend.email.send(emailParams);
    return { success: true };
  } catch (error) {
    console.error('Failed to send waitlist email:', error);
    return { success: false, error };
  }
}
