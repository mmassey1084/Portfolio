import express from "express";

const githubRouter = express.Router();

/**
 * Proxy GitHub requests through backend to:
 * - avoid exposing tokens
 * - reduce client-side rate limit issues
 */
githubRouter.get("/profile/:username", async (request, response) => {
  const { username } = request.params;

  const githubResponse = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      "User-Agent": "portfolio-app",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
    }
  });

  if (!githubResponse.ok) {
    return response.status(githubResponse.status).json({ error: "GitHub request failed" });
  }

  const githubUser = await githubResponse.json();

  return response.json({
    username: githubUser.login,
    name: githubUser.name,
    avatarUrl: githubUser.avatar_url,
    publicRepositoryCount: githubUser.public_repos,
    followerCount: githubUser.followers,
    followingCount: githubUser.following,
    hireable: githubUser.hireable,
    company: githubUser.company,
    location: githubUser.location,
    profileUrl: githubUser.html_url
  });
});

export default githubRouter;
