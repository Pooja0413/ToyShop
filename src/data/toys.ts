import { ToyProduct } from '../types/toy';

export const HERO_IMAGE = '/src/assets/images/hero_toy_atelier_1791175406393.jpg';

export const TOY_PRODUCTS: ToyProduct[] = [
  {
    id: 'toy-wooden-train',
    name: 'Artisan Magnetic Rail Express',
    subtitle: 'Modular Steam Locomotive & Freight Carriages',
    category: 'wooden',
    categoryLabel: 'Wooden Heirlooms',
    price: 68.00,
    originalPrice: 78.00,
    ageRange: 'Ages 3–7',
    ageGroup: '3-5',
    piecesCount: 16,
    materials: 'Solid FSC European Beechwood, Walnut & Hidden Neodymium Magnets',
    dimensions: '42 cm × 6.5 cm × 7.8 cm',
    safetyCertifications: ['EN71 European Safety', 'ASTM F963 US Standard', 'Saliva-Safe Waterborne Finish'],
    description: 'Turn playroom floors into grand scenic railways. Each carriage is turned by hand from sustainably harvested beech and finished with non-toxic botanical oils. Hidden magnetic couplings allow easy, satisfying clicks and reverse configurations.',
    playBenefits: [
      'Encourages spatial navigation & motor coordination',
      'Open-ended storytelling and cooperative track building',
      'Tactile appreciation of natural solid grain textures'
    ],
    imageUrl: '/src/assets/images/toy_wooden_train_1791175418203.jpg',
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    isBestseller: true,
    engravable: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Evelyn Montgomery',
        relation: 'Parent of 4-year-old',
        rating: 5,
        date: 'October 2, 2026',
        title: 'Heirloom quality that will outlive plastic toys',
        comment: 'The weight of the beechwood is substantial and smooth without any rough edges. The magnetic clicks are gentle yet hold firmly when taking curves. We had Oliver’s name engraved on the tender car and it looks stunning.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Julian Vance',
        relation: 'Preschool Teacher',
        rating: 5,
        date: 'September 24, 2026',
        title: 'Classroom tested for endless hours',
        comment: 'Survives energetic play day after day. The wheels roll silent and silky smooth across both hardwood and low pile rugs.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-retro-robot',
    name: 'Cogsworth Mechanical Windup Robot',
    subtitle: 'Clockwork Automaton with Exposed Brass Gears',
    category: 'stem',
    categoryLabel: 'STEM & Wonder',
    price: 46.00,
    ageRange: 'Ages 5–10',
    ageGroup: '6-8',
    piecesCount: 1,
    materials: 'Pressed Matte Tin, Solid Brass Cogs & Internal Spring Motor',
    dimensions: '18 cm × 9 cm × 6 cm',
    safetyCertifications: ['ASTM F963 Compliant', 'Lead-Free & Cadmium-Free Non-Toxic Enamel'],
    description: 'A nostalgic homage to mid-century mechanical innovation. Turn the vintage butterfly winding key to awaken Cogsworth: his internal brass escapement clicks steadily into motion as he strides forward with gentle mechanical cadence.',
    playBenefits: [
      'Introduces mechanical physics & kinetic spring energy',
      'Inspires curiosity regarding how gear reductions function',
      'Screen-free tactile cause-and-effect fascination'
    ],
    imageUrl: '/src/assets/images/toy_retro_robot_1791175430292.jpg',
    rating: 4.8,
    reviewCount: 38,
    inStock: true,
    isNew: true,
    engravable: true,
    reviews: [
      {
        id: 'rev-3',
        author: 'Arthur Sterling',
        relation: 'Grandparent of 6-year-old',
        rating: 5,
        date: 'September 29, 2026',
        title: 'Reminds me of childhood with better craftsmanship',
        comment: 'Bought this for my grandson Leo. He was fascinated watching the tiny brass gears interlock through the side inspection slot.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-linen-bunny',
    name: 'Flora Heirloom Linen Bunny',
    subtitle: 'Hand-Stitched Organic Companion with Knitted Scarf',
    category: 'plush',
    categoryLabel: 'Soft Companions',
    price: 52.00,
    ageRange: 'Ages 0+',
    ageGroup: '0-2',
    piecesCount: 2,
    materials: '100% GOTS Certified Organic Linen, Recycled Hypoallergenic Fiberfill & Merino Scarf',
    dimensions: '32 cm height × 12 cm width',
    safetyCertifications: ['OEKO-TEX Standard 100 Class 1', 'Safe from Newborn Birth (0m+)', 'Double-Reinforced Seams'],
    description: 'Flora is designed to become a lifelong childhood confidante. Stitched from pre-washed Lithuanian flax linen that grows softer with every cuddle. Features delicately hand-embroidered facial features safe for newborns.',
    playBenefits: [
      'Sensory calming through natural breathable flax linen',
      'Encourages emotional empathy and bedtime comfort',
      'Machine washable gentle cycle for everyday life'
    ],
    imageUrl: '/src/assets/images/toy_linen_bunny_1791175440391.jpg',
    rating: 5.0,
    reviewCount: 56,
    inStock: true,
    isBestseller: true,
    engravable: true,
    reviews: [
      {
        id: 'rev-4',
        author: 'Miriam Chen',
        relation: 'Mother of 8-month-old',
        rating: 5,
        date: 'October 1, 2026',
        title: 'So soft and pure',
        comment: 'Knowing it’s certified organic and free from synthetic micro-shedding gives me complete peace of mind when my baby sleeps with Flora. Truly a work of art.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-stem-telescope',
    name: 'Celestial Stargazer Tabletop Telescope',
    subtitle: 'Brass & Walnut Optical Instrument with Star Chart',
    category: 'stem',
    categoryLabel: 'STEM & Wonder',
    price: 84.00,
    originalPrice: 95.00,
    ageRange: 'Ages 6–12',
    ageGroup: '6-8',
    piecesCount: 3,
    materials: 'Optical Coated Glass, Brushed Solid Brass & Dark Walnut Tripod',
    dimensions: '34 cm barrel length × 28 cm tripod height',
    safetyCertifications: ['Child-Safe Coated Glass Lenses', 'Shatter-Resistant Optical Barrel'],
    description: 'Open young eyes to the craters of the Moon and Saturn’s rings. Features genuine 15× optical precision lenses housed in an heirloom-grade brushed brass barrel with a smooth rack-and-pinion focus ring and beechwood tripod.',
    playBenefits: [
      'Sparks genuine scientific fascination with astronomy',
      'Teaches focus calibration and fine visual observation',
      'Includes illustrated seasonal constellation handbook'
    ],
    imageUrl: '/src/assets/images/toy_stem_telescope_1791175450871.jpg',
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    isBestseller: true,
    engravable: true,
    reviews: [
      {
        id: 'rev-5',
        author: 'Dr. Gregory Finch',
        relation: 'Parent & Astrophysicist',
        rating: 5,
        date: 'September 18, 2026',
        title: 'Remarkable optical clarity for a children instrument',
        comment: 'We observed lunar maria and Jupiter’s Galilean moons from our back garden. It is sturdy, beautifully balanced, and looks splendid on a bookshelf when not gazing into the sky.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-balance-blocks',
    name: 'Nordic Balance & Arch Stacker',
    subtitle: 'Solid Lindenwood Architectural Sculptural Blocks',
    category: 'wooden',
    categoryLabel: 'Wooden Heirlooms',
    price: 54.00,
    ageRange: 'Ages 2–6',
    ageGroup: '3-5',
    piecesCount: 24,
    materials: 'Sustainably Harvested Lindenwood & Plant-Based Water Stains',
    dimensions: '26 cm × 26 cm solid beech storage tray',
    safetyCertifications: ['ASTM F963', 'EN71 Compliant', 'Non-Toxic Matte Grain Finish'],
    description: 'Designed in the spirit of Froebel and Waldorf kindergarten pedagogies. Twenty-four precision-beveled architectural arches, keystones, and geometric pillars invite endless explorations in counterweight, balance, and gravity.',
    playBenefits: [
      'Spatial reasoning and intuitive structural engineering',
      'Open-ended imaginative worldbuilding and bridges',
      'Matte texture provides gentle friction that prevents slipping'
    ],
    imageUrl: '/src/assets/images/toy_wooden_train_1791175418203.jpg',
    rating: 4.8,
    reviewCount: 31,
    inStock: true,
    engravable: true,
    reviews: [
      {
        id: 'rev-6',
        author: 'Camilla Holm',
        relation: 'Montessori Educator',
        rating: 5,
        date: 'September 15, 2026',
        title: 'The velvety wood texture makes all the difference',
        comment: 'Unlike glossy lacquered blocks that slide off each other, these lindenwood blocks have a subtle grip that allows children to build dramatic cantilevers.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-botanical-watercolor',
    name: 'Artisan Botanical Watercolor Kit',
    subtitle: 'Natural Mineral Pigments & Hand-Tied Goat Hair Brushes',
    category: 'creative',
    categoryLabel: 'Creative Arts',
    price: 39.00,
    ageRange: 'Ages 4+',
    ageGroup: '3-5',
    piecesCount: 16,
    materials: 'Mineral & Clay Pigments, Gum Arabic, Ceramic Mixing Wells & Solid Brass Tin',
    dimensions: '20 cm × 9 cm × 2.2 cm',
    safetyCertifications: ['AP Non-Toxic Certified', 'Conforms to ASTM D-4236', 'Zero Petroleum Solvents'],
    description: 'Cultivate young artists with authentic artists’ grade pigments made exclusively from ground earth ochres, lapis lazuli, and flower extracts. Comes in an enameled brass traveler tin with a ceramic water well.',
    playBenefits: [
      'Teaches color theory through pure single-pigment blending',
      'Safe for sensitive skin and incidental mouth contact',
      'Rich, velvety lightfast watercolor washes'
    ],
    imageUrl: '/src/assets/images/hero_toy_atelier_1791175406393.jpg',
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    engravable: true,
    reviews: [
      {
        id: 'rev-7',
        author: 'Beatrice Lang',
        relation: 'Parent & Illustrator',
        rating: 5,
        date: 'September 12, 2026',
        title: 'Colors that look like the natural world',
        comment: 'No fluorescent artificial shades—these paints evoke moss, terracotta, and wild blueberries. The tin makes painting outside in the park an absolute joy.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-woodland-puzzle',
    name: 'Deep Forest 3D Layered Wood Puzzle',
    subtitle: 'Multi-Depth Laser-Cut Wildlife Ecosystem',
    category: 'puzzles',
    categoryLabel: 'Puzzles & Games',
    price: 44.00,
    ageRange: 'Ages 5–9',
    ageGroup: '6-8',
    piecesCount: 48,
    materials: '7-Layer Baltic Birch Plywood & Non-Toxic Organic Stains',
    dimensions: '28 cm × 28 cm × 2.4 cm',
    safetyCertifications: ['Formaldehyde-Free E0 Birch', 'ASTM F963 Standards'],
    description: 'Each tier of this circular puzzle reveals a deeper layer of the forest canopy—from burrowing badgers and fungal root networks beneath the soil, to deer grazing in the understory, up to owls nesting in the highest oak boughs.',
    playBenefits: [
      'Multi-dimensional tactile problem solving',
      'Teaches biological ecology and forest biodiversity',
      'Serves as decorative nursery wall art when completed'
    ],
    imageUrl: '/src/assets/images/hero_toy_atelier_1791175406393.jpg',
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    engravable: false,
    reviews: [
      {
        id: 'rev-8',
        author: 'David Thorne',
        relation: 'Parent of 7-year-old',
        rating: 5,
        date: 'August 28, 2026',
        title: 'A puzzle that stays out on display',
        comment: 'The layering concept is ingenious. My daughter spent an entire rainy afternoon piecing together the underground animal burrows.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-little-baker',
    name: 'Copper Pot & Beech Cookery Pantry Set',
    subtitle: 'Cast Aluminum Miniatures with Cotton Apron & Recipe Cards',
    category: 'wooden',
    categoryLabel: 'Wooden Heirlooms',
    price: 58.00,
    ageRange: 'Ages 3–8',
    ageGroup: '3-5',
    piecesCount: 14,
    materials: 'Food-Safe Heavy Cast Aluminum with Rose-Gold Luster, Beech Utensils & Linen Apron',
    dimensions: 'Stockpot 14 cm diameter; Utensils 18 cm length',
    safetyCertifications: ['Food-Grade Washable Standards', 'ASTM F963 Certified'],
    description: 'Inspire sensory culinary pretend play. Weighted mini pots with riveted handles and wooden spatulas give children the authentic sensation of preparing family feasts alongside parents in the kitchen.',
    playBenefits: [
      'Social role-playing and collaborative hospitality skills',
      'Fine motor dexterity with tongs, ladles, and lids',
      'Includes 6 wipe-clean pictorial seasonal recipe cards'
    ],
    imageUrl: '/src/assets/images/toy_wooden_train_1791175418203.jpg',
    rating: 4.9,
    reviewCount: 35,
    inStock: true,
    engravable: true,
    reviews: [
      {
        id: 'rev-9',
        author: 'Sora Tanaka',
        relation: 'Parent of 3 & 5-year-old',
        rating: 5,
        date: 'September 10, 2026',
        title: 'Indestructible and delightfully charming',
        comment: 'The pots have real heft to them and clink nicely without denting. My kids make simulated lavender tea for everyone every morning.',
        verified: true
      }
    ]
  }
];

export const CRAFT_PILLARS = [
  {
    title: 'Certified Forest Harvest',
    subtitle: 'FSC European Hardwoods',
    description: 'We carve solely from fallen or sustainably managed beech, maple, and linden groves in the Black Forest and Baltic basins.'
  },
  {
    title: 'Saliva-Safe Waterborne Stains',
    subtitle: '100% Non-Toxic Chemistry',
    description: 'Tested against EU EN71-3 and US ASTM F963 standards. Made with pure plant oils and vegetable waxes safe for curious teeth.'
  },
  {
    title: 'Lifetime Play & Repair Guarantee',
    subtitle: 'Heirloom Durability',
    description: 'Toys designed to survive childhood spills, drops, and passing down to younger siblings. Free wooden replacement parts on request.'
  }
];
