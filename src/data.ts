import { Restaurant } from './types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'gidan-arewa',
    name: 'Gidan Arewa (Arewa Palace)',
    cuisine: 'Traditional Hausa Kitchen',
    rating: 4.9,
    deliveryTime: 20,
    tags: ['Halal', 'Traditional'],
    logoText: 'GA',
    address: 'Suite 12, Gidan Arewa Complex, Kano',
    opens: '8:00am',
    closes: '9:30pm',
    image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=800&q=80',
    dishes: [
      {
        id: 'ga-masa',
        name: 'GOLDEN WAINA (MASA) WITH MIYAN TAUSHE',
        description: 'Lightly fermented golden pan-fried rice cakes served with rich sweet-savory pumpkin peanut stew (Miyan Taushe) enriched with mutton and wild spinach.',
        price: 2400,
        image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80',
        category: 'Mains'
      },
      {
        id: 'ga-tuwo',
        name: 'TUWO SHINKAFA & FRESH MIYAN KUKA',
        description: 'Soft, smoothly mashed white rice swallow served with traditional baobab leaf soup (Miyan Kuka), slow-cooked with dry fish, locust beans, and goat meat.',
        price: 2800,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
        category: 'Mains'
      },
      {
        id: 'ga-fura',
        name: 'CHILLED FURA DA NONO BOWL',
        description: 'Traditional spiced millet flour balls mashed thoroughly into rich, premium thick local cow milk yoghurt. Served cold with a hint of ginger and sugarcane.',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
        category: 'Drinks'
      },
      {
        id: 'ga-dambu',
        name: 'RELIABLE DAMBUN NAMA FLOSS',
        description: 'Thoroughly shredded, spiced, and deep-fried tender dried beef floss. An iconic Hausa savory snack with a fine, melt-in-mouth texture.',
        price: 3200,
        image: 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&w=600&q=80',
        category: 'Snacks'
      }
    ]
  },
  {
    id: 'kano-suya-palace',
    name: 'Kano Suya Palace (Mai Suya)',
    cuisine: 'Arewa Flame BBQ',
    rating: 4.8,
    deliveryTime: 15,
    tags: ['Halal', 'Spicy'],
    logoText: 'KS',
    address: 'Post Office Road, Kano / 12 Admiralty Way, Lekki, Lagos',
    opens: '4:00pm',
    closes: '11:00pm',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    dishes: [
      {
        id: 'ks-suya',
        name: 'SIGNATURE TSALI BEEF SUYA SKEWER',
        description: 'Tender premium thin slices of prime beef skewered and roasted on charcoal heat, lavishly rubbed with freshly milled groundnut oil and yaji red-chili spice blend.',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&w=600&q=80',
        category: 'Mains'
      },
      {
        id: 'ks-balangu',
        name: 'BALANGU SLOW-ROASTED SPECIAL RAM',
        description: 'Authentic slow-smoked juicy chunks of seasoned ram meat grilled over logs, seasoned beautifully with local wild herbs and onions.',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80',
        category: 'Mains'
      },
      {
        id: 'ks-kilishi',
        name: 'SPICY DRIED KILISHI SHEETS',
        description: 'Arewa-style jerky meat sheets coated in a spicy peanut paste paste infusion, naturally sun-dried and flame-flashed.',
        price: 4000,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        category: 'Snacks'
      },
      {
        id: 'ks-kunun-zaki',
        name: 'KUNUN ZAKI (SPICED MILLET NECTAR)',
        description: 'Sweet, smooth, rich and nourishing beverage brewed carefully from fermented millet grain, sweet potatoes, cloves, and ginger.',
        price: 1000,
        image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80',
        category: 'Drinks'
      }
    ]
  },
  {
    id: 'bukkah-hut',
    name: 'Bukkah Palace & Local Fusion',
    cuisine: 'Traditional Nigerian',
    rating: 4.7,
    deliveryTime: 25,
    tags: ['Halal', 'Spicy'],
    logoText: 'BP',
    address: '45, Isaac John Street, Ikeja, Lagos',
    opens: '9:00am',
    closes: '10:00pm',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80',
    dishes: [
      {
        id: 'bp-jollof',
        name: 'SMOKY AREWA JOLLOF FEAST',
        description: 'Golden spiced firewood Jollof rice cooked in high cattle-bone stock, topped with succulent slow-grilled chicken and plantains.',
        price: 3200,
        image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80',
        category: 'Mains'
      },
      {
        id: 'bp-pounded-yam',
        name: 'SMOOTH FLUFFY POUNDED YAM & EGUSI',
        description: 'Perfect classic pounded yam served with thick Egusi stew studded with assorted smoked meats and rich local leafy greens.',
        price: 3900,
        image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80',
        category: 'Mains'
      },
      {
        id: 'bp-peppered-dodo',
        name: 'PEPPERED GIZZARD & CARAMEL DODO',
        description: 'Golden caramel pan-fried plantains tossed together with spicy seasoned turkey gizzard chunks in chili onions sauce.',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        category: 'Starters'
      }
    ]
  },
  {
    id: 'oasis-smoothies',
    name: 'Arewa Oasis Drinks & Cups',
    cuisine: 'Naturally Nourishing',
    rating: 4.6,
    deliveryTime: 18,
    tags: ['Halal', 'Vegan'],
    logoText: 'AO',
    address: '22, Toyin Street, Ikeja, Lagos',
    opens: '8:00am',
    closes: '10:00pm',
    image: 'https://images.unsplash.com/photo-1622597467836-f38240662c8c?auto=format&fit=crop&w=800&q=80',
    dishes: [
      {
        id: 'ao-kunun-aya',
        name: 'SWEET KUNUN AYA (TIGERNUT MILK)',
        description: 'An elegant spiced tiger nut milk blended smooth with dry coconut flakes, sweet dates, cardamom, and ginger. 100% dairy-free, refreshing and thick.',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
        category: 'Drinks'
      },
      {
        id: 'ao-zobo',
        name: 'PREMIUM GINGER ZOBO SPRITZER',
        description: 'Rich dark crimson brewed hibiscus leaf elixir infused heavily with ground hot ginger, sweet pineapple rinds, and cloves.',
        price: 1000,
        image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80',
        category: 'Drinks'
      },
      {
        id: 'ao-dates',
        name: 'STUFFED DATES & COCONUT FLOSS',
        description: 'Imported sweet soft dates pitted and stuffed with roasted almond kernels and finished with light powdered coconut.',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
        category: 'Snacks'
      }
    ]
  }
];
