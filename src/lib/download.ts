/**
 * Centralized APK download configuration — the single source of truth for
 * every "Download App" CTA on the landing page.
 *
 * The Android app lives in a separate repository
 * (https://github.com/rahulb477/Name-jap) and is published by its own
 * GitHub Actions workflow: every build creates a new GitHub Release and
 * attaches the debug APK as a release asset. The workflow names each asset
 * `<repo-name>-debug-build-<run-number>.apk` (e.g. Name-jap-debug-build-4.apk),
 * so the asset filename of the latest release changes with every build.
 *
 * To always download the APK from the latest release without hard-coding a
 * build number:
 *   1. On click we resolve the latest release's .apk asset through the
 *      public GitHub API (cached for the session) and navigate straight to
 *      that asset URL — the browser starts the download directly, the
 *      GitHub Releases page is never opened.
 *   2. If the API cannot be reached, we fall back to the stable
 *      `releases/latest/download` URL below.
 */

/** Public GitHub API endpoint for the latest release of the Android app. */
export const APK_LATEST_RELEASE_API =
  "https://api.github.com/repos/rahulb477/Name-jap/releases/latest";

/**
 * Stable latest-release asset URL. Used as the anchor `href` (so the link
 * still works without JavaScript) and as the fallback when the API lookup
 * fails.
 */
export const APK_DOWNLOAD_URL =
  "https://github.com/rahulb477/Name-jap/releases/latest/download/Name-jap.apk";

type ReleaseAsset = { name: string; browser_download_url: string };
type LatestRelease = { assets?: ReleaseAsset[] };

let cachedUrl: string | null = null;
let inflight: Promise<string | null> | null = null;

async function fetchLatestApkUrl(): Promise<string | null> {
  try {
    const response = await fetch(APK_LATEST_RELEASE_API, {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return null;
    const release = (await response.json()) as LatestRelease;
    const assets = release.assets ?? [];
    const apk =
      assets.find((asset) => asset.name === "Name-jap.apk") ??
      assets.find((asset) => asset.name.toLowerCase().endsWith(".apk"));
    return apk?.browser_download_url ?? null;
  } catch {
    return null;
  }
}

/**
 * Resolves the direct download URL of the latest release APK (cached for
 * the session). Returns null when the latest release asset cannot be
 * resolved.
 */
export function getLatestApkUrl(): Promise<string | null> {
  if (cachedUrl) return Promise.resolve(cachedUrl);
  if (!inflight) {
    inflight = fetchLatestApkUrl().then((url) => {
      if (url) cachedUrl = url;
      inflight = null;
      return url;
    });
  }
  return inflight;
}

/**
 * Click handler for every "Download App" CTA. Navigates directly to the
 * latest release APK so the browser starts the download immediately.
 */
export async function downloadApk(): Promise<void> {
  const url = (await getLatestApkUrl()) ?? APK_DOWNLOAD_URL;
  window.location.assign(url);
}

// Warm the cache shortly after load so the first click navigates instantly.
if (typeof window !== "undefined") {
  void getLatestApkUrl();
}
