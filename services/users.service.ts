/**
 * Users service - Supabase data access layer
 */

import { supabase } from '@/lib/supabase';
import type { User, UserFormData } from '@/types';

export const usersService = {
    /**
     * Fetch all users ordered by creation date
     */
    async getAll(): Promise<User[]> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    /**
     * Create a new user with Supabase Auth + profile (using server-side API for auto-confirm)
     */
    async create(formData: UserFormData): Promise<{ success: boolean; error?: string }> {
        try {
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.error || 'Error al crear usuario' };
            }

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error de conexión',
            };
        }
    },

    /**
     * Update an existing user profile
     */
    async update(userId: string, formData: Partial<UserFormData>): Promise<void> {
        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: formData.full_name,
                role: formData.role,
                phone: formData.phone || null,
                is_active: formData.is_active,
            })
            .eq('id', userId);

        if (error) throw error;
    },

    /**
     * Toggle user active status
     */
    async toggleActive(user: User): Promise<void> {
        const { error } = await supabase
            .from('profiles')
            .update({ is_active: !user.is_active })
            .eq('id', user.id);

        if (error) throw error;
    },
};
