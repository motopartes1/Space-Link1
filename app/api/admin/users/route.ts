import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Initialize admin client strictly inside the file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export async function POST(request: NextRequest) {
    try {
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        // Manual validation to avoid Zod crash
        const { email, password, full_name, role = 'counter', phone, is_active = true } = body;

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
        }
        if (!password || typeof password !== 'string' || password.length < 6) {
            return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 });
        }
        if (!full_name || typeof full_name !== 'string' || full_name.length < 3) {
            return NextResponse.json({ error: 'El nombre debe tener al menos 3 caracteres' }, { status: 400 });
        }

        // Check keys at runtime only
        if (!supabaseUrl || !supabaseServiceRoleKey) {
            console.error('Missing Supabase credentials');
            return NextResponse.json(
                { error: 'Error de configuración del servidor (Missing Keys)' },
                { status: 500 }
            );
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

        // 1. Create user in Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true,
            user_metadata: {
                full_name: full_name,
            }
        });

        if (authError) {
            console.error('Auth create error:', authError);
            return NextResponse.json(
                { error: authError.message },
                { status: 400 }
            );
        }

        if (!authData.user) {
            return NextResponse.json(
                { error: 'No se pudo crear el usuario' },
                { status: 500 }
            );
        }

        // 2. Create/Update profile
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .upsert({
                id: authData.user.id,
                email: email,
                full_name: full_name,
                role: role,
                phone: phone || null,
                is_active: is_active,
            });

        if (profileError) {
            console.error('Profile create error:', profileError);
            return NextResponse.json(
                { error: 'Usuario creado pero falló perfil: ' + profileError.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: authData.user.id,
                email: email,
                full_name: full_name
            }
        });

    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
