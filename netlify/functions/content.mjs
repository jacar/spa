import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const corsHeaders = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export const handler = async (event) => {
    // Diagnóstico de variables de entorno
    if (!supabaseUrl || !supabaseKey) {
        return {
            statusCode: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                error: 'Missing env vars',
                hasUrl: !!supabaseUrl,
                hasKey: !!supabaseKey
            })
        };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders, body: '' };
    }

    if (event.httpMethod === 'GET') {
        try {
            const { data, error } = await supabase
                .from('app_config')
                .select('value')
                .eq('key', 'site_content')
                .single();

            if (error) throw error;

            return {
                statusCode: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                body: JSON.stringify(data ? data.value : {})
            };
        } catch (err) {
            console.error('GET error:', err.message);
            return {
                statusCode: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: err.message })
            };
        }
    }

    if (event.httpMethod === 'POST') {
        try {
            const newContent = JSON.parse(event.body);
            const { error } = await supabase
                .from('app_config')
                .upsert({ key: 'site_content', value: newContent }, { onConflict: 'key' });

            if (error) throw error;

            return {
                statusCode: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: 'Saved to Supabase' })
            };
        } catch (err) {
            console.error('POST error:', err.message);
            return {
                statusCode: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: err.message })
            };
        }
    }

    return {
        statusCode: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Method not allowed' })
    };
};
