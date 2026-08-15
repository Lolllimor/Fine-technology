/** Marketing copy and image URLs — edit content without touching layout code. */

export const brand = {
  name: 'Fine Technology',
  phone: '+234 8033618578',
  email: 'Finetechnologyofficial@gmail.com',
  address: '26, Ebunolorun Street, Shomolu, Lagos.',
};

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

export const images = {
  logo: 'https://v7cc5qla9j.ufs.sh/f/jEWG4Zz62IJxCPos9I8uSsRJgdtW2EZB9a7yLeihTHQw4YrI',
  clientSatisfaction:
    'https://v7cc5qla9j.ufs.sh/f/jEWG4Zz62IJx9Tl9l2IzYZTcUAqi2BHXDOgvtrxLuad5MFKh',
  homesPowered:
    'https://v7cc5qla9j.ufs.sh/f/jEWG4Zz62IJxz4FtcBPylkf4XmwxF0OD8qhCabLd5QsHYA2t',
  heroHouse:
    'https://res.cloudinary.com/dobqce531/image/upload/v1786755702/fine-technology/gallery/woi9fyx930cir0ohezqb.png',
  batteryRack:
    'https://res.cloudinary.com/dobqce531/image/upload/v1786761071/fine-technology/gallery/w2iekg1aa5phjvpz6xr4.png',
  industrialRoom:
    'https://res.cloudinary.com/dobqce531/image/upload/v1786760801/fine-technology/gallery/nvn1pmzjjmlwxedp3hbg.png',
  bigSol:
    'https://v7cc5qla9j.ufs.sh/f/jEWG4Zz62IJxlPXbRqG4lQXkBu8JTxwnhUR2fd6VjFvg1Kiz',
  solarFarm:
    'https://v7cc5qla9j.ufs.sh/f/jEWG4Zz62IJxUrnNfodKxG6v9BKCnf2qoJzwyigkjWIQVDSZ',
  technician:
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80',
  batteryUnit:
    'https://images.unsplash.com/photo-1613665813444-6a945ab98cc1?auto=format&fit=crop&w=600&q=80',
  projectMain:
    'https://res.cloudinary.com/dobqce531/image/upload/v1786760820/fine-technology/gallery/oppf82xigp2u9dt5mry9.png',
  projectLagos:
    'https://res.cloudinary.com/dobqce531/image/upload/v1786760822/fine-technology/gallery/yap4vnthyb6yyhyu8bpg.png',
  projectAbuja:
    'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=900&q=80',
  projectCommercial:
    'https://res.cloudinary.com/dobqce531/image/upload/v1786760806/fine-technology/gallery/czsgrwqmdha80vhkpfc4.png',
};

export const about = {
  eyebrow: 'About FINETECHNOLOGY',
  headlineBefore: 'We are an indigenous tech and contracting firm specializing in ',
  headlineAccent: 'power backup solutions.',
  body:
    'FINE TECHNOLOGY is an authority in power solutions, ICT and renewable energy, this past years we’ve been able to build and satisfy our clients in providing various innovative services.',
} as const;

export const servicesSection = {
  eyebrow: 'What We Do',
  title: 'Power Backup Solution Integration',
  intro:
    'We don’t just install panels; we build intelligent energy that satisfy your everyday needs.',
  imageTags: ['Sales Services', 'Maintenance', 'Repair'],
} as const;

export const servicesAccordion = [
  {
    title: 'Solar Solutions',
    body:
      'Grid-tied and hybrid solar designed for Nigerian roofs, with monitoring and phased expansion.',
  },
  {
    title: 'Inverter Solutions',
    body:
      'Sizing, installation, and maintenance of pure sine wave inverters matched to your load profile.',
  },
  {
    title: 'Uninterrupted Power Supply (UPS)',
    body:
      'Mission-critical UPS for offices, banks, and server rooms — clean switchover and battery health checks.',
  },
  {
    title: 'CCTV/IP Surveillance',
    body:
      'Structured cabling and IP cameras integrated with your network and backup power plan.',
  },
  {
    title: 'Training and Consultancy',
    body:
      'Hands-on training for facility teams and design reviews for new builds and retrofits.',
  },
] as const;

export const productsSection = {
  eyebrow: 'Our SERVICES',
  title: 'Our Product and Services',
  ctaLabel: 'Learn More',
} as const;

export const productChecklist = [
  'Industrial and Home Inverters',
  'Uninterrupted Power Supply (UPS)',
  'Automatic Voltage Regulator (Stabilizers)',
  'Indelec Light Protection Solutions/Earthing & Grounding',
  'Batteries (Solar lead acid, Tubular inverter, AGM, Ups)',
] as const;

export const portfolioSection = {
  eyebrow: 'Case PROJECT',
  title: 'Discover Our Successful Projects.',
  intro:
    'View our portfolio of successful solar energy & backup power solution projects across Nigeria.',
  ctaLabel: 'View All Project',
} as const;

export const projects = [
  {
    title: 'PremiumTrust Bank (PTB)',
    description:
      'Critical Power / Chilled Water Cooling /Electrical Panels / Structured Cabling / CCTV / Access Control',
    imageKey: 'projectLagos' as const,
    large: true,
    year: '2023',
  },
  {
    title: 'Residential Installation - Lagos',
    description: '10kVA hybrid solar + lithium storage for a smart home.',
    imageKey: 'projectMain' as const,
    large: false,
    year: '2022',
  },
  {
    title: 'Commercial Office - Abuja',
    description: 'Office tower UPS refresh and rooftop solar add-on.',
    imageKey: 'projectCommercial' as const,
    large: false,
    year: '2023',
  },
];

export const contactSection = {
  intro:
    'Join thousands of satisfied customers across Nigeria who have escaped power outages, reduced energy costs, and embraced clean, reliable solar power.',
} as const;

export const testimonials = [
  {
    quote:
      'Partnering with this solar team was one of the best decisions for our farm and our future. Not only did our energy costs drop dramatically, but we became part of a cleaner, greener initiative.',
    name: 'James Wilson',
    role: 'Dairy Farm Owner',
    image: images.batteryRack,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
  },
  {
    quote:
      'Their team documented every cable run and trained our facilities staff. Support calls are rare now.',
    name: 'Adaeze Okafor',
    role: 'Facilities Manager',
    image: images.industrialRoom,
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
  },
  {
    quote:
      'Clear proposals, realistic timelines, and they stood behind the commissioning tests.',
    name: 'Ibrahim Musa',
    role: 'Project Director',
    image: images.projectMain,
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&h=160&q=80',
  },
  {
    quote:
      'Downtime used to cost us every rainy season. Fine Technology sized the UPS and solar stack properly — we have not dropped load in eighteen months.',
    name: 'Chinedu Okeke',
    role: 'Head of Operations',
    image: images.batteryUnit,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80',
  },
] as const;
