import { supabase } from "@/integrations/supabase/client";

export type LibraryItemType = "pdf" | "heyzine" | "link";

export interface LibraryItem {
  id: string;
  title: string;
  description: string | null;
  item_type: LibraryItemType;
  url: string;
  cover_url: string | null;
  is_paid: boolean;
  price_cents: number | null;
  sort_order: number;
  published: boolean;
  created_at: string;
}

export async function fetchLibraryItems(includeUnpublished = false): Promise<LibraryItem[]> {
  let q = supabase.from("library_items").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
  if (!includeUnpublished) q = q.eq("published", true);
  const { data, error } = await q;
  if (error) throw error;
  const items = (data ?? []) as LibraryItem[];
  await Promise.all(items.map(async (item) => {
    if (item.cover_url) {
      const path = extractStoragePath(item.cover_url);
      if (path) {
        const { data: signed } = await supabase.storage.from("library").createSignedUrl(path, 60 * 60 * 6);
        if (signed?.signedUrl) item.cover_url = signed.signedUrl;
      }
    }
  }));
  return items;
}

export async function fetchLibraryItem(id: string): Promise<LibraryItem | null> {
  const { data, error } = await supabase.from("library_items").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const item = data as LibraryItem;
  // For PDFs stored in our private bucket, sign the URL so the browser can fetch it
  if (item.item_type === "pdf" && item.url.includes("/storage/v1/object/")) {
    const path = extractStoragePath(item.url);
    if (path) {
      const { data: signed } = await supabase.storage.from("library").createSignedUrl(path, 60 * 60 * 6);
      if (signed?.signedUrl) item.url = signed.signedUrl;
    }
  }
  if (item.cover_url) {
    const path = extractStoragePath(item.cover_url);
    if (path) {
      const { data: signed } = await supabase.storage.from("library").createSignedUrl(path, 60 * 60 * 6);
      if (signed?.signedUrl) item.cover_url = signed.signedUrl;
    }
  }
  return item;
}

function extractStoragePath(url: string): string | null {
  const m = url.match(/\/storage\/v1\/object\/(?:public|sign)\/library\/(.+?)(?:\?|$)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export async function checkIsAdmin(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data, error } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
  if (error) {
    console.error("[checkIsAdmin] has_role RPC error:", error);
    return false;
  }
  return data === true;
}
