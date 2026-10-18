import { RestaurantWithMenu } from './types';

/**
 * Local menu data.
 *
 * This is the offline fallback and the source for supabase/seed.sql. When
 * Supabase credentials are configured the app reads from the database instead,
 * but these rows must stay accurate because they are what users see when the
 * network is down.
 *
 * Addresses are real Kano locations. Every kitchen here operates in Kano —
 * do not reintroduce Lagos addresses on Kano kitchens.
 */
export const RESTAURANTS: RestaurantWithMenu[] = [
  {
    id: 'gidan-arewa',
    name: 'Gidan Arewa (Arewa Palace)',
    cuisine: 'Traditional Hausa Kitchen',
    rating: 4.9,
    reviewCount: 2140,
    deliveryTime: 20,
    tags: ['Halal', 'Traditional'],
    logoText: 'GA',
    address: 'Zoo Road, Nassarawa, Kano State',
    city: 'Kano',
    opens: '8:00am',
    closes: '9:30pm',
    artKey: 'kitchen',
    dishes: [
      {
        id: 'ga-masa',
        name: 'Golden Waina (Masa) with Miyan Taushe',
        description:
          'Lightly fermented golden pan-fried rice cakes served with rich sweet-savoury pumpkin peanut stew (Miyan Taushe), enriched with mutton and wild spinach.',
        price: 2400,
        category: 'Mains',
        artKey: 'masa',
        spiceLevel: 1,
      },
      {
        id: 'ga-tuwo',
        name: 'Tuwo Shinkafa & Fresh Miyan Kuka',
        description:
          'Soft, smoothly mashed white rice swallow served with traditional baobab leaf soup (Miyan Kuka), slow-cooked with dry fish, locust beans and goat meat.',
        price: 2800,
        category: 'Mains',
        artKey: 'tuwo',
        spiceLevel: 2,
      },
      {
        id: 'ga-fura',
        name: 'Chilled Fura da Nono Bowl',
        description:
          'Traditional spiced millet flour balls mashed thoroughly into rich, thick local cow milk yoghurt. Served cold with a hint of ginger and sugarcane.',
        price: 1500,
        category: 'Drinks',
        artKey: 'fura',
        spiceLevel: 0,
      },
      {
        id: 'ga-dambu',
        name: 'Dambun Nama Beef Floss',
        description:
          'Thoroughly shredded, spiced and deep-fried tender dried beef floss. An iconic Hausa savoury snack with a fine, melt-in-mouth texture.',
        price: 3200,
        category: 'Snacks',
        artKey: 'dambu',
        spiceLevel: 2,
      },
    ],
  },
  {
    id: 'kano-suya-palace',
    name: 'Kano Suya Palace (Mai Suya)',
    cuisine: 'Arewa Flame BBQ',
    rating: 4.8,
    reviewCount: 1204,
    deliveryTime: 15,
    tags: ['Halal', 'Spicy'],
    logoText: 'KS',
    address: 'Post Office Road, Fagge, Kano State',
    city: 'Kano',
    opens: '4:00pm',
    closes: '11:00pm',
    artKey: 'suya',
    dishes: [
      {
        id: 'ks-suya',
        name: 'Signature Tsire Beef Suya Skewer',
        description:
          'Tender thin slices of prime beef skewered and roasted over charcoal heat, lavishly rubbed with freshly milled groundnut and yaji red-chilli spice blend.',
        price: 3500,
        category: 'Mains',
        artKey: 'suya',
        spiceLevel: 3,
      },
      {
        id: 'ks-balangu',
        name: 'Balangu Slow-Roasted Special Ram',
        description:
          'Authentic slow-smoked juicy chunks of seasoned ram grilled over logs, seasoned with local wild herbs and finished with sliced onion.',
        price: 4500,
        category: 'Mains',
        artKey: 'balangu',
        spiceLevel: 2,
      },
      {
        id: 'ks-kilishi',
        name: 'Spicy Dried Kilishi Sheets',
        description:
          'Arewa-style jerky meat sheets coated in a spicy peanut paste infusion, naturally sun-dried and flame-flashed.',
        price: 4000,
        category: 'Snacks',
        artKey: 'kilishi',
        spiceLevel: 3,
      },
      {
        id: 'ks-kunun',
        name: 'Kunun Zaki (Spiced Millet Nectar)',
        description:
          'Sweet, smooth and nourishing beverage brewed carefully from fermented millet grain, sweet potatoes and cloves.',
        price: 1000,
        category: 'Drinks',
        artKey: 'kunun',
        spiceLevel: 0,
      },
    ],
  },
  {
    id: 'bukkah-hut',
    name: 'Bukkah Palace & Local Fusion',
    cuisine: 'Traditional Nigerian',
    rating: 4.7,
    reviewCount: 876,
    deliveryTime: 25,
    tags: ['Halal', 'Spicy'],
    logoText: 'BP',
    address: 'Murtala Mohammed Way, Bompai, Kano State',
    city: 'Kano',
    opens: '9:00am',
    closes: '10:00pm',
    artKey: 'tuwo',
    dishes: [
      {
        id: 'bp-jollof',
        name: 'Smoky Arewa Jollof Feast',
        description:
          'Golden spiced firewood Jollof rice cooked in rich cattle-bone stock, topped with succulent slow-grilled chicken and plantains.',
        price: 3200,
        category: 'Mains',
        artKey: 'tuwo',
        spiceLevel: 2,
      },
      {
        id: 'bp-pounded-yam',
        name: 'Fluffy Pounded Yam & Egusi',
        description:
          'Classic pounded yam served with thick Egusi stew studded with assorted smoked meats and rich local leafy greens.',
        price: 3900,
        category: 'Mains',
        artKey: 'tuwo',
        spiceLevel: 2,
      },
      {
        id: 'bp-peppered-dodo',
        name: 'Peppered Gizzard & Caramel Dodo',
        description:
          'Golden caramel pan-fried plantains tossed with spicy seasoned turkey gizzard chunks in a chilli-onion sauce.',
        price: 2500,
        category: 'Starters',
        artKey: 'balangu',
        spiceLevel: 3,
      },
    ],
  },
  {
    id: 'oasis-smoothies',
    name: 'Arewa Oasis Drinks & Cups',
    cuisine: 'Naturally Nourishing',
    rating: 4.6,
    reviewCount: 512,
    deliveryTime: 18,
    tags: ['Halal', 'Vegan'],
    logoText: 'AO',
    address: 'France Road, Sabon Gari, Kano State',
    city: 'Kano',
    opens: '8:00am',
    closes: '10:00pm',
    artKey: 'kunun',
    dishes: [
      {
        id: 'ao-kunun-aya',
        name: 'Sweet Kunun Aya (Tigernut Milk)',
        description:
          'Spiced tigernut milk blended smooth with dry coconut flakes, sweet dates, cardamom and ginger. Dairy-free, refreshing and thick.',
        price: 1200,
        category: 'Drinks',
        artKey: 'kunun',
        spiceLevel: 0,
      },
      {
        id: 'ao-zobo',
        name: 'Premium Ginger Zobo Spritzer',
        description:
          'Rich dark crimson brewed hibiscus elixir infused heavily with ground hot ginger, sweet pineapple rinds and cloves.',
        price: 1000,
        category: 'Drinks',
        artKey: 'kunun',
        spiceLevel: 1,
      },
      {
        id: 'ao-dates',
        name: 'Stuffed Dates & Coconut Floss',
        description:
          'Sweet soft dates pitted and stuffed with roasted almond kernels, finished with light powdered coconut.',
        price: 1800,
        category: 'Snacks',
        artKey: 'fura',
        spiceLevel: 0,
      },
    ],
  },
  {
    id: 'mai-kilishi',
    name: 'Mai Kilishi Heritage House',
    cuisine: 'Dried Meat Specialists',
    rating: 4.8,
    reviewCount: 640,
    deliveryTime: 22,
    tags: ['Halal', 'Traditional'],
    logoText: 'MK',
    address: 'Kofar Wambai Market, Kano State',
    city: 'Kano',
    opens: '9:00am',
    closes: '8:00pm',
    artKey: 'kilishi',
    dishes: [
      {
        id: 'mk-kilishi-250',
        name: 'Hand-Cut Kilishi 250g Pack',
        description:
          'Paper-thin beef sheets marinated in groundnut paste and yaji, sun-dried on raffia racks and flame-finished to order.',
        price: 4800,
        category: 'Snacks',
        artKey: 'kilishi',
        spiceLevel: 3,
      },
      {
        id: 'mk-dankwa',
        name: 'Dankwa Groundnut Bites',
        description:
          'Crunchy sweet-savoury groundnut and millet bites rolled by hand, a classic Kano roadside snack.',
        price: 1400,
        category: 'Snacks',
        artKey: 'dambu',
        spiceLevel: 1,
      },
      {
        id: 'mk-gift-box',
        name: 'Sallah Kilishi Gift Set',
        description:
          'Hand-cut kilishi sheets and dankwa boxed in woven raffia with a personal note card. Ideal for Sallah gifting.',
        price: 12000,
        category: 'Snacks',
        artKey: 'kilishi',
        spiceLevel: 2,
      },
    ],
  },
  {
    id: 'waina-corner',
    name: 'Waina Corner (Masa House)',
    cuisine: 'Pan-Fired Rice Cakes',
    rating: 4.5,
    reviewCount: 388,
    deliveryTime: 14,
    tags: ['Halal', 'Vegan'],
    logoText: 'WC',
    address: 'Gwammaja Quarters, Dala, Kano State',
    city: 'Kano',
    opens: '6:00am',
    closes: '12:00pm',
    artKey: 'masa',
    dishes: [
      {
        id: 'wc-masa-six',
        name: 'Fluffy Rice Masa (6 pieces)',
        description:
          'Fermented round rice cakes fired in traditional oil pan grillers, served with yaji or honey on the side.',
        price: 1800,
        category: 'Starters',
        artKey: 'masa',
        spiceLevel: 0,
      },
      {
        id: 'wc-masa-bundle',
        name: 'Masa Morning Bundle',
        description:
          'Two dozen fresh masa with yaji, honey and a flask of hot kunun zaki — enough for the whole house.',
        price: 9800,
        category: 'Mains',
        artKey: 'masa',
        spiceLevel: 1,
      },
      {
        id: 'wc-kunun-zaki',
        name: 'Hot Kunun Zaki Flask',
        description:
          'A one-litre flask of warm spiced millet drink, brewed each morning and sweetened with dates.',
        price: 2200,
        category: 'Drinks',
        artKey: 'kunun',
        spiceLevel: 0,
      },
    ],
  },
];
