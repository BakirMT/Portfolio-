import { Project, SkillCategory, Education, Service } from './types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'School Management Web App',
    category: 'Web Development / AI',
    description: 'Admin dashboard, Students, Teachers, Attendance, Fees, Classes, Homework, Timetable, Notice Board, Reports, AI Assistant.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    title: 'Graphic Design Projects',
    category: 'Design',
    description: 'Posters, Event banners, Typography, Social media designs, Promotional materials.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '3',
    title: 'Microsoft Excel Projects',
    category: 'Data & Productivity',
    description: 'Data management, Tables, Calculations, Reports, Dashboards.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
  }
];

export const skills: SkillCategory[] = [
  { category: 'Design', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Canva', 'Pixellab', 'Poster Design', 'Image Editing', 'Layout Design'] },
  { category: 'Technology', items: ['HTML', 'CSS', 'JavaScript', 'Python', 'Web Design', 'AI Tools & AI Concepts'] },
  { category: 'Microsoft & Google', items: ['Microsoft Excel', 'Microsoft Word', 'Microsoft PowerPoint', 'Google Sheets', 'Google Docs', 'Google Slides', 'Google Forms'] },
  { category: 'Other', items: ['English & Malayalam Typing', 'Presentation Design', 'Creative Problem Solving', 'Communication'] }
];

export const education: Education[] = [
  { school: 'Wandoor Orphanage School', description: 'SSLC (10th class) Complete — Wandoor, Malappuram District, Kerala', year: 'Completed' },
  { school: 'Govt. Vocational Higher Secondary School, Nellikuth', description: 'Kerala Plus One — Passed, 2025 | Kerala Plus Two — Passed, 2026', year: 'Complete in 2025-26' },
  { school: 'Darul Irfan Islamic Academy', description: 'Affiliated with Darul Huda Islamic University, Chemmad', year: 'Ongoing' },
  { school: 'KSHM Arts & Science College Edathanattukara', description: 'Degree Program', year: 'Ongoing' }
];

export const services: Service[] = [
  { title: 'Graphic Design', description: 'Creating posters, promotional graphics, social media designs, and visual content.' },
  { title: 'UI & Web Design', description: 'Designing clean, modern interfaces and building basic websites using HTML and CSS.' },
  { title: 'Digital Productivity', description: 'Working with Excel, Word, PowerPoint and Google Workspace to create organized and professional documents.' },
  { title: 'AI & Technology', description: 'Exploring artificial intelligence and using modern AI tools to solve problems and improve creative workflows.' }
];
