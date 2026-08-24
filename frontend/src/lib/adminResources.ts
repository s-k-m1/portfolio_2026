export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "date"
  | "select"
  | "file";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  full?: boolean;
  help?: string;
}

export interface ResourceDef {
  key: string;
  label: string;
  titleField: string;
  subtitleField?: string;
  fields: FieldDef[];
  disableCreate?: boolean;
}

export const ADMIN_RESOURCES: ResourceDef[] = [
  {
    key: "profiles",
    label: "Profile",
    titleField: "full_name",
    subtitleField: "role",
    disableCreate: true,
    fields: [
      { name: "role", label: "Role", type: "text", full: true },
      { name: "tagline", label: "Tagline", type: "text", full: true },
      { name: "phone", label: "Phone", type: "text" },
      { name: "address", label: "Address", type: "text", full: true },
      { name: "github", label: "GitHub URL", type: "text" },
      { name: "linkedin", label: "LinkedIn URL", type: "text" },
      { name: "portfolio_url", label: "Portfolio URL", type: "text" },
      {
        name: "portfolio_description",
        label: "Portfolio Description",
        type: "textarea",
        full: true,
      },
    ],
  },
  {
    key: "projects",
    label: "Projects",
    titleField: "title",
    subtitleField: "category",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, full: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: [
          { value: "Frontend", label: "Frontend" },
          { value: "Backend", label: "Backend" },
          { value: "Full Stack", label: "Full Stack" },
          { value: "Security", label: "Security" },
          { value: "DevOps", label: "DevOps" },
          { value: "Mobile", label: "Mobile" },
        ],
      },
      { name: "desc", label: "Description", type: "textarea", full: true },
      { name: "tech", label: "Tech (pipe-separated)", type: "text", full: true },
      { name: "github", label: "GitHub URL", type: "text" },
      { name: "demo", label: "Demo URL", type: "text" },
      { name: "image_url", label: "Image URL", type: "text", full: true },
      {
        name: "image",
        label: "Image Upload",
        type: "file",
        help: "Optional. Overrides Image URL when set.",
      },
      { name: "client_name", label: "Client Name", type: "text", full: true },
      { name: "client_role", label: "Client Role / Company", type: "text", full: true },
      {
        name: "client_rating",
        label: "Client Rating (stars)",
        type: "select",
        options: [
          { value: "5", label: "5 ★★★★★" },
          { value: "4", label: "4 ★★★★" },
          { value: "3", label: "3 ★★★" },
          { value: "2", label: "2 ★★" },
          { value: "1", label: "1 ★" },
        ],
      },
      {
        name: "client_review",
        label: "Client Review",
        type: "textarea",
        full: true,
      },
    ],
  },
  {
    key: "blog-posts",
    label: "Blog Posts",
    titleField: "title",
    subtitleField: "category",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, full: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "author", label: "Author", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: [
          { value: "News", label: "News" },
          { value: "Tutorial", label: "Tutorial" },
          { value: "Case Study", label: "Case Study" },
        ],
      },
      { name: "content", label: "Content", type: "textarea", full: true },
      { name: "image_url", label: "Image URL", type: "text", full: true },
      { name: "video_url", label: "Video URL", type: "text" },
      {
        name: "image",
        label: "Image Upload",
        type: "file",
        help: "Optional. Overrides Image URL when set.",
      },
    ],
  },
  {
    key: "skills",
    label: "Skills",
    titleField: "name",
    subtitleField: "category",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, full: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: [
          { value: "Frontend", label: "Frontend" },
          { value: "Backend", label: "Backend" },
          { value: "Tools", label: "Tools & Languages" },
        ],
      },
      { name: "percentage", label: "Percentage", type: "number" },
      { name: "display_order", label: "Display Order", type: "number" },
    ],
  },
  {
    key: "experiences",
    label: "Experience",
    titleField: "title",
    subtitleField: "company",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, full: true },
      { name: "company", label: "Company", type: "text", required: true },
      { name: "location", label: "Location", type: "text" },
      { name: "start_date", label: "Start Date", type: "date", required: true },
      { name: "end_date", label: "End Date", type: "date" },
      { name: "is_current", label: "Current Role", type: "checkbox" },
      { name: "description", label: "Description", type: "textarea", full: true },
    ],
  },
  {
    key: "educations",
    label: "Education",
    titleField: "degree",
    subtitleField: "institution",
    fields: [
      { name: "institution", label: "Institution", type: "text", required: true, full: true },
      { name: "degree", label: "Degree", type: "text", required: true, full: true },
      { name: "field", label: "Field", type: "text" },
      { name: "start_date", label: "Start Date", type: "date", required: true },
      { name: "end_date", label: "End Date", type: "date" },
    ],
  },
  {
    key: "services",
    label: "Services",
    titleField: "title",
    subtitleField: "category",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, full: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: [
          { value: "Development", label: "Development" },
          { value: "Consulting", label: "Consulting" },
          { value: "Management", label: "Management" },
          { value: "Training", label: "Training" },
          { value: "Design", label: "Design" },
        ],
      },
      { name: "description", label: "Description", type: "textarea", full: true },
    ],
  },
  {
    key: "certifications",
    label: "Certifications",
    titleField: "title",
    subtitleField: "issuer",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, full: true },
      { name: "issuer", label: "Issuer", type: "text", required: true },
      { name: "issue_date", label: "Issue Date", type: "date", required: true },
      { name: "expiry_date", label: "Expiry Date", type: "date" },
      {
        name: "image",
        label: "Image Upload",
        type: "file",
        help: "Optional.",
      },
    ],
  },
  {
    key: "content-blocks",
    label: "Content Blocks",
    titleField: "key",
    subtitleField: "content",
    fields: [
      { name: "key", label: "Key", type: "text", required: true, full: true },
      { name: "content", label: "Content", type: "textarea", full: true },
    ],
  },
  {
    key: "project-reviews",
    label: "Project Reviews",
    titleField: "name",
    subtitleField: "comment",
    fields: [
      { name: "project", label: "Project ID", type: "number", required: true },
      { name: "name", label: "Name", type: "text", required: true, full: true },
      { name: "email", label: "Email", type: "text" },
      {
        name: "rating",
        label: "Rating (1-5)",
        type: "number",
        required: true,
      },
      { name: "comment", label: "Comment", type: "textarea", full: true },
      {
        name: "approved",
        label: "Approved (visible publicly)",
        type: "checkbox",
      },
    ],
  },
];
