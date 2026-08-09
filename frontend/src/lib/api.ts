import type {
  BlogPost,
  Certification,
  ContentBlock,
  Education,
  Experience,
  Paginated,
  Profile,
  Project,
  Service,
  Skill,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

const REVALIDATE = 3600;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  init?: RequestInit,
  options?: { cache?: RequestCache; revalidate?: number },
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    next: { revalidate: options?.revalidate ?? REVALIDATE },
    ...(options?.cache ? { cache: options.cache } : {}),
  });

  if (!res.ok) {
    throw new ApiError(`API error ${res.status}: ${res.statusText}`, res.status);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

async function list<T>(path: string): Promise<T[]> {
  const data = await request<Paginated<T>>(path);
  return data.results ?? [];
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const profiles = await list<Profile>("/profiles/");
    return profiles[0] ?? null;
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    return await list<Project>("/projects/");
  } catch {
    return [];
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    return await request<Project>(`/projects/${id}/`);
  } catch {
    return null;
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    return await list<Skill>("/skills/");
  } catch {
    return [];
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    return await list<Experience>("/experiences/");
  } catch {
    return [];
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    return await list<Education>("/educations/");
  } catch {
    return [];
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    return await list<Service>("/services/");
  } catch {
    return [];
  }
}

export async function getCertifications(): Promise<Certification[]> {
  try {
    return await list<Certification>("/certifications/");
  } catch {
    return [];
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await list<BlogPost>("/blog-posts/");
  } catch {
    return [];
  }
}

export async function getContentBlocks(): Promise<Record<string, string>> {
  try {
    const blocks = await list<ContentBlock>("/content-blocks/");
    return Object.fromEntries(blocks.map((b) => [b.key, b.content]));
  } catch {
    return {};
  }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    return await request<BlogPost>(`/blog-posts/${id}/`);
  } catch {
    return null;
  }
}

export async function sendContactMessage(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ detail: string }> {
  return request<{ detail: string }>("/contact-form/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}