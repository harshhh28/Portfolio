// Skills Types
export interface Skill {
  name: string;
  url: string | null;
}

export interface SkillsData {
  languages: Skill[];
  developerTools: Skill[];
  frameworks: Skill[];
  mlAndDataScience: Skill[];
  cloudDatabases: Skill[];
  coursework: Skill[];
  areasOfInterest: Skill[];
}

// Experience Types
export interface Experience {
  id: string;
  title: string;
  organization: string;
  organizationUrl: string | null;
  duration: string;
  location: string;
  description: string;
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
// Projects Types
export interface Project {
  title: string;
  description: string;
  github: string;
  demo: string;
  tags: string[];
}

// Blog Types
export interface BlogPost {
  title: string;
  subtitle?: string;
  slug: string;
  dateAdded: string;
  readTimeInMinutes: number;
  views?: number;

  tags?: string[];
  author?: string;
}

// Education Types
export interface Education {
  school: string;
  schoolUrl: string;
  degree: string;
  duration: string;
  location: string;
  courses: string[];
}
