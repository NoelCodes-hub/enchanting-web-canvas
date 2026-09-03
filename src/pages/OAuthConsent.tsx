import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HandHeart, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type AuthDetails = {
  client?: { name?: string };
  redirect_url?: string;
  redirect_to?: string;
} | null;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthDetails>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id in this link.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        // Preserve the FULL consent URL so auth returns the user here.
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await supabase.auth.oauth.approveAuthorization(authorizationId)
      : await supabase.auth.oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <a href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-glow">
            <HandHeart className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="text-3xl font-display font-extrabold gradient-text">PLUSME</span>
        </a>

        <div className="bg-card rounded-3xl shadow-lg border border-border/50 p-8 text-center">
          {error ? (
            <>
              <h1 className="text-xl font-display font-bold text-foreground mb-2">
                Could not load this authorization request
              </h1>
              <p className="text-sm text-muted-foreground">{error}</p>
            </>
          ) : !details ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading authorization request…</p>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-display font-bold text-foreground mb-2">
                Connect {details.client?.name ?? "an app"} to your PLUSME account
              </h1>
              <p className="text-sm text-muted-foreground mb-6">
                This lets {details.client?.name ?? "the client"} use PLUSME as you — reading your
                profile and the disability inclusion knowledge base.
              </p>
              <div className="flex gap-3">
                <Button className="flex-1" size="lg" disabled={busy} onClick={() => decide(true)}>
                  Approve
                </Button>
                <Button
                  className="flex-1"
                  size="lg"
                  variant="outline"
                  disabled={busy}
                  onClick={() => decide(false)}
                >
                  Deny
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
