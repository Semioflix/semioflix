import 'dotenv/config';
import { createClient } from "@supabase/supabase-js";

export const connection = createClient(String(process.env.API_URL), String(process.env.API_SECRET));