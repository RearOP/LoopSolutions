export const siteConfig = {
  name: 'Loop',
  tagline: 'Digital Agency',
  description: 'We craft digital experiences that push boundaries.',
  email: 'hello@loopagency.io',
  phone: '+1 (555) 234-5678',
  address: '42 Innovation Drive, San Francisco, CA 94105',
};

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Services',
    path: '/services',
    dropdown: [
      { label: 'SEO Services', path: '/services/seo' },
      { label: 'Social Media Marketing', path: '/services/social-media' },
      { label: 'Website Development', path: '/services/web-development' },
      { label: 'Graphic & Branding', path: '/services/graphic-branding' },
    ]
  },
  { label: 'Work', path: '/work' },
  { label: 'Contact', path: '/contact' },
];

export const marqueeItems = [
  'Strategy', 'Branding', 'Web Development', 'Mobile Apps',
  'UI/UX Design', 'Cloud Architecture', 'AI Solutions', 'DevOps',
  'E-Commerce', 'SaaS Products', 'Digital Transformation', 'Consulting',
];

export const services = [
  {
    icon: '◈',
    title: 'Product Strategy',
    description: 'We define the roadmap from concept to launch — validating ideas, mapping user journeys, and aligning your product vision with real business outcomes.',
  },
  {
    icon: '⬡',
    title: 'UI/UX Design',
    description: 'Research-driven design that transforms complex workflows into elegant, intuitive interfaces. Every pixel serves a purpose.',
  },
  {
    icon: '⟐',
    title: 'Web Development',
    description: 'Performant, accessible, and scalable web applications built with modern frameworks. From landing pages to enterprise platforms.',
  },
  {
    icon: '◉',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile apps that feel at home on every device. iOS, Android, React Native, Flutter.',
  },
  {
    icon: '⬢',
    title: 'Cloud & DevOps',
    description: 'Infrastructure that scales with your ambitions. CI/CD pipelines, cloud architecture, monitoring, and security — done right.',
  },
  {
    icon: '◇',
    title: 'AI & Machine Learning',
    description: 'Intelligent features that set you apart — recommendation engines, natural language processing, computer vision, and predictive analytics.',
  },
];

export const projects = [
  {
    id: 1,
    title: 'Meridian Finance',
    category: 'Fintech',
    description: 'A next-gen banking platform with real-time analytics, AI-powered insights, and a seamless cross-device experience.',
    tags: ['React', 'Node.js', 'AWS'],
    color: '#6366f1',
    year: '2025',
  },
  {
    id: 2,
    title: 'Verdant Health',
    category: 'Healthcare',
    description: 'Telemedicine platform connecting patients with providers globally. HIPAA-compliant, built for scale.',
    tags: ['Next.js', 'Python', 'GCP'],
    color: '#22c55e',
    year: '2025',
  },
  {
    id: 3,
    title: 'Nebula Commerce',
    category: 'E-Commerce',
    description: 'Headless commerce engine powering 2M+ daily transactions with sub-100ms response times.',
    tags: ['Vue.js', 'Go', 'Kubernetes'],
    color: '#f59e0b',
    year: '2024',
  },
  {
    id: 4,
    title: 'Pulse Analytics',
    category: 'SaaS',
    description: 'Real-time business intelligence dashboard that turns raw data into actionable strategies.',
    tags: ['React', 'D3.js', 'PostgreSQL'],
    color: '#ec4899',
    year: '2024',
  },
  {
    id: 5,
    title: 'Atlas Logistics',
    category: 'Supply Chain',
    description: 'End-to-end supply chain visibility platform with predictive routing and fleet management.',
    tags: ['React Native', 'Rust', 'Azure'],
    color: '#06b6d4',
    year: '2024',
  },
  {
    id: 6,
    title: 'Luminary Education',
    category: 'EdTech',
    description: 'Adaptive learning platform that personalizes curricula using machine learning algorithms.',
    tags: ['Next.js', 'TensorFlow', 'Firebase'],
    color: '#8b5cf6',
    year: '2023',
  },
];

export const testimonials = [
  {
    quote: 'Loop didn\'t just build our product — they helped us rethink our entire digital strategy. The results speak for themselves: 3x user growth in six months.',
    name: 'Sarah Chen',
    role: 'CEO, Meridian Finance',
    initials: 'SC',
  },
  {
    quote: 'Working with Loop felt like having a world-class engineering team embedded in our company. Their attention to detail and technical excellence is unmatched.',
    name: 'Marcus Johnson',
    role: 'CTO, Verdant Health',
    initials: 'MJ',
  },
  {
    quote: 'They turned our complex requirements into an elegant solution that our users genuinely love. Loop understands that great software is invisible.',
    name: 'Elena Rodriguez',
    role: 'VP Product, Nebula Commerce',
    initials: 'ER',
  },
];

export const stats = [
  { number: 150, suffix: '+', label: 'Projects Delivered' },
  { number: 98, suffix: '%', label: 'Client Satisfaction' },
  { number: 12, suffix: '+', label: 'Years of Experience' },
  { number: 40, suffix: '+', label: 'Team Members' },
];

export const teamMembers = [
  { name: 'Alexander Wright', role: 'Founder & CEO', initials: 'AW' },
  { name: 'Sofia Martinez', role: 'Creative Director', initials: 'SM' },
  { name: 'James Okafor', role: 'Head of Engineering', initials: 'JO' },
  { name: 'Mia Tanaka', role: 'Lead Designer', initials: 'MT' },
];

export const values = [
  {
    title: 'Craft Over Convention',
    description: 'We choose excellence over expediency. Every line of code, every pixel placement — it all matters.',
  },
  {
    title: 'Radical Transparency',
    description: 'No black boxes. We keep you in the loop at every stage, with clear communication and honest timelines.',
  },
  {
    title: 'Relentless Curiosity',
    description: 'Technology evolves daily. We stay on the cutting edge, constantly exploring new tools and methodologies.',
  },
  {
    title: 'Impact First',
    description: 'Beautiful software means nothing if it doesn\'t move the needle. We measure our success by your outcomes.',
  },
];

export const timeline = [
  { year: '2013', text: 'Founded in a San Francisco garage. Two developers, one designer, and a shared obsession with craft.' },
  { year: '2015', text: 'Secured first enterprise client. Grew to a team of 10. Opened our first real office.' },
  { year: '2018', text: 'Expanded into AI/ML services. Launched our open-source component library used by 50K+ developers.' },
  { year: '2020', text: 'Went fully remote-first. Grew to 30+ team members across 8 countries.' },
  { year: '2023', text: 'Hit the 100-project milestone. Named a top-10 digital agency by TechCrunch.' },
  { year: '2026', text: 'Continuing to push boundaries with 40+ specialists and a global client roster.' },
];

export const processSteps = [
  { title: 'Discovery', description: 'Deep dive into your business, users, and goals. We ask the hard questions to uncover the real problems worth solving.' },
  { title: 'Strategy', description: 'Define the roadmap, tech stack, and milestones. Align every decision with your business outcomes.' },
  { title: 'Design', description: 'Wireframes to high-fidelity prototypes. We iterate rapidly, testing with real users at every stage.' },
  { title: 'Development', description: 'Clean, scalable code built with best practices. Continuous integration, code reviews, and automated testing.' },
  { title: 'Launch & Scale', description: 'Deploy with confidence. Performance monitoring, A/B testing, and ongoing optimization to maximize impact.' },
];

export const techStack = [
  { name: 'React', icon: '⚛' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '⬢' },
  { name: 'Python', icon: '🐍' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Go', icon: 'Go' },
  { name: 'AWS', icon: '☁' },
  { name: 'Docker', icon: '🐳' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Redis', icon: '◈' },
  { name: 'GraphQL', icon: '◇' },
  { name: 'Figma', icon: '🎨' },
];

export const footerLinks = {
  company: [
    { label: 'About', path: '/about' },
    { label: 'Careers', path: '#' },
    { label: 'Blog', path: '#' },
    { label: 'Press', path: '#' },
  ],
  services: [
    { label: 'Strategy', path: '/services' },
    { label: 'Design', path: '/services' },
    { label: 'Development', path: '/services' },
    { label: 'AI/ML', path: '/services' },
  ],
  connect: [
    { label: 'Twitter / X', path: '#' },
    { label: 'LinkedIn', path: '#' },
    { label: 'GitHub', path: '#' },
    { label: 'Dribbble', path: '#' },
  ],
};
