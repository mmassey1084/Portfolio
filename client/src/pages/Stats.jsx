import { useEffect, useMemo, useState } from "react";
import TopNavigation from "../components/TopNavigation";

const githubUsername = "mmassey1084";
const API_BASE =
  import.meta.env.VITE_API_BASE || "https://d2q0p23f4rwhce.cloudfront.net";



async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || `Request failed (${response.status})`);
  }
  return text ? JSON.parse(text) : null;
}

export default function Stats() {
  const [githubProfile, setGithubProfile] = useState(null);
  const [analytics, setAnalytics] = useState({ views: 0, likes: 0 });
  const [errorMessage, setErrorMessage] = useState("");

  // localStorage flag for like toggle
  const likeStorageKey = useMemo(() => `portfolio_liked_${githubUsername}`, []);
  const [hasLiked, setHasLiked] = useState(() => localStorage.getItem(likeStorageKey) === "true");

  useEffect(() => {
    (async () => {
      try {
        const profile = await fetchJson(`https://api.github.com/users/${githubUsername}`);
        setGithubProfile(profile);
      } catch (error) {
        setErrorMessage("Failed to load GitHub data.");
      }
    })();
  }, []);

  // Load analytics totals
  useEffect(() => {
    (async () => {
      try {
        const stats = await fetchJson(`${API_BASE}/api/analytics/stats`);
        if (stats) setAnalytics(stats);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Increment views once per session
  useEffect(() => {
  const sessionKey = `portfolio_viewed_${githubUsername}`;
  const alreadyCounted = sessionStorage.getItem(sessionKey) === "true";
  if (alreadyCounted) return;

  (async () => {
    try {
      const updated = await fetchJson(`${API_BASE}/api/analytics/view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // ✅ only mark as counted after success
      sessionStorage.setItem(sessionKey, "true");

      if (updated) setAnalytics(updated);
    } catch (error) {
      console.error("Failed to increment view:", error);
      // ✅ don’t set session key on failure, so it can retry next load
      sessionStorage.removeItem(sessionKey);
    }
  })();
}, []);

  async function toggleLike() {
    const nextHasLiked = !hasLiked;
    const delta = nextHasLiked ? 1 : -1;

    // optimistic UI update
    setHasLiked(nextHasLiked);
    localStorage.setItem(likeStorageKey, String(nextHasLiked));
    setAnalytics((prev) => ({ ...prev, likes: Math.max((prev.likes ?? 0) + delta, 0) }));

    try {
      const updated = await fetchJson(`${API_BASE}/api/analytics/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta }),
      });
      if (updated) setAnalytics(updated);
    } catch (error) {
      // rollback if server fails
      console.error(error);
      setHasLiked((prev) => {
        const rolledBack = !prev;
        localStorage.setItem(likeStorageKey, String(rolledBack));
        return rolledBack;
      });
      setAnalytics((prev) => ({ ...prev, likes: prev.likes ?? 0 }));
    }
  }

  return (
    <>
      <TopNavigation />

      <main className="section with-fixed-nav">
        <div className="container">
          <h1 className="h2">GitHub Stats</h1>
          <p className="muted">Live stats pulled from the GitHub API + portfolio analytics.</p>

          {errorMessage ? <p className="muted">{errorMessage}</p> : null}

          {/* analytics row */}
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            <div className="card">
              <div className="muted">Total Views</div>
              <div className="big">{analytics.views}</div>
            </div>

            <div className="card">
              <div className="muted">If you liked my profile, show some love!</div>
              <div className="big">{analytics.likes}</div>

              <button
                type="button"
                className={`btn btn-primary`}
                onClick={toggleLike}
                style={{ marginTop: 12 }}
                aria-pressed={hasLiked}
              >
                {hasLiked ? "♥ Liked" : "♡ Love this portfolio"}
              </button>
            </div>
          </div>

          {githubProfile ? (
            <div className="card" style={{ marginTop: 16 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <img
                  src={githubProfile.avatar_url}
                  alt={`${githubProfile.login} avatar`}
                  width={72}
                  height={72}
                  style={{ borderRadius: 999 }}
                />

                <div>
                  <div style={{ fontWeight: 800, fontSize: 20 }}>
                    {githubProfile.name || githubProfile.login}
                  </div>
                  <div className="muted">{githubProfile.bio || "—"}</div>
                  <div className="muted" style={{ marginTop: 6 }}>
                    @{githubProfile.login}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 16,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 12,
                }}
              >
                <div className="card">
                  <div className="muted">Public Repos</div>
                  <div className="big">{githubProfile.public_repos}</div>
                </div>
                <div className="card">
                  <div className="muted">Followers</div>
                  <div className="big">{githubProfile.followers}</div>
                </div>
                <div className="card card--hireable">
                  <div className="muted">Hireable</div>
                  <div className="big big--stat">{githubProfile.hireable ? "Yes" : "No"}</div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 16,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 12,
                }}
              >
                <div className="card">
                  <div className="muted">Current Company</div>
                  <div className="big big--stat">{githubProfile.company || "—"}</div>
                </div>
                <div className="card">
                  <div className="muted">Location</div>
                  <div className="big big--stat">{githubProfile.location || "—"}</div>
                </div>
                <div className="card">
                  <div className="muted">Following</div>
                  <div className="big">{githubProfile.following}</div>
                </div>
              </div>
            </div>
          ) : (
            <p className="muted" style={{ marginTop: 16 }}>
              Loading GitHub profile…
            </p>
          )}
        </div>
      </main>
    </>
  );
}
