import { createClient } from '@supabase/supabase-js';

import { env } from 'src/constants/env';

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
