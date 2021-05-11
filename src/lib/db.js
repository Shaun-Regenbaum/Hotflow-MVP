import { createClient } from '@supabase/supabase-js'



const url = "https://xrrsefhfqueyquewoqym.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDM0MDMwMSwiZXhwIjoxOTM1OTE2MzAxfQ.llywRLnofuzJuSmobRrSco7Z8zV6ws32PB7oqsqOoVg";
console.log(url, key)

const supabase = createClient(String(url)
  , String(key) 
)

export default supabase