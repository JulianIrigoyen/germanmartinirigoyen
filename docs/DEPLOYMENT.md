# Deployment

## Infrastructure

| Service   | Purpose          | Account             |
|-----------|------------------|----------------------|
| GitHub    | Source control    | JulianIrigoyen       |
| Vercel    | Hosting/CDN       | julianirigoyens-projects |

**Repo**: https://github.com/JulianIrigoyen/germanmartinirigoyen
**Live**: https://german-site-eight.vercel.app

## Auto-Deploy

The Vercel project is connected to the GitHub repo. Every push to `master` triggers an automatic production deployment. No manual deploy step needed.

## Custom Domain

To connect `germanmartinirigoyen.com`:

1. Go to https://vercel.com/julianirigoyens-projects/german-site/settings/domains
2. Add `germanmartinirigoyen.com`
3. Configure DNS at your registrar:
   - **Option A** (recommended): CNAME record pointing to `cname.vercel-dns.com`
   - **Option B**: A record pointing to `76.76.21.21`
4. Vercel auto-provisions SSL certificate

Also add `www.germanmartinirigoyen.com` → redirects to apex domain.

## Local Development

```bash
cd clients/german
npm install
npm run dev        # http://localhost:3000
```

## Build & Deploy Manually

```bash
npm run build      # Verify build passes
git add -A
git commit -m "description of changes"
git push origin master   # Triggers Vercel deploy
```

## Build Output

The site generates ~21 static pages:

```
Route (app)                    Size    First Load JS
┌ ○ /                         119 B   105 kB
├ ○ /_not-found               998 B   103 kB
├ ○ /about                    119 B   105 kB
├ ○ /exhibitions              119 B   105 kB
├ ○ /works                    3.01 kB 114 kB
└ ● /works/[id]               2.19 kB 113 kB
    ├ /works/s1-01
    ├ /works/s1-02
    └ ... (14 artwork pages total)
```

Shared JS: ~102 kB (includes React + Next.js runtime)

## Environment Variables

None required. The site is fully static with no external services.

If future features need env vars (e.g., analytics, CMS), add them in:
- Vercel dashboard → Settings → Environment Variables
- Local `.env.local` file (gitignored)

## Vercel Project Settings

- **Framework**: Next.js (auto-detected)
- **Build Command**: `next build`
- **Output Directory**: Next.js default (`.next`)
- **Node.js Version**: 20.x
