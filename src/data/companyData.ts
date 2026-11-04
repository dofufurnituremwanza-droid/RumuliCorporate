export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'Power & Substations' | 'Transmission & Distribution' | 'Telecommunications & ICT' | 'Civil & Industrial';
  location: string;
  period?: string;
  summary: string;
  scope: string[];
  image: string;
  featured?: boolean;
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  iconName: string;
  capabilities: string[];
  standards: string[];
}

export interface Credential {
  id: string;
  name: string;
  issuingBody: string;
  referenceNo?: string;
  category: string;
  description: string;
}

export const COMPANY_INFO = {
  brandName: 'RUMULI CORPORATE',
  legalName: 'RUMULI ENGINEERING & LIVE LINE TECHNOLOGY LIMITED',
  shortName: 'Rumuli Engineering',
  slogan: 'FOR A BETTER, SAFER TOMORROW.',
  positioning: 'Engineering & Procurement',
  establishedYear: '2016',
  registrationNumber: '123062',
  country: 'Tanzania',
  headquarters: 'Dar es Salaam, Tanzania',
  
  address: {
    physical: 'Bagamoyo Road, Tegeta Azania, Chief House Building, 3rd Floor',
    city: 'Dar es Salaam',
    country: 'Tanzania',
    postalBox: 'P.O. Box 79115, Dar es Salaam, Tanzania',
  },
  
  phones: {
    primary: '+255 788 989889',
    secondary: [
      '+255 758 730903',
      '+255 763 341427',
      '+255 718 026 787'
    ]
  },
  
  emails: {
    corporate: 'info@rumuli.co.tz',
    secondary: 'rumuli2016@gmail.com'
  },
  
  website: 'www.rumuli.co.tz',
  logoUrl: '/logo.png',
  logoWhiteUrl: '/logo-white.png',
  logoIconUrl: '/logo-icon.png',
  logoOriginalUrl: 'https://i.postimg.cc/XX63XyJs/102795.png',
  
  vision: 'To be a dynamic and leading power services company locally and internationally.',
  mission: 'To consult for, construct, supply and maintain comprehensive, premium-quality civil, building, electrical and electronic works, telecommunications and ICT engineering.',
  
  values: [
    {
      title: 'Trust & Integrity',
      description: 'Conducting every business operation and technical assignment with absolute honesty, transparency, and adherence to professional ethics.'
    },
    {
      title: 'Efficiency & Accountability',
      description: 'Taking ownership of delivery outcomes, optimising project resources, and upholding the highest standards of professional responsibility.'
    },
    {
      title: 'Innovation in Meeting Requirements',
      description: 'Deploying modern engineering methods, live-line maintenance technologies, and smart procurement solutions to resolve complex client challenges.'
    },
    {
      title: 'Commitment to Milestones',
      description: 'Strict adherence to project schedules, safety baselines, and quality milestones from preliminary surveys through to final commissioning.'
    }
  ],

  stats: [
    { label: 'Founded', value: '2016' },
    { label: 'Registration No.', value: '123062' },
    { label: 'Core Engineering Sectors', value: '7' },
    { label: 'Safety Record', value: 'Zero Harm' },
  ]
};

export const SERVICES: ServiceDetail[] = [
  {
    id: 'electrical-engineering',
    title: 'Electrical & Electronic Engineering',
    shortDescription: 'Industrial and commercial electrical power systems, plant installations, MV/LV networks, and automated control systems.',
    fullDescription: 'Rumuli delivers comprehensive electrical and electronic engineering solutions for public utilities, commercial facilities, and heavy industrial plants. Our scope spans design, turnkey installation, power reticulation, motor control centers (MCC), panel fabrication, power quality analysis, and routine preventative maintenance.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Zap',
    capabilities: [
      'Low & Medium Voltage (LV/MV) electrical distribution boards',
      'Industrial motor control centers (MCC) and automation systems',
      'Commercial building electrical installations and emergency backup',
      'Power quality analysis, harmonics mitigation, and energy audits',
      'Industrial grounding, lightning protection, and surge suppression',
      'Testing, inspection, and certification of existing electrical installations'
    ],
    standards: ['IEC 60364', 'BS 7671', 'TBS / Tanesco Guidelines']
  },
  {
    id: 'transmission-distribution',
    title: 'Transmission & Distribution Networks',
    shortDescription: 'Overhead power line construction, conductor stringing, pole/tower erection, and rural distribution networks up to 220kV.',
    fullDescription: 'We specialize in the full lifecycle execution of overhead and underground power transmission and distribution lines. From route surveying, right-of-way clearance, foundation excavations, tower and pole erection to conductor stringing and grid synchronization, Rumuli provides reliable power connectivity across urban centers and rural territories.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Activity',
    capabilities: [
      'Construction of 11kV, 33kV, 132kV, and 220kV transmission lines',
      'Wooden pole, concrete pole, and steel lattice tower erections',
      'Conductor tension stringing and sag optimization',
      'Overhead ground wire (OPGW) installation and jointing',
      'Rural electrification scheme extensions and transformer installations',
      'Power line route alignment, profiling, and right-of-way management'
    ],
    standards: ['IEC 60826', 'Tanesco Transmission Standards', 'REA Grid Codes']
  },
  {
    id: 'substations-live-line',
    title: 'Substations & Live Line Works',
    shortDescription: 'Substation civil & electrical works, power transformers, 220kV reactors, switchgear, and live-line maintenance technologies.',
    fullDescription: 'Our substation division executes high-voltage substation projects up to 220kV, incorporating civil foundation works, steel gantry fabrication, power transformer positioning, switchgear assembly, protection relays, and control cabling. Additionally, Rumuli possesses specialized capability in live-line maintenance, enabling work on energized lines without interrupting critical consumer power.',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Cpu',
    capabilities: [
      'EPC construction of 220/33kV and 33/11kV electrical substations',
      'Testing, commissioning, and oil filtration for power transformers and reactors',
      'High-voltage switchgear, SF6 circuit breakers, and isolator installation',
      'Substation protection panels, SCADA interfaces, and DC auxiliary systems',
      'Live-line maintenance and hot-stick operations on energized networks',
      'Substation yard civil works, transformer plinths, and perimeter fencing'
    ],
    standards: ['IEC 61936', 'IEC 62271', 'Live Line Safety IEEE 516']
  },
  {
    id: 'civil-building',
    title: 'Civil & Building Engineering',
    shortDescription: 'Structural concrete foundations, industrial building works, heavy plant plinths, drainage, and utility infrastructure.',
    fullDescription: 'Rumuli delivers robust civil engineering works designed to support heavy mechanical and electrical infrastructure. Our civil division undertakes industrial facilities, substation earthworks, drainage systems, reinforced concrete foundations, equipment plinths, commercial buildings, and access roads.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Building',
    capabilities: [
      'Heavy structural concrete foundations for transformers, generators, and reactors',
      'Commercial building construction, renovation, and structural modifications',
      'Substation control rooms, switchgear halls, and blast-resistant walls',
      'Earthworks, site leveling, stormwater drainage, and perimeter security walls',
      'Trenching, cable ducts, manholes, and utility service conduits',
      'Quality control, concrete compressive strength testing, and soil compaction analysis'
    ],
    standards: ['BS 8110', 'Eurocode 2', 'Tanzania Building Regulations']
  },
  {
    id: 'telecoms-ict',
    title: 'Telecommunications & ICT',
    shortDescription: 'Fiber optic network deployment, cellular tower infrastructure, BTS electrical installations, and enterprise data cabling.',
    fullDescription: 'We provide mission-critical telecommunications infrastructure for major telecom operators, enterprises, and public agencies. Our capabilities include underground fiber optic cable ducting, pneumatic cable blowing, fusion splicing, cellular tower site civil and electrical preparation, DC power systems, and enterprise data networks.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Radio',
    capabilities: [
      'Underground fiber optic cable trenching, HDPE duct installation, and blowing',
      'Fiber optic fusion splicing, OTDR testing, and structured optical distribution',
      'Cellular tower site civil works, grounding rings, and antenna mast erection',
      'Base Transceiver Station (BTS) electrical installation, battery backup, and hybrid power',
      'Enterprise structured cabling, server racks, and data center electrical distribution',
      'CCTV surveillance, access control, and unified security network deployment'
    ],
    standards: ['ITU-T Recommendations', 'TIA/EIA-568', 'Vodacom & Airtel Engineering Standards']
  },
  {
    id: 'mechanical-engineering',
    title: 'Mechanical Engineering',
    shortDescription: 'Industrial plant maintenance, high-capacity pump systems, motor rewinding, dynamic balancing, and piping networks.',
    fullDescription: 'Our mechanical engineering team supports industrial utilities, manufacturing facilities, and municipal water authorities. We offer precision services including dynamic balancing, industrial electric motor rewinding, heavy pump overhaul, piping fabrication, compressor systems, and preventative mechanical reliability maintenance.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Wrench',
    capabilities: [
      'Industrial pump station mechanical overhaul, alignment, and commissioning',
      'High-voltage and low-voltage electric motor rewinding and refurbishment',
      'Dynamic rotor balancing, vibration analysis, and predictive condition monitoring',
      'Industrial process piping, valve manifolds, and pressure testing',
      'Overhead crane inspection, hoist maintenance, and mechanical lifting systems',
      'Factory preventative maintenance shutdown planning and mechanical overhauls'
    ],
    standards: ['ISO 10816 Vibration Standards', 'ASME B31.3', 'BS EN 60034']
  },
  {
    id: 'supplies-procurement',
    title: 'General Supplies & Procurement',
    shortDescription: 'Certified procurement and supply of heavy electrical equipment, conductors, transformers, switchgear, and safety equipment.',
    fullDescription: 'Leveraging established global supply chains and reputable manufacturers, Rumuli procures and supplies certified electrical, mechanical, and civil engineering materials. We ensure compliance with national standards, rigorous quality control, timely logistics, and competitive pricing for infrastructure projects.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    iconName: 'PackageCheck',
    capabilities: [
      'Power and distribution transformers (oil-immersed and dry-type)',
      'Overhead conductors (ACSR, AAAC, ABC) and underground MV/LV power cables',
      'Porcelain and composite suspension insulators, surge arresters, and drop-out fuses',
      'Medium and high-voltage circuit breakers, disconnectors, and instrument transformers',
      'Personal Protective Equipment (PPE), live-line hot sticks, and lineman safety gear',
      'Custom steel crossarms, pole hardware, stay sets, and earthing materials'
    ],
    standards: ['TBS Quality Certification', 'IEC Manufacturing Standards', 'ISO 9001 Sourcing']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'lugoba-power-line',
    title: 'Construction of 33kV Line & 315kVA Transformer Installation',
    client: 'TANESCO (Tanzania Electric Supply Company Limited)',
    category: 'Power & Substations',
    location: 'Lugoba, Coast (Pwani) Region, Tanzania',
    summary: 'Turnkey construction of a 1.3km 33kV overhead distribution line and complete installation and energization of a 315kVA step-down distribution transformer.',
    scope: [
      'Route survey, pegging, and pole hole excavation along designated corridor',
      'Erection of treated creosote wooden poles and galvanized steel crossarms',
      'Stringing and tensioning of 33kV aluminum conductor steel reinforced (ACSR)',
      'Installation of 315kVA 33/0.4kV oil-immersed transformer on sturdy H-pole platform',
      'Surge arrester protection, drop-out fuse cutouts, and low-voltage feeder pillar integration',
      'Earth mat resistance testing, insulation resistance testing, and commissioning with TANESCO'
    ],
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'reactor-testing-singida-shinyanga',
    title: 'Testing & Commissioning of 220kV Reactors at Switchyards',
    client: 'TANESCO',
    category: 'Power & Substations',
    location: 'Singida & Shinyanga Switchyards, Tanzania',
    summary: 'High-voltage diagnostic testing, insulation verification, and final commissioning of 220kV shunt reactors to stabilize grid voltage across the national transmission spine.',
    scope: [
      'Pre-commissioning electrical testing on 220kV shunt reactors',
      'Dielectric dissipation factor (tan delta) and winding resistance measurements',
      'Transformer and reactor oil breakdown voltage testing and dissolved gas analysis (DGA)',
      'Protection relay calibration, current transformer (CT) and voltage transformer (VT) verification',
      'Tripping circuit verification and SCADA system telemetry integration',
      'Successful energization and synchronous grid parameter monitoring under load'
    ],
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'liwale-rural-electrification',
    title: 'Rural Electrification & Distribution Network Expansion',
    client: 'Rural Energy Agency (REA)',
    category: 'Transmission & Distribution',
    location: 'Liwale District, Lindi Region, Tanzania',
    summary: 'Extensive rural grid expansion deploying medium-voltage and low-voltage distribution networks to connect underserved communities and public institutions.',
    scope: [
      'Extensive clearing of right-of-way through rugged rural terrain in Liwale District',
      'Erection of medium-voltage (33kV) and low-voltage (400/230V) pole structures',
      'Conductor stringing, aerial bundled cables (ABC), and stay wire assemblies',
      'Installation of multiple rural distribution step-down transformers',
      'Customer service connection drops and smart metering board integrations',
      'Comprehensive community electrical safety awareness and stakeholder liaison'
    ],
    image: 'https://images.unsplash.com/photo-1509390144018-eeaf650491a9?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'luguruni-substation-epc',
    title: 'Construction of 220/33kV Luguruni Substation',
    client: 'National Grid Infrastructure / EPC Arrangement',
    category: 'Power & Substations',
    location: 'Luguruni, Dar es Salaam, Tanzania',
    summary: 'Execution of critical substation works under an EPC arrangement for the major 220/33kV Luguruni Bulk Supply Point, reinforcing power reliability in the commercial capital.',
    scope: [
      'Substation civil works including transformer blast containment plinths and oil separator pits',
      'Erection of heavy galvanized steel gantries, busbar supports, and equipment structures',
      'Installation of 220kV and 33kV high-voltage switchgear and SF6 circuit breakers',
      'Cabling and termination of control, protection, and DC emergency auxiliary boards',
      'Construction of cable trenches, surface gravel surfacing, and perimeter security barrier',
      'Assistance in comprehensive inter-tripping tests and final system commissioning'
    ],
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'vodacom-electrical-infrastructure',
    title: 'Electrical Installation & Commissioning for Telecom Sites',
    client: 'Vodacom Tanzania',
    category: 'Telecommunications & ICT',
    location: 'Multiple Regional Sites, Tanzania',
    summary: 'Turnkey electrical power provisioning, automated changeover switches, backup generator integration, and surge protection across vital telecom transmission sites.',
    scope: [
      'Installation of robust commercial power intake systems and utility meter panels',
      'Automatic Mains Failure (AMF) panels and standby generator synchronization',
      'DC power rectifier systems and deep-cycle battery bank installations',
      'Precision grounding grids ensuring tower earth resistance below 5 Ohms',
      'Class I & II lightning surge protection and equipotential bonding',
      '24/7 emergency response and scheduled preventative maintenance visits'
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'airtel-power-backup',
    title: 'Telecommunications Power Systems & Maintenance',
    client: 'Airtel Tanzania',
    category: 'Telecommunications & ICT',
    location: 'Regional Hubs, Tanzania',
    summary: 'Comprehensive power stability engineering, battery backup modernization, and site power infrastructure maintenance for telecommunications hubs.',
    scope: [
      'Site audit and modernization of obsolete electrical distribution boards',
      'Deployment of high-efficiency switch-mode rectifier systems and hybrid power controls',
      'Installation and load-bank testing of industrial backup battery strings',
      'Routine electrical safety audits and grounding integrity verifications'
    ],
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    featured: false
  },
  {
    id: 'tanzania-oxygen-maintenance',
    title: 'Industrial Plant Electrical & Mechanical Maintenance',
    client: 'Tanzania Oxygen Limited (TOL Gases)',
    category: 'Civil & Industrial',
    location: 'Dar es Salaam Plant, Tanzania',
    summary: 'Plant-wide electrical switchgear servicing, heavy electric motor inspection and rewinding, and mechanical system reliability engineering for industrial gas production.',
    scope: [
      'Preventative maintenance and thermographic infrared inspection of motor control panels',
      'Overhaul and precision rewinding of high-torque industrial compressor electric motors',
      'Dynamic balancing of rotating machinery to reduce mechanical vibration and wear',
      'Calibration of safety interlocks, thermal overloads, and emergency shutdown circuits'
    ],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    featured: false
  },
  {
    id: 'dawasco-pumping-stations',
    title: 'High-Capacity Pumping Station Electrical Installations',
    client: 'Dar es Salaam Water and Sewerage Corporation (DAWASCO / DAWASA)',
    category: 'Civil & Industrial',
    location: 'Dar es Salaam Water Treatment & Booster Stations',
    summary: 'Electrical engineering, soft-starter and VFD installations, and motor control upgrades for strategic municipal water booster pumping facilities.',
    scope: [
      'Installation of medium-voltage motor control gear and variable frequency drives (VFDs)',
      'Upgrading electrical cabling and switchboards serving critical water booster pumps',
      'Integration of automatic power factor correction (APFC) capacitor banks',
      'Emergency diesel generator transfer switch testing and preventive maintenance'
    ],
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    featured: false
  },
  {
    id: 'serena-hotel-power-upgrades',
    title: 'Commercial Facility Electrical Infrastructure & Backup Upgrades',
    client: 'Serena Hotel',
    category: 'Civil & Industrial',
    location: 'Dar es Salaam, Tanzania',
    summary: 'Turnkey upgrade of commercial power distribution networks, automated backup changeover systems, and energy efficiency optimization for luxury hospitality operations.',
    scope: [
      'Low-noise, high-reliability commercial electrical panel revamping and sub-metering',
      'Seamless synchronization controls between utility mains and backup generators',
      'Comprehensive lighting and building services electrical compliance inspection',
      'Uninterrupted execution scheduled around hotel guest operational hours'
    ],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    featured: false
  }
];

export const CREDENTIALS: Credential[] = [
  {
    id: 'cert-incorp',
    name: 'Certificate of Incorporation',
    issuingBody: 'Business Registrations and Licensing Agency (BRELA), Tanzania',
    referenceNo: 'No. 123062',
    category: 'Statutory Corporate Entity',
    description: 'Formal incorporation certifying Rumuli Engineering & Live Line Technology Limited as a registered private limited company established in the United Republic of Tanzania in 2016.'
  },
  {
    id: 'crb-electrical',
    name: 'CRB Certificate of Electrical Contractor Works',
    issuingBody: 'Contractors Registration Board (CRB), Tanzania',
    referenceNo: 'CRB Registered Contractor',
    category: 'Professional Construction & Engineering Licence',
    description: 'Accreditation as a certified electrical contractor authorizing the execution of complex public and private electrical installations, substations, and plant engineering in Tanzania.'
  },
  {
    id: 'crb-powerline',
    name: 'CRB Certificate of Power Line and Substation Systems',
    issuingBody: 'Contractors Registration Board (CRB), Tanzania',
    referenceNo: 'Specialized Category Accreditation',
    category: 'High-Voltage Infrastructure Licensure',
    description: 'Specialist certification permitting overhead transmission and distribution line construction, live line maintenance, and high-voltage electrical substation development.'
  },
  {
    id: 'business-licence',
    name: 'Municipal Business Licence',
    issuingBody: 'Kinondoni Municipal Council / Ministry of Industry and Trade',
    referenceNo: 'Valid Annual Trade Permit',
    category: 'Commercial Operation Permit',
    description: 'Official authorization for operating engineering consultancy, general construction contracting, and specialized technical procurement services in Dar es Salaam.'
  },
  {
    id: 'tin-cert',
    name: 'Taxpayer Identification Number (TIN) Certificate',
    issuingBody: 'Tanzania Revenue Authority (TRA)',
    referenceNo: 'TRA Verified Entity',
    category: 'Tax Compliance & Registration',
    description: 'Registration verifying legal entity taxpayer identification for domestic and international commercial and governmental transactions.'
  },
  {
    id: 'vat-reg',
    name: 'VAT Registration Certificate',
    issuingBody: 'Tanzania Revenue Authority (TRA)',
    referenceNo: 'VAT Registered Entity',
    category: 'Indirect Taxation Compliance',
    description: 'Value Added Tax registration for invoicing on public sector, industrial, and commercial engineering contracts across Tanzania.'
  },
  {
    id: 'tra-clearance',
    name: 'TRA Tax Clearance Certificate',
    issuingBody: 'Tanzania Revenue Authority (TRA)',
    referenceNo: 'Current Fiscal Standing',
    category: 'Fiscal Integrity & Good Standing',
    description: 'Formal confirmation that Rumuli Engineering has fulfilled all tax returns and assessment obligations, required for participation in major government tenders.'
  },
  {
    id: 'ewura-cert',
    name: 'EWURA Registration Certificates',
    issuingBody: 'Energy and Water Utilities Regulatory Authority (EWURA)',
    referenceNo: 'Regulated Electricity Service Provider',
    category: 'Utility Sector Compliance',
    description: 'Statutory registration with Tanzania\'s energy regulator for personnel and contractors executing electrical installations connected to national power networks.'
  }
];

export const CLIENT_LOGOS = [
  { name: 'TANESCO', description: 'Tanzania Electric Supply Company Limited' },
  { name: 'REA', description: 'Rural Energy Agency' },
  { name: 'Vodacom Tanzania', description: 'Telecommunications' },
  { name: 'Airtel Tanzania', description: 'Telecommunications' },
  { name: 'TOL Gases', description: 'Tanzania Oxygen Limited' },
  { name: 'DAWASA', description: 'Dar es Salaam Water & Sewerage Authority' },
  { name: 'Serena Hotels', description: 'Hospitality & Commercial Infrastructure' }
];

export const MANAGEMENT_TEAM = [
  {
    name: 'Managing Director & Principal Executive',
    role: 'Executive Leadership & Strategy',
    department: 'Corporate Governance',
    bio: 'Oversees strategic growth, regulatory compliance, client partnerships, and company-wide execution integrity for Rumuli Engineering.'
  },
  {
    name: 'Technical Director — Power & Engineering',
    role: 'Head of Engineering & Technical Operations',
    department: 'Electrical & Power Infrastructure',
    bio: 'Directs substation EPC execution, high-voltage transmission projects, grid synchronization, and specialized live-line methodology.'
  },
  {
    name: 'Senior Project Manager — Infrastructure',
    role: 'Field Operations & Delivery Oversight',
    department: 'Project Delivery & Contract Execution',
    bio: 'Manages turnkey project timelines, site engineers, resource scheduling, and milestone adherence across regional assignments.'
  },
  {
    name: 'Head of Quality, Health, Safety & Environment',
    role: 'HSE & Regulatory Compliance Lead',
    department: 'HSE & Risk Mitigation',
    bio: 'Enforces Zero-Harm safety standards, Job Safety Analysis (JSA), environmental preservation, and national compliance guidelines.'
  }
];

export interface EquipmentItem {
  id: string;
  name: string;
  specification?: string;
  registration?: string;
}

export interface EquipmentGroup {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  count: number;
  items: EquipmentItem[];
}

export const COMPANY_EQUIPMENT_GROUPS: EquipmentGroup[] = [
  {
    id: 'hand-tools',
    title: 'Hand Tools',
    subtitle: 'Essential Rigging, Termination & Mechanical Field Kits',
    iconName: 'Wrench',
    count: 7,
    items: [
      { id: 'ht-1', name: 'Flat and star screw drivers' },
      { id: 'ht-2', name: 'Spanner sets (Imperial & Metric)' },
      { id: 'ht-3', name: 'Hammers & mallets' },
      { id: 'ht-4', name: 'Ladders (Aluminium & insulated fiber extension ladders)' },
      { id: 'ht-5', name: 'Technician tools with complete accessories' },
      { id: 'ht-6', name: 'Soldering guns & electronic repair kits' },
      { id: 'ht-7', name: 'Hand drill machines' }
    ]
  },
  {
    id: 'instruments',
    title: 'Electrical and Mechanical Instruments',
    subtitle: 'Calibrated Substation, Transformer & Protective Relay Testing Equipment',
    iconName: 'Cpu',
    count: 15,
    items: [
      { id: 'inst-1', name: "MultiMate's M2006-AVO", specification: 'High-precision multimeter testing kit' },
      { id: 'inst-2', name: 'Micro ohmmeter', specification: 'For measuring contact resistances of circuit breakers' },
      { id: 'inst-3', name: 'Earth resistance meter', specification: 'MEGGER ET6/3' },
      { id: 'inst-4', name: 'Secondary Injection kit', specification: 'Sverker 760' },
      { id: 'inst-5', name: 'Insulation resistance meter', specification: 'MEGGER BM 12' },
      { id: 'inst-6', name: 'Variable DC power supply', specification: 'Stabilized benchtop and field power supply' },
      { id: 'inst-7', name: 'Three-Phase Variac (Threasevariac)', specification: 'T210 variable transformer' },
      { id: 'inst-8', name: 'DC pressure kit', specification: 'High-voltage insulation and withstand pressure testing' },
      { id: 'inst-9', name: 'Grooser cable fault locator', specification: 'For locating earth faults and shorts on power cables' },
      { id: 'inst-10', name: 'Magnus Step-up transformer unit', specification: 'Specialized testing voltage step-up unit' },
      { id: 'inst-11', name: 'Oil Dielectric strength test kit', specification: 'Type Foster 60sx for insulating oil breakdown testing' },
      { id: 'inst-12', name: 'Breaker System analyzer', specification: 'Timing, velocity, and trip-close dynamic testing' },
      { id: 'inst-13', name: 'Transformer Winding resistance meter', specification: 'Precision dual-channel DC winding resistance' },
      { id: 'inst-14', name: 'Earth leakage tester', specification: 'Type AVO 300DCM' },
      { id: 'inst-15', name: 'Odean Primary Injection kit', specification: 'High-current primary injection testing kit' }
    ]
  },
  {
    id: 'light-machines',
    title: 'Light Machines',
    subtitle: 'Workshop Fabrication, Metalworking & Utility Pumps',
    iconName: 'Hammer',
    count: 5,
    items: [
      { id: 'lm-1', name: 'Drilling machines (Hand and Table type)' },
      { id: 'lm-2', name: 'Grinder machine' },
      { id: 'lm-3', name: 'Welding machine (Heavy-duty arc welding unit)' },
      { id: 'lm-4', name: 'Compressor (Industrial air compressor)' },
      { id: 'lm-5', name: 'Water pump (Submersible & dewatering pump)' }
    ]
  },
  {
    id: 'plants-transport',
    title: 'Plants and Transport',
    subtitle: 'Company-Owned Field Mobilization Fleet & Heavy Workhorse Tractor',
    iconName: 'Truck',
    count: 6,
    items: [
      { id: 'pt-1', name: 'Portable generator HONDA BE 1900', specification: '5 kVA site power unit' },
      { id: 'pt-2', name: 'MITSUBISH - Pickup', registration: 'T 203 AKS' },
      { id: 'pt-3', name: 'TOYOTA VAN', registration: 'T 500 AMA' },
      { id: 'pt-4', name: 'TOYOTA CRV', registration: 'T 287 AQR' },
      { id: 'pt-5', name: 'MTRACTOR, FORD TW 25', specification: 'Heavy-duty agricultural & line-clearing tractor' },
      { id: 'pt-6', name: 'TOYOTA HILUX D/CABIN', registration: 'T 689 CXS' }
    ]
  }
];

export const EQUIPMENT_ON_DEMAND_NOTE = {
  headline: 'Instant Heavy Machinery Mobilization',
  content: 'NB: Other equipment not listed above, such as big trucks and cranes, are available for hire almost instantly through our vetted plant hire agreements.'
};


