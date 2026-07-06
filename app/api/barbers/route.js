
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';


export async function GET() {
    const supabase = createClient();


    const {data, error} = await supabase
    .from('barbers')
    .select('id, name, photo_url');

    if(error){
        return NextResponse.json( {error: error.message }, {status: 500});
    }

    return NextResponse.json(data)
}