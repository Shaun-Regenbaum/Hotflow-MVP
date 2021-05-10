import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xrrsefhfqueyquewoqym.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDM0MDMwMSwiZXhwIjoxOTM1OTE2MzAxfQ.llywRLnofuzJuSmobRrSco7Z8zV6ws32PB7oqsqOoVg';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
