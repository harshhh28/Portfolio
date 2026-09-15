// Experience Types
export interface Experience {
  id: string;
  title: string;
  organization: string;
  organizationUrl: string | null;
  duration: string;
  location: string;
  description: string;
  highlights?: string[];
  /** Optional related links (e.g. merged PR); shown only when set */
  links?: { label: string; url: string }[];
}

// Community & Leadership Types
export interface Event {
  name: string;
  url: string;
}

export interface Position {
  id: string;
  title: string;
  organization: string;
  organizationUrl: string | null;
  duration: string;
  description: string;
  events?: Event[] | null;
}

// Projects Types
export interface Project {
  title: string;
  description: string;
  github: string;
  demo: string;
  /** Label for the demo link when it isn't a live running product (e.g. a video walkthrough). Defaults to "Live". */
  demoLabel?: string;
  tags: string[];
}

// Blog Types
export interface BlogPost {
  title: string;
  subtitle?: string;
  slug: string;
  dateAdded: string;
  readTimeInMinutes: number;
  tags?: string[];
}

// Education Types
export interface Education {
  school: string;
  schoolUrl: string;
  degree: string;
  duration: string;
  location: string;
}
