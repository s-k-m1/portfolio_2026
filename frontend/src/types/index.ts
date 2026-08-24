export interface Profile {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  github: string;
  linkedin: string;
  portfolio_url: string;
  portfolio_description: string;
  role: string;
  tagline: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  tech: string;
  image: string | null;
  image_url: string;
  github: string;
  demo: string;
  client_name: string;
  client_role: string;
  client_review: string;
  client_rating: number | null;
}

export interface ProjectDetailed extends Project {
  created_at: string;
  updated_at: string;
}

export interface ProjectReview {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string | null;
}

export interface Service {
  id: number;
  title: string;
  category: string;
  description: string;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date: string | null;
  image: string | null;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string;
  category: string;
  content: string;
  image: string | null;
  image_url: string;
  video_url: string;
  created_at: string;
}

export interface BlogTag {
  id: number;
  name: string;
}

export interface BlogPostTag {
  id: number;
  post: number;
  tag: number;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  percentage: number;
  display_order: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export type InquiryStatus = "new" | "replied" | "closed";

export interface InquiryReply {
  id: number;
  message: string;
  sent_by: string;
  created_at: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  read: boolean;
  ip_address: string | null;
  created_at: string;
  updated_at: string;
  replies: InquiryReply[];
}

export interface ContentBlock {
  key: string;
  content: string;
}

export interface DashboardStats {
  total_projects: number;
  total_experiences: number;
  total_education: number;
  total_services: number;
  total_certifications: number;
  total_blog_posts: number;
  total_messages: number;
  total_skills: number;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}