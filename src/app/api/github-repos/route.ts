import { NextResponse } from 'next/server';
import { GITHUB_ORG, GITHUB_REPOS } from '../../../content/config';

interface RepoInfo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  updatedAt: string;
  url: string;
}

export async function GET() {
  try {
    const results = await Promise.allSettled(
      GITHUB_REPOS.map(async (repo): Promise<RepoInfo> => {
        const res = await fetch(`https://api.github.com/repos/${GITHUB_ORG}/${repo}`, {
          headers: {
            Accept: 'application/vnd.github+json',
            'User-Agent': 'gstd-web (+https://gstdtoken.com)',
          },
          next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error(`GitHub API ${res.status} for ${repo}`);
        const data = await res.json();
        return {
          name: data.name,
          description: data.description,
          language: data.language,
          stars: data.stargazers_count ?? 0,
          updatedAt: data.pushed_at ?? data.updated_at,
          url: data.html_url,
        };
      })
    );

    const repos = results
      .filter((r): r is PromiseFulfilledResult<RepoInfo> => r.status === 'fulfilled')
      .map((r) => r.value);

    return NextResponse.json({ success: true, repos });
  } catch (error) {
    return NextResponse.json(
      { success: false, repos: [], error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 200 }
    );
  }
}
