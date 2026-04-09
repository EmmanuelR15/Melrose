import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

console.log("📡 Inicializando cliente Supabase...");
console.log(
  "URL:",
  supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : "undefined",
);
console.log(
  "KEY:",
  supabaseKey ? `${supabaseKey.substring(0, 20)}...` : "undefined",
);

export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

if (supabase) {
  console.log("✅ Cliente Supabase creado exitosamente");
} else {
  console.error(
    "❌ No se pudo crear cliente Supabase - faltan variables de entorno",
  );
}
