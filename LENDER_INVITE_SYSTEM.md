# Lender Invite Code System

## Overview
Built a comprehensive invite code system to gate lender signups. Lenders must now enter a valid invite code to access the signup process, or they can request an invite code if they don't have one.

## Features Implemented

### 1. Invite Code Validation Flow
- **Entry Gate**: Lenders see an invite code screen before accessing signup
- **Validation**: Real-time API validation of invite codes
- **Smart Input**: Auto-uppercase formatting, clear error messages
- **Request Option**: Easy link to request an invite code if they don't have one

### 2. Invite Code Request System
- **Request Form**: Captures name, email, phone, company, and message
- **Duplicate Prevention**: Checks for existing pending/approved requests
- **Success Confirmation**: Shows confirmation message after submission
- **Admin Review**: All requests go to admin for approval

### 3. Database Tables Created
```sql
-- Stores invite codes with usage tracking
lender_invite_codes
  - code (unique)
  - max_uses
  - current_uses
  - is_active
  - expires_at
  - notes
  
-- Tracks invite requests from potential lenders
lender_invite_requests
  - name, email, phone, company
  - message
  - status (pending/approved/rejected)
  - reviewed_at, reviewed_by
  
-- Tracks which user used which code
lender_invite_usage
  - invite_code_id
  - user_id
  - used_at
```

### 4. API Endpoints
- `/api/validate-invite-code` - POST endpoint to validate codes
  - Checks if code exists
  - Validates active status
  - Checks expiration date
  - Verifies usage limits
  
- `/api/request-invite-code` - POST endpoint for requests
  - Creates new invite request
  - Prevents duplicate requests
  - Sets status to 'pending'

### 5. Admin Management Page
**Located at**: `/admin/invites`

**Features**:
- Create new invite codes with custom max uses and notes
- View all codes with usage stats
- Activate/deactivate codes
- View all invite requests (pending, approved, rejected)
- Approve or reject requests with one click
- Filter requests by status

### 6. Pre-seeded Invite Codes
The migration creates three initial codes:
- `LENDER2026` - 100 uses (general launch code)
- `FOUNDING` - 25 uses (founding lender exclusive)
- `PARTNER50` - 50 uses (partner network code)

## User Flow

### For Lenders With Code:
1. Click "For Lenders" in header → goes to `/lender/signup`
2. See invite code entry screen
3. Enter code (e.g., `LENDER2026`)
4. Code is validated via API
5. If valid, proceed to signup form
6. Complete signup → review agreement → account created
7. Code usage is tracked with user record

### For Lenders Without Code:
1. Click "For Lenders" → see invite code screen
2. Click "Don't have an invite code? Request one"
3. Fill out request form (name, email, company, message)
4. Submit request
5. See confirmation message
6. Admin reviews and approves/rejects
7. Approved users receive invite code via email (TODO)

### For Admins:
1. Go to `/admin/invites`
2. View two tabs: Invite Codes & Invite Requests
3. **Codes Tab**: Create new codes, view usage stats, activate/deactivate
4. **Requests Tab**: Review pending requests, approve/reject with one click

## Files Modified

### New Files Created:
- `src/app/lender/signup/page.tsx` - Updated with 3-step flow (invite/request/form)
- `src/app/api/validate-invite-code/route.ts` - Code validation endpoint
- `src/app/api/request-invite-code/route.ts` - Request submission endpoint
- `src/app/admin/invites/page.tsx` - Admin management interface
- `supabase/migrations/20260111_lender_invite_codes.sql` - Database schema

### Files Modified:
- `src/components/Header.tsx` - Changed "For Lenders" link from `/lenders` to `/lender/signup`
- `src/app/lender/agreement/page.tsx` - Added invite code tracking when account created

## Next Steps (Optional Enhancements)

1. **Email Integration**:
   - Send invite code to approved requesters
   - Send confirmation emails on request submission
   - Notify admin of new requests

2. **Analytics**:
   - Track conversion rates by invite code
   - See which codes are most effective
   - Dashboard for invite code performance

3. **Expiration**:
   - Set expiration dates on codes
   - Auto-deactivate expired codes
   - Send reminders before expiration

4. **Bulk Actions**:
   - Bulk approve/reject requests
   - Bulk create codes from CSV
   - Export usage reports

## Testing

To test the system:

1. **Run the migration**:
   ```sql
   -- In Supabase SQL Editor, run:
   supabase/migrations/20260111_lender_invite_codes.sql
   ```

2. **Test invite code flow**:
   - Go to the site
   - Click "For Lenders"
   - Try code: `LENDER2026`
   - Should proceed to signup form

3. **Test request flow**:
   - Click "Don't have an invite code?"
   - Fill out request form
   - Check admin panel for new request

4. **Test admin panel**:
   - Login as admin
   - Go to `/admin/invites`
   - Create a new code
   - Approve/reject requests

## Security Notes

- All invite codes stored in uppercase
- Usage limits enforced at validation
- Expired codes automatically rejected
- Duplicate request prevention
- Admin-only management interface
- RLS policies should be added to tables (TODO)

## Marketing Use Cases

**General Launch**: Use `LENDER2026` for broad marketing campaigns

**Exclusive Partners**: Create custom codes like `ACMEBANK` for individual institutions

**Events**: Create time-limited codes for conferences/webinars

**Referrals**: Create single-use codes for referred lenders

**Testing**: Create unlimited-use test codes for demos
