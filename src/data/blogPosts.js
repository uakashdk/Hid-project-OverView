export const BLOG_POSTS = [
  {
    slug: 'sanctuaries-of-scale',
    category: 'Studio Journal',
    date: 'June 30, 2026',
    readTime: '4 min read',
    title: 'Sanctuaries of Scale: Designing Calm in Contemporary Homes',
    excerpt:
      'A closer look at how proportion, light, and restraint turn a residence into something quieter, deeper, and more humane.',
    image: '/images/project1.png',
    intro:
      'At Habitat, we think of scale as a mood as much as a measurement. The most memorable homes rarely announce themselves loudly; they unfold with confidence, giving every room enough air to breathe and every detail enough space to matter.',
    body: [
      {
        heading: 'Why scale matters',
        paragraphs: [
          'A generous room can still feel intimate when the proportions are carefully considered. Ceiling height, window placement, and the distance between fixed elements all shape the emotional temperature of a home.',
          'In our studio, we use scale to slow things down. It is the difference between a space that is merely large and a space that feels composed.'
        ]
      },
      {
        heading: 'What we look for',
        paragraphs: [
          'We begin with light, circulation, and the way one room opens into the next. From there, we introduce materials that soften the architecture without flattening it.',
          'A restrained palette, a clear visual axis, and carefully edited furnishings let the structure lead the conversation.'
        ],
        bullets: [
          'Natural light that lands gently throughout the day',
          'Open sightlines that guide movement without noise',
          'Warm textures that keep the space from feeling severe'
        ]
      },
      {
        heading: 'The result',
        paragraphs: [
          'When scale is handled well, the architecture feels calm before it feels impressive. That calmness is what many of our clients remember long after the first visit.'
        ]
      }
    ]
  },
  {
    slug: 'material-stories',
    category: 'Studio Journal',
    date: 'June 17, 2026',
    readTime: '5 min read',
    title: 'Material Stories: Why Texture Shapes Luxury Interiors',
    excerpt:
      'Wood, stone, plaster, and metal each carry a distinct emotional weight. The right combination creates depth without clutter.',
    image: '/images/featured4.jpeg',
    intro:
      'Luxury interiors are often described in visual terms, but the real character of a room is tactile. Texture is what makes a space feel grounded, lived in, and memorable.',
    body: [
      {
        heading: 'Texture as atmosphere',
        paragraphs: [
          'Smooth surfaces reflect light differently from honed stone or woven fabric. That difference changes the way a room reads over the course of a day.',
          'We use texture to create rhythm. A quiet wall finish can make a sculptural table feel more intentional, while a richly grained timber detail can warm an otherwise minimal composition.'
        ]
      },
      {
        heading: 'Editing the palette',
        paragraphs: [
          'The goal is not to use more materials, but to use the right ones. We often combine only a few finishes and let their contrast do the work.',
          'This approach keeps the interior refined and gives each material enough visual authority to be noticed.'
        ]
      }
    ]
  },
  {
    slug: 'light-as-a-material',
    category: 'Studio Journal',
    date: 'May 29, 2026',
    readTime: '6 min read',
    title: 'Light as a Material: The Quiet Power of Daylight',
    excerpt:
      'Daylight is not an accessory in our projects. It is one of the primary materials we design with from the first sketch.',
    image: '/images/wa5.jpeg',
    intro:
      'Light shapes how we perceive scale, color, and texture. In many ways, it is the invisible structure that gives the room its final expression.',
    body: [
      {
        heading: 'Designing with the sun',
        paragraphs: [
          'Every opening is an opportunity to direct softness into the interior. We think about morning light, afternoon contrast, and how shadows move along a wall as the day changes.',
          'That awareness helps us choose finishes that respond beautifully rather than fighting against the light.'
        ]
      },
      {
        heading: 'A calmer kind of luxury',
        paragraphs: [
          'The most elegant spaces often avoid drama for its own sake. Instead, they let light reveal detail slowly and beautifully.',
          'That is the kind of luxury we keep returning to: quiet, precise, and deeply human.'
        ]
      }
    ]
  }
];

export const getBlogPostBySlug = (slug) =>
  BLOG_POSTS.find((post) => post.slug === slug);

export const getRelatedBlogPosts = (slug, limit = 2) =>
  BLOG_POSTS.filter((post) => post.slug !== slug).slice(0, limit);
