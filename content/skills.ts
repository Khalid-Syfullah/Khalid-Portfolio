import type { SkillGroup } from "./types";

/** Strongest first in each group. `projects` drives the skill → archive filter. */
export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    skills: [
      { name: "Java", projects: ["boimela", "plasma-plus", "muslim-virtual-aid", "e-doctors", "grammarquick"] },
      { name: "JavaScript", projects: ["task-manager", "vfloors360", "blog-app", "boimela"] },
      { name: "Python", projects: [] },
      { name: "C / C++", projects: [] },
      { name: "PHP", projects: ["ropms"] },
      { name: "HTML & CSS", projects: [] },
    ],
  },
  {
    name: "Front-end",
    skills: [
      { name: "React", projects: ["boimela", "vfloors360", "task-manager"] },
      { name: "Redux", projects: [] },
      { name: "Tailwind CSS", projects: [] },
      { name: "Bootstrap", projects: [] },
      { name: "Axios", projects: [] },
      { name: "Angular", projects: ["blog-app"] },
    ],
  },
  {
    name: "Back-end",
    skills: [
      { name: "Node.js", projects: ["boimela", "vfloors360", "task-manager", "blog-app"] },
      { name: "Express", projects: ["boimela", "vfloors360", "task-manager"] },
      { name: "MongoDB & Mongoose", projects: ["vfloors360", "task-manager"] },
      { name: "JWT", projects: [] },
      { name: "OAuth 2.0", projects: ["boimela"] },
      { name: "Multer", projects: [] },
      { name: "Jest · Mocha · Chai", projects: [] },
    ],
  },
  {
    name: "Mobile",
    skills: [
      {
        name: "Android (Java + XML)",
        projects: ["boimela", "plasma-plus", "muslim-virtual-aid", "e-doctors", "grammarquick"],
      },
      { name: "MVVM", projects: ["boimela", "muslim-virtual-aid"] },
      { name: "Retrofit", projects: [] },
      { name: "Firebase", projects: [] },
      { name: "TensorFlow Lite", projects: [] },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "MongoDB", projects: ["vfloors360", "task-manager"] },
      { name: "MySQL", projects: ["ropms"] },
      { name: "Firebase", projects: [] },
      { name: "SQLite", projects: [] },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS (EC2, Route 53, Lightsail)", projects: [] },
      { name: "GCP Compute Engine", projects: [] },
      { name: "Linux", projects: [] },
      { name: "Nginx · Apache", projects: [] },
      { name: "Docker", projects: [] },
      { name: "Bash", projects: [] },
      { name: "Git & GitHub", projects: [] },
      { name: "GitHub Actions", projects: [] },
    ],
  },
];
