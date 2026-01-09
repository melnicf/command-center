// INVNT® Knowledge Base for AI Chatbot
// This file contains all structured data and responses for the engagement engine chatbot

import type { CaseStudy, Office, Leader, ChatIntent, KnowledgeEntity } from '@/types/chat';

// ============================================
// COMPANY INFORMATION
// ============================================

export const companyInfo: KnowledgeEntity = {
  id: 'invnt-company',
  type: 'company',
  name: 'INVNT®',
  description: 'A global brand storytelling agency built to help organizations create integrated stories that live across live experiences, digital channels, creative production, and emerging/immersive tech.',
  attributes: {
    tagline: 'On a mission to Put a Brand on the Moon™',
    category: 'Global brand storytelling / experiential / integrated marketing agency',
    founded: 2008,
    headquarters: 'New York City',
    employeeRange: '201-500',
    portfolioUmbrella: '[INVNT GROUP] The Global BrandStory Project™',
    portfolioUnits: ['Folk Hero', 'Meaning', 'HEVĒ', 'INVNT Higher Ed', 'ITP LIVE', 'INVNT.ATOM', 'Hypnogram'],
    positioning: 'Live Brand Storytelling—the idea that, even in a digital-first world, high-impact "shared experiences" (live, hybrid, virtual, immersive) can create visceral emotion and loyalty that moves audiences and drives demand.',
    differentiators: [
      'Global network across APAC, EMEA, South Asia, and North America',
      'Cross-disciplinary talent under one roof',
      'Unified approach from concept to execution',
      'Emotionally resonant experiences with measurable impact'
    ],
    missionAudience: 'Brands that want to "Plant a flag. Dent culture. Make history." — forward-thinking organizations and challenger brands'
  }
};

// ============================================
// OFFICES / LOCATIONS
// ============================================

export const offices: Office[] = [
  {
    city: 'New York City',
    country: 'USA',
    region: 'North America',
    address: '101 Greenwich Street, 26th Floor, New York, NY 10006, USA',
    isHQ: true
  },
  {
    city: 'London',
    country: 'UK',
    region: 'EMEA',
    address: '16–19 Eastcastle Street, London, W1W 8DY, UK'
  },
  {
    city: 'Detroit',
    country: 'USA',
    region: 'North America',
    address: '320 Martin Street, Suite LL30, Birmingham, MI 48009, USA'
  },
  {
    city: 'Stockholm',
    country: 'Sweden',
    region: 'EMEA',
    address: 'Huskvarnavägen 82, 554 66, Jönköping, Sweden'
  },
  {
    city: 'Sydney',
    country: 'Australia',
    region: 'APAC',
    address: 'The Chocolate Factory, 1A, 130–144 Cleveland Street, Chippendale, Sydney 2008, Australia'
  },
  {
    city: 'Mumbai',
    country: 'India',
    region: 'South Asia',
    address: 'Spectrum Tower, 4th Floor, Mindspace, Malad West, Mumbai 400064, India'
  },
  {
    city: 'San Francisco',
    country: 'USA',
    region: 'North America',
    address: '66 Franklin Street, Suite 300, Oakland, CA 94607, USA'
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    region: 'APAC',
    address: '74B Tras Street, #03-01, Singapore 07901'
  },
  {
    city: 'Dubai',
    country: 'UAE',
    region: 'EMEA',
    address: 'DMCC Business Centre Unit No. 30-01-4293, Jewellery & Gemplex 3, Dubai, UAE'
  },
  {
    city: 'Noosa',
    country: 'Australia',
    region: 'APAC',
    address: 'Unit 3, 2 Project Avenue, Noosaville, QLD 4566'
  },
  {
    city: 'Washington DC',
    country: 'USA',
    region: 'North America',
    address: '1301 K Street NW, Suite 300W, Washington, DC 20005, USA'
  }
];

// ============================================
// LEADERSHIP TEAM
// ============================================

export const leadership: Leader[] = [
  { name: 'Scott Cullather', title: 'Chairman and Chief Growth Officer' },
  { name: 'Kristina McCoobery', title: 'Chief Executive Officer' },
  { name: 'Paul Blurton', title: 'Chief Creative Officer' },
  { name: 'Wolf Karbe', title: 'Chief Financial Officer' },
  { name: 'Jerry Deeney', title: 'Chief Client Officer' },
  { name: 'Mike Kitson', title: 'Chief Production Officer' },
  { name: 'Jim McDonald', title: 'Chief Implementation Officer' },
  { name: 'James Kinney', title: 'Chief AI Officer' }
];

// ============================================
// SERVICES / CAPABILITIES
// ============================================

export const services: KnowledgeEntity[] = [
  {
    id: 'strategy-narrative',
    type: 'service',
    name: 'Strategy & Narrative',
    description: 'Brand strategy, narrative development, and culture consulting',
    attributes: {
      offerings: ['Brand Strategy', 'Narrative Development', 'Culture Consulting', 'Performance Strategy']
    }
  },
  {
    id: 'live-experiential',
    type: 'service',
    name: 'Live / Experiential',
    description: 'Events, activations, installations, experiences, and logistics',
    attributes: {
      offerings: ['Live Events', 'Activations', 'Installations', 'Experiences', 'Event Management', 'Logistics']
    }
  },
  {
    id: 'digital',
    type: 'service',
    name: 'Digital',
    description: 'Branded content, content marketing, and digital storytelling',
    attributes: {
      offerings: ['Branded Content', 'Content Marketing', 'Digital Storytelling', 'Media Planning', 'Media Buying']
    }
  },
  {
    id: 'innovation',
    type: 'service',
    name: 'Innovation',
    description: 'AI, AR, VR, MR, virtual experiences, Web3/NFT, spatial computing, and multimedia/CGI',
    attributes: {
      offerings: ['AI Experiences', 'AR/VR/MR', 'Virtual Experiences', 'Web3/NFT', 'Spatial Computing', 'Multimedia/CGI', 'Metaverse']
    }
  },
  {
    id: 'production',
    type: 'service',
    name: 'Production',
    description: 'Creative services, production, and post-production',
    attributes: {
      offerings: ['Creative Services', 'Production', 'Post-Production', '3D Production']
    }
  },
  {
    id: 'higher-ed',
    type: 'service',
    name: 'Higher Education',
    description: 'Campaigns and experiences for universities, advancement, and community engagement',
    attributes: {
      offerings: ['Campaign Launches', 'Fundraising Events', 'Alumni Engagement', 'Community Events']
    }
  }
];

// ============================================
// CASE STUDIES
// ============================================

export const caseStudies: CaseStudy[] = [
  {
    id: 'cop28-tree-of-life',
    name: 'COP28 — Tree of Life',
    client: 'COP28',
    description: 'A world-first AI-powered installation designed to bridge nature and humanity and encourage pledges/collective climate action. The experience featured a digital pledge mechanism where visitors could "converse with Mother Nature" via AI, with pledges transformed into unique AI-curated artworks.',
    metrics: [
      { label: 'Campaign Site Visits', value: '280,000', type: 'visits' },
      { label: 'Global Media Impressions', value: '288M+', type: 'impressions' },
      { label: 'Earned Editorial Placements', value: '735', type: 'placements' },
      { label: 'Advertising Value Equivalent', value: '$2.7M+', type: 'revenue' }
    ],
    capabilities: ['AI Installation', 'Experience Design', 'Digital Engagement', 'Environmental/ESG'],
    year: 2023,
    region: 'EMEA'
  },
  {
    id: 'lamborghini-ultimate-nft',
    name: 'Lamborghini — Ultimate NFT',
    client: 'Automobili Lamborghini',
    description: 'An "Ultimate" initiative combining a 1:1 NFT with the last Lamborghini Aventador LP 780-4 Ultimae Coupé ever produced. The project encompassed project management, NFT development, mechanics, campaign strategy, creative/art direction, content development, PR, and marketing communications.',
    metrics: [
      { label: 'Earned Editorial Reach', value: '562M+', type: 'reach' },
      { label: 'NFT Selling Price', value: '$1.6M', type: 'revenue' },
      { label: 'Editorial Placements', value: '288', type: 'placements' },
      { label: 'Advertising Value Equivalent', value: '$5.18M+', type: 'revenue' }
    ],
    capabilities: ['NFT Development', 'Web3', 'Luxury Brand', 'Campaign Strategy', 'PR'],
    year: 2022,
    region: 'North America'
  },
  {
    id: 'lamborghini-epic-road-trip',
    name: 'Lamborghini — The Epic Road Trip',
    client: 'Automobili Lamborghini',
    description: 'An eight-month digital campaign connected to heritage, Web3 community rewards, and a "60th Anniversary" narrative. The project was delivered in partnership with Web3Pro and included end-to-end responsibilities: 3D production, campaign strategy, drop mechanics, PR and MarComms.',
    metrics: [
      { label: 'Campaign Site Visits', value: '519K', type: 'visits' },
      { label: 'Campaign ROI', value: '10.5x', type: 'roi' },
      { label: 'Advertising Value Equivalent', value: '$12.2M+', type: 'revenue' },
      { label: 'Editorial Placements', value: '1.2K', type: 'placements' },
      { label: 'Social Impressions', value: '825K', type: 'impressions' }
    ],
    capabilities: ['Web3', '3D Production', 'Campaign Strategy', 'Digital Marketing', 'Heritage/Anniversary'],
    year: 2023,
    region: 'North America'
  },
  {
    id: 'xero-xerovision',
    name: 'Xero — Xerovision AR Experience',
    client: 'Xero',
    description: 'An internal virtual/physical kickoff for Xero across global offices worldwide, featuring an AR challenge/treasure hunt mechanic accessed via QR code and a microsite with mini-games, quizzes, and a global leaderboard.',
    metrics: [
      { label: 'Registrations', value: '476+', type: 'other' },
      { label: 'Campaign Site Visits', value: '1,978+', type: 'visits' },
      { label: 'Repeat Engagement Rate', value: '59%', type: 'other' }
    ],
    capabilities: ['AR Experience', 'Internal Events', 'Employee Engagement', 'Gamification', 'Global Activation'],
    year: 2023,
    region: 'APAC'
  },
  {
    id: 'oregon-state-believe-it',
    name: 'Oregon State University — Believe It Campaign',
    client: 'Oregon State University',
    description: 'Helped Oregon State University launch the "Believe It" fundraising campaign ($1.75B target), featuring immersive video, gift announcements, an installation, and a marching band + laser show finale.',
    metrics: [
      { label: 'Fundraising Campaign Target', value: '$1.75B', type: 'revenue' }
    ],
    capabilities: ['Higher Education', 'Fundraising', 'Campaign Launch', 'Immersive Video', 'Live Production'],
    year: 2023,
    region: 'North America'
  },
  {
    id: 'pepsico-expo-2020',
    name: 'PepsiCo — Expo 2020 Dubai',
    client: 'PepsiCo',
    description: 'PepsiCo pavilions at Expo 2020 Dubai (held in 2021) featuring celebrity athlete activations with Lionel Messi, Serena Williams, and Usain Bolt. The experience saw 24 million visitors over six months.',
    metrics: [
      { label: 'Visitors', value: '24 million', type: 'other' }
    ],
    capabilities: ['Expo/Pavilion', 'Celebrity Activation', 'Large-Scale Events', 'CPG/Beverage'],
    year: 2021,
    region: 'EMEA'
  },
  {
    id: 'cop28-activations',
    name: 'COP28 Site Activations',
    client: 'COP28',
    description: 'Designed and produced activations for COP28, accommodating a daily crowd of 70,000 attendees at the site.',
    metrics: [
      { label: 'Daily Attendance', value: '70,000', type: 'other' }
    ],
    capabilities: ['Large-Scale Events', 'Government/NGO', 'Global Summits', 'Site Activation'],
    year: 2023,
    region: 'EMEA'
  }
];

// ============================================
// CLIENTS
// ============================================

export const clients = {
  // Explicitly named on INVNT site text
  confirmed: ['Microsoft', 'Samsung', 'General Motors', 'LEGO'],
  // Named in UAE expansion post
  uaeRegion: ['PepsiCo', 'Audi', 'COP28', 'Emirates Airline'],
  // Named in portfolio press coverage
  pressRoster: ['AWS', 'PepsiCo', 'Xero', 'GM', 'Samsung', 'Emirates', 'Lamborghini', 'Spotify', 'Meta', 'Pfizer', 'SHRM', 'Netflix'],
  // APAC account wins
  apacWins: ['Xero', 'LinkedIn'],
  // PepsiCo brands mentioned
  pepsicoPortfolio: ['Aquafina', 'Gatorade', "Lay's", 'Rockstar Energy']
};

// ============================================
// CHAT INTENTS (Pattern Matching)
// ============================================

export const chatIntents: ChatIntent[] = [
  // Company Overview
  {
    id: 'what-is-invnt',
    patterns: [
      'what is invnt',
      'who is invnt',
      'tell me about invnt',
      'what does invnt do',
      'describe invnt',
      'invnt overview',
      'what makes invnt different',
      'how is invnt different',
      'invnt differentiation'
    ],
    responses: [
      `**INVNT®** is a global brand storytelling agency on a mission to **"Put a Brand on the Moon™"**.

We help organizations create integrated stories that live across live experiences, digital channels, creative production, and emerging/immersive tech.

**What makes us different:**
- 🌍 Global network across APAC, EMEA, South Asia, and North America
- 🎯 Cross-disciplinary talent under one roof
- 🔄 Unified approach from concept to execution
- 📊 Emotionally resonant experiences with measurable impact

We work with forward-thinking organizations and challenger brands that want to "Plant a flag. Dent culture. Make history."

Founded in **2008** and headquartered in **New York City**, INVNT has grown to **201-500 employees** across **11 offices in 7 countries**.`
    ],
    topics: ['company', 'overview', 'about'],
    priority: 10
  },
  
  // Services & Capabilities
  {
    id: 'services-general',
    patterns: [
      'what services',
      'what do you offer',
      'capabilities',
      'what can you do',
      'your offerings',
      'services list'
    ],
    responses: [
      `**INVNT's Core Services:**

🎯 **Strategy & Narrative**
Brand strategy, narrative development, culture consulting

🎪 **Live / Experiential**
Events, activations, installations, experiences, logistics

💻 **Digital**
Branded content, content marketing, digital storytelling, media planning & buying

🚀 **Innovation**
AI/AR/VR/MR, virtual experiences, Web3/NFT, spatial computing, multimedia/CGI

🎬 **Production**
Creative services, production, post-production, 3D production

🎓 **Higher Education**
Campaigns and experiences for universities, advancement, and community

We offer end-to-end capabilities from concept to execution, ensuring cohesive brand storytelling across all touchpoints.`
    ],
    topics: ['services', 'capabilities'],
    priority: 9
  },
  
  // Digital vs Live Events
  {
    id: 'digital-vs-live',
    patterns: [
      'digital only',
      'live events',
      'do you do digital',
      'only experiential',
      'virtual events',
      'hybrid events'
    ],
    responses: [
      `We do **both digital and live experiences**—and everything in between!

**Live/Experiential:**
Events, activations, installations, and in-person experiences

**Digital:**
Branded content, content marketing, digital storytelling, virtual experiences

**Hybrid/Innovation:**
AR/VR/MR experiences, Web3/NFT campaigns, AI-powered installations

Our "Live Brand Storytelling" philosophy means we believe high-impact shared experiences (live, hybrid, or virtual) create visceral emotion and loyalty. We're not limited to one format—we choose the right medium for your story and audience.`
    ],
    topics: ['services', 'digital', 'live', 'experiential'],
    priority: 8
  },
  
  // AI Capabilities
  {
    id: 'ai-capabilities',
    patterns: [
      'ai projects',
      'ai installations',
      'artificial intelligence',
      'do you build ai',
      'ai experiential',
      'ai experience',
      'ai powered'
    ],
    responses: [
      `Yes! We build **AI-powered experiences**. Here's a prime example:

**🌳 COP28 — Tree of Life**
A "world-first AI-powered installation" designed to bridge nature and humanity:

- Visitors could **"converse with Mother Nature"** via AI
- Digital pledges were transformed into **unique AI-curated artworks**
- The experience drove collective climate action

**Results:**
- 280,000 campaign site visits
- 288M+ global media impressions
- 735 earned editorial placements
- $2.7M+ advertising value equivalent

We integrate AI into experiential design to create interactive, personalized, and emotionally resonant moments.`
    ],
    topics: ['ai', 'innovation', 'technology', 'case-study'],
    priority: 9
  },
  
  // Web3/NFT Work
  {
    id: 'web3-nft',
    patterns: [
      'web3',
      'nft',
      'blockchain',
      'crypto',
      'metaverse',
      'luxury brands',
      'nft luxury',
      'web3 luxury'
    ],
    responses: [
      `We've delivered groundbreaking **Web3/NFT projects**, especially for luxury brands:

**🏎️ Lamborghini — Ultimate NFT**
Combined a 1:1 NFT with the last Aventador LP 780-4 Ultimae Coupé ever produced.

**Results:**
- $1.6M NFT selling price at auction
- 562M+ earned editorial reach
- 288 editorial placements
- $5.18M+ advertising value equivalent

**🛣️ Lamborghini — The Epic Road Trip**
An 8-month Web3 campaign for the 60th Anniversary:

**Results:**
- 10.5x campaign ROI
- 519K campaign site visits
- $12.2M+ advertising value equivalent
- 825K social impressions

We handle everything: NFT development, drop mechanics, campaign strategy, 3D production, PR & MarComms.`
    ],
    topics: ['web3', 'nft', 'innovation', 'luxury', 'case-study'],
    priority: 9
  },
  
  // Offices/Locations
  {
    id: 'offices-general',
    patterns: [
      'offices',
      'locations',
      'where are you',
      'global presence',
      'countries',
      'regions'
    ],
    responses: [
      `**INVNT Global Offices (11 locations across 7 countries):**

🌎 **North America:**
- New York City (HQ)
- Detroit/Birmingham, MI
- San Francisco/Oakland
- Washington DC

🌍 **EMEA:**
- London, UK
- Stockholm/Jönköping, Sweden
- Dubai, UAE

🌏 **APAC:**
- Sydney, Australia
- Noosa, QLD, Australia
- Singapore

🌏 **South Asia:**
- Mumbai, India

We operate across all major regions: North America, EMEA, APAC, and South Asia.`
    ],
    topics: ['offices', 'locations', 'global'],
    priority: 8
  },
  
  // Dubai Capability
  {
    id: 'dubai-uae',
    patterns: [
      'dubai',
      'uae',
      'middle east',
      'gulf',
      'abu dhabi'
    ],
    responses: [
      `Yes! We have strong **Dubai/UAE capability**:

📍 **Office:** DMCC Business Centre, Jewellery & Gemplex 3, Dubai

**Notable UAE Work:**
- **COP28** — Tree of Life AI installation + site activations (70,000 daily attendees)
- **PepsiCo** — Expo 2020 Dubai pavilions (24 million visitors over 6 months)
- Celebrity activations with Lionel Messi, Serena Williams, Usain Bolt

**UAE Clients:** PepsiCo, Audi, COP28, Emirates Airline

**Brands activated:** Aquafina, Gatorade, Lay's, Rockstar Energy

We support government/NGO work and global summits at massive scale.`
    ],
    topics: ['offices', 'dubai', 'uae', 'emea', 'case-study'],
    priority: 9
  },
  
  // Large Scale Events
  {
    id: 'large-scale',
    patterns: [
      'large scale',
      'big events',
      '70000',
      'massive events',
      'large crowd',
      'event scale',
      'capacity'
    ],
    responses: [
      `Absolutely! We execute **massive-scale events**:

**COP28 Site Activations:**
- Daily crowd: **70,000 attendees**
- Designed and produced multiple activations

**PepsiCo at Expo 2020 Dubai:**
- **24 million visitors** over 6 months
- Celebrity athlete activations (Messi, Serena Williams, Usain Bolt)

We have the production capability, logistics expertise, and global team to deliver experiences at any scale—from intimate executive events to world-stage productions.`
    ],
    topics: ['scale', 'production', 'case-study'],
    priority: 8
  },
  
  // Internal/Employee Events
  {
    id: 'internal-events',
    patterns: [
      'internal event',
      'employee event',
      'corporate event',
      'kickoff',
      'employee engagement',
      'internal audience',
      'global kickoff'
    ],
    responses: [
      `Yes! We specialize in **internal employee events**. Here's an example:

**🎮 Xero — Xerovision AR Experience**
A global internal kickoff across multiple offices worldwide:

**The Experience:**
- AR treasure hunt mechanic via QR code
- Microsite with mini-games and quizzes
- Global leaderboard for friendly competition

**Results:**
- 476+ registrations
- 1,978+ campaign site visits
- 59% engagement from repeat visitors

This combined internal audience alignment, multi-office activation, digital mechanics, and measurable engagement—perfect for rallying global teams.`
    ],
    topics: ['internal', 'employee', 'corporate', 'case-study'],
    priority: 8
  },
  
  // Higher Education
  {
    id: 'higher-ed',
    patterns: [
      'higher ed',
      'higher education',
      'university',
      'college',
      'fundraising',
      'alumni',
      'academic'
    ],
    responses: [
      `Yes! We have a dedicated **Higher Education practice**:

**🎓 Oregon State University — "Believe It" Campaign**
Launched a $1.75B fundraising campaign featuring:

- Immersive video presentations
- Gift announcements
- Branded installation
- Marching band + laser show finale

**Why Higher Ed?**
Universities need experiences that connect donors, alumni, community, and leadership. We bring the same brand storytelling excellence to academic institutions.

Our Higher Ed practice handles campaign launches, fundraising events, alumni engagement, and community activations.`
    ],
    topics: ['higher-ed', 'education', 'fundraising', 'case-study'],
    priority: 8
  },
  
  // Clients
  {
    id: 'clients-list',
    patterns: [
      'clients',
      'who do you work with',
      'client list',
      'brands you work with',
      'examples of clients',
      'tech clients',
      'automotive clients',
      'cpg clients'
    ],
    responses: [
      `**INVNT works with Fortune 500 companies, iconic brands, and industry disruptors:**

🖥️ **Tech:**
Microsoft, Samsung, AWS, Meta, Xero, LinkedIn, Spotify, Netflix

🚗 **Automotive:**
General Motors, Lamborghini, Audi

🍿 **CPG/Beverage:**
PepsiCo (Aquafina, Gatorade, Lay's, Rockstar Energy), LEGO

💊 **Healthcare/Pharma:**
Pfizer

✈️ **Travel/Hospitality:**
Emirates Airline

🏢 **Other:**
COP28, SHRM

We partner with forward-thinking organizations across industries who want to create culturally resonant brand experiences.`
    ],
    topics: ['clients', 'brands'],
    priority: 8
  },
  
  // Leadership
  {
    id: 'leadership',
    patterns: [
      'leadership',
      'executives',
      'who runs invnt',
      'ceo',
      'management team',
      'founders'
    ],
    responses: [
      `**INVNT Leadership Team:**

👔 **Scott Cullather** — Chairman & Chief Growth Officer
👩‍💼 **Kristina McCoobery** — Chief Executive Officer
🎨 **Paul Blurton** — Chief Creative Officer
💰 **Wolf Karbe** — Chief Financial Officer
🤝 **Jerry Deeney** — Chief Client Officer
🎬 **Mike Kitson** — Chief Production Officer
⚙️ **Jim McDonald** — Chief Implementation Officer
🤖 **James Kinney** — Chief AI Officer

Plus regional Managing Directors across APAC, South Asia, and EMEA.

INVNT has been noted as a female-majority organization with strong leadership development across regions.`
    ],
    topics: ['leadership', 'team', 'executives'],
    priority: 7
  },
  
  // Government/NGO/Summits
  {
    id: 'government-ngo',
    patterns: [
      'government',
      'ngo',
      'summit',
      'conference',
      'public sector',
      'global summit'
    ],
    responses: [
      `Yes! We support **government, NGO, and global summit work**:

**COP28 (UN Climate Conference):**
- Tree of Life AI installation (288M+ impressions)
- Site activations for 70,000 daily attendees
- Climate action engagement mechanics

**Expo 2020 Dubai:**
- PepsiCo pavilions
- 24 million visitors over 6 months

We have experience working with large-scale public events, environmental/ESG initiatives, and international conferences. Our Dubai office gives us strong regional capability for government and NGO clients in the Middle East.`
    ],
    topics: ['government', 'ngo', 'summits', 'public-sector'],
    priority: 7
  },
  
  // AR/VR Experiences
  {
    id: 'ar-vr',
    patterns: [
      'ar experience',
      'vr experience',
      'augmented reality',
      'virtual reality',
      'mixed reality',
      'spatial',
      'immersive tech'
    ],
    responses: [
      `We create cutting-edge **AR/VR/MR experiences**:

**🎮 Xero — Xerovision AR Experience**
- AR treasure hunt mechanic accessed via QR code
- Microsite with mini-games, quizzes, and global leaderboard
- 59% engagement from repeat visitors

**Innovation Capabilities:**
- Augmented Reality (AR)
- Virtual Reality (VR)
- Mixed Reality (MR)
- Spatial Computing
- Virtual Experiences
- Multimedia/CGI

We blend immersive technology with brand storytelling to create interactive experiences that audiences remember.`
    ],
    topics: ['ar', 'vr', 'innovation', 'technology'],
    priority: 8
  },
  
  // Portfolio/Group Structure
  {
    id: 'portfolio-group',
    patterns: [
      'invnt group',
      'portfolio',
      'subsidiaries',
      'companies',
      'brandstory project',
      'folk hero',
      'meaning',
      'heve'
    ],
    responses: [
      `**[INVNT GROUP] — The Global BrandStory Project™**

INVNT is part of a portfolio of complementary agencies and specialist units:

🎯 **Folk Hero** — Brand Strategy
📖 **Meaning** — Culture Consultancy
🎪 **INVNT** — Live Brand Storytelling
📱 **HEVĒ** — Content/Digital Marketing
🎓 **INVNT Higher Ed** — University/Academic
📺 **ITP LIVE** — Broadcast/Live Production
⚛️ **INVNT.ATOM** — Emerging Tech/Innovation
🔮 **Hypnogram** — Creative Technology

This portfolio structure means clients get specialized expertise while maintaining seamless integration across disciplines.`
    ],
    topics: ['portfolio', 'group', 'structure'],
    priority: 7
  }
];

// ============================================
// FALLBACK RESPONSES
// ============================================

export const fallbackResponses = [
  `I'm the INVNT Engagement Engine, here to help you learn about our capabilities! 

I can tell you about:
- 🏢 What INVNT does and what makes us different
- 🎯 Our services (experiential, digital, AI, Web3, production)
- 🌍 Our global offices
- 📊 Case studies and client examples
- 👥 Our leadership team

What would you like to know?`,

  `Great question! I'd love to help, but I want to make sure I give you accurate information.

Could you rephrase that, or try asking about:
- Our AI or Web3 projects
- Our global presence and offices
- Specific case studies (COP28, Lamborghini, Xero)
- Our services and capabilities`,

  `I'm here to help you learn about INVNT®! 

Some things I can assist with:
- "What is INVNT and what makes it different?"
- "Do you do digital-only work or only live events?"
- "Give me examples of INVNT using AI in real projects"
- "Where are your offices? Do you have Dubai capability?"
- "What clients do you work with?"

Feel free to ask!`
];

// ============================================
// SUGGESTED QUESTIONS
// ============================================

export const suggestedQuestions = [
  "What is INVNT and what makes it different from other agencies?",
  "Do you do digital-only work or only live events?",
  "Give me examples of INVNT using AI in real projects",
  "Have you done Web3/NFT work for luxury brands?",
  "Where are your offices? Do you have a presence in Dubai?",
  "What's an example of an internal employee event you've run?",
  "Do you have a Higher Ed practice? Give an example",
  "List some clients you've worked with—tech, automotive, and CPG",
  "Have you done events at 70,000/day scale?",
  "Do you support government/NGO or global summits?"
];

// ============================================
// GREETING MESSAGE
// ============================================

export const greetingMessage = `👋 **Welcome to the INVNT Engagement Engine!**

I'm here to help you learn about INVNT® — a global brand storytelling agency on a mission to **"Put a Brand on the Moon™"**.

**Quick links to explore:**
- 🏢 Company overview & differentiation
- 🎯 Services & capabilities (experiential, digital, AI, Web3)
- 🌍 Global offices (11 locations, 7 countries)
- 📊 Case studies & success metrics
- 👥 Leadership & culture

**Try asking:**
_"What does INVNT mean by AI + experiential?"_
_"Do you build AI installations?"_
_"Have you done Web3/NFT work for luxury brands?"_

How can I help you today?`;
