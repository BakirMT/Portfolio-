export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export type Education = {
  school: string;
  description: string;
  year: string;
};

export type Service = {
  title: string;
  description: string;
};
