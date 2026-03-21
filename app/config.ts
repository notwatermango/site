export const SITE_ROUTES = {
  about: "/about",
  projects: "/projects",
  blog: "/blog",
  github: "https://github.com/notwatermango",
  linkedin: "https://www.linkedin.com/in/notwatermango/",
  instagram: "https://instagram.com/notwatermango",
  email: "mailto:notwatermango@gmail.com",
};

export const NAV_LINKS = [
  { label: "About", href: SITE_ROUTES.about },
  { label: "Projects", href: SITE_ROUTES.projects },
  { label: "Blog", href: SITE_ROUTES.blog },
];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: SITE_ROUTES.github },
  { label: "LinkedIn", href: SITE_ROUTES.linkedin },
  { label: "Instagram", href: SITE_ROUTES.instagram },
  { label: "Email", href: SITE_ROUTES.email },
];

export const TERMINAL_TARGETS = [
  { word: "about", path: SITE_ROUTES.about, isExternal: false },
  { word: "projects", path: SITE_ROUTES.projects, isExternal: false },
  { word: "blog", path: SITE_ROUTES.blog, isExternal: false },
  { word: "github", path: SITE_ROUTES.github, isExternal: true },
  { word: "linkedin", path: SITE_ROUTES.linkedin, isExternal: true },
  { word: "instagram", path: SITE_ROUTES.instagram, isExternal: true },
  { word: "email", path: SITE_ROUTES.email, isExternal: true },
];
