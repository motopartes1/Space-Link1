import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceRoleKey) {
    if (process.env.NODE_ENV === 'development') {
        console.warn('Missing Supabase Service Role Key');
    }
}

// Cliente con privilegios de administrador (Service Role)
// IMPORTANTE: Solo usar en el servidor (API Routes), NUNCA en el cliente
const supabaseKey = supabaseServiceRoleKey || 'service-role-key-placeholder';

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

if (!supabaseServiceRoleKey && process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ Supabase Service Role Key is missing. Admin operations will fail.');
}
