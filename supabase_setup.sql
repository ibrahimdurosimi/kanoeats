-- Create Restaurants Table
CREATE TABLE IF NOT EXISTS public.restaurants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    rating NUMERIC NOT NULL,
    delivery_time INTEGER NOT NULL,
    tags TEXT[] NOT NULL,
    logo_text TEXT NOT NULL,
    address TEXT NOT NULL,
    opens TEXT NOT NULL,
    closes TEXT NOT NULL,
    image TEXT NOT NULL
);

-- Create Dishes Table
CREATE TABLE IF NOT EXISTS public.dishes (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to restaurants" ON public.restaurants FOR SELECT USING (true);
CREATE POLICY "Allow public read access to dishes" ON public.dishes FOR SELECT USING (true);

-- Insert Data for Restaurants
INSERT INTO public.restaurants (id, name, cuisine, rating, delivery_time, tags, logo_text, address, opens, closes, image) VALUES
('gidan-arewa', 'Gidan Arewa (Arewa Palace)', 'Traditional Hausa Kitchen', 4.9, 20, ARRAY['Halal', 'Traditional'], 'GA', 'Suite 12, Gidan Arewa Complex, Kano / 38, Jibowu Street, Lagos', '8:00am', '9:30pm', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'),
('kano-suya-palace', 'Kano Suya Palace (Mai Suya)', 'Arewa Flame BBQ', 4.8, 15, ARRAY['Halal', 'Spicy'], 'KS', 'Post Office Road, Kano / 12 Admiralty Way, Lekki, Lagos', '4:00pm', '11:00pm', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80'),
('bukkah-hut', 'Bukkah Palace & Local Fusion', 'Traditional Nigerian', 4.7, 25, ARRAY['Halal', 'Spicy'], 'BP', '45, Isaac John Street, Ikeja, Lagos', '9:00am', '10:00pm', 'https://images.unsplash.com/photo-1516100882582-76c9a386d63c?auto=format&fit=crop&w=600&q=80'),
('oasis-smoothies', 'Arewa Oasis Drinks & Cups', 'Naturally Nourishing', 4.6, 18, ARRAY['Halal', 'Vegan'], 'AO', '22, Toyin Street, Ikeja, Lagos', '8:00am', '10:00pm', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80')
ON CONFLICT (id) DO NOTHING;

-- Insert Data for Dishes
INSERT INTO public.dishes (id, restaurant_id, name, description, price, image, category) VALUES
('ga-masa', 'gidan-arewa', 'GOLDEN WAINA (MASA) WITH MIYAN TAUSHE', 'Lightly fermented golden pan-fried rice cakes served with rich sweet-savory pumpkin peanut stew (Miyan Taushe) enriched with mutton and wild spinach.', 2400, 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80', 'Mains'),
('ga-tuwo', 'gidan-arewa', 'TUWO SHINKAFA & FRESH MIYAN KUKA', 'Soft, smoothly mashed white rice swallow served with traditional baobab leaf soup (Miyan Kuka), slow-cooked with dry fish, locust beans, and goat meat.', 2800, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', 'Mains'),
('ga-fura', 'gidan-arewa', 'CHILLED FURA DA NONO BOWL', 'Traditional spiced millet flour balls mashed thoroughly into rich, premium thick local cow milk yoghurt. Served cold with a hint of ginger and sugarcane.', 1500, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', 'Drinks'),
('ga-dambu', 'gidan-arewa', 'RELIABLE DAMBUN NAMA FLOSS', 'Thoroughly shredded, spiced, and deep-fried tender dried beef floss. An iconic Hausa savory snack with a fine, melt-in-mouth texture.', 3200, 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&w=600&q=80', 'Snacks'),
('ks-suya', 'kano-suya-palace', 'SIGNATURE TSALI BEEF SUYA SKEWER', 'Tender premium thin slices of prime beef skewered and roasted on charcoal heat, lavishly rubbed with freshly milled groundnut oil and yaji red-chili spice blend.', 3500, 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&w=600&q=80', 'Mains'),
('ks-balangu', 'kano-suya-palace', 'BALANGU SLOW-ROASTED SPECIAL RAM', 'Authentic slow-smoked juicy chunks of seasoned ram meat grilled over logs, seasoned beautifully with local wild herbs and onions.', 4500, 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80', 'Mains'),
('ks-kilishi', 'kano-suya-palace', 'SPICY DRIED KILISHI SHEETS', 'Arewa-style jerky meat sheets coated in a spicy peanut paste paste infusion, naturally sun-dried and flame-flashed.', 4000, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', 'Snacks'),
('ks-kunun-zaki', 'kano-suya-palace', 'KUNUN ZAKI (SPICED MILLET NECTAR)', 'Sweet, smooth, rich and nourishing beverage brewed carefully from fermented millet grain, sweet potatoes, cloves, and ginger.', 1000, 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80', 'Drinks'),
('bp-jollof', 'bukkah-hut', 'SMOKY AREWA JOLLOF FEAST', 'Golden spiced firewood Jollof rice cooked in high cattle-bone stock, topped with succulent slow-grilled chicken and plantains.', 3200, 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80', 'Mains'),
('bp-pounded-yam', 'bukkah-hut', 'SMOOTH FLUFFY POUNDED YAM & EGUSI', 'Perfect classic pounded yam served with thick Egusi stew studded with assorted smoked meats and rich local leafy greens.', 3900, 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80', 'Mains'),
('bp-peppered-dodo', 'bukkah-hut', 'PEPPERED GIZZARD & CARAMEL DODO', 'Golden caramel pan-fried plantains tossed together with spicy seasoned turkey gizzard chunks in chili onions sauce.', 2500, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', 'Starters'),
('ao-kunun-aya', 'oasis-smoothies', 'SWEET KUNUN AYA (TIGERNUT MILK)', 'An elegant spiced tiger nut milk blended smooth with dry coconut flakes, sweet dates, cardamom, and ginger. 100% dairy-free, refreshing and thick.', 1200, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', 'Drinks'),
('ao-zobo', 'oasis-smoothies', 'PREMIUM GINGER ZOBO SPRITZER', 'Rich dark crimson brewed hibiscus leaf elixir infused heavily with ground hot ginger, sweet pineapple rinds, and cloves.', 1000, 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80', 'Drinks'),
('ao-dates', 'oasis-smoothies', 'STUFFED DATES & COCONUT FLOSS', 'Imported sweet soft dates pitted and stuffed with roasted almond kernels and finished with light powdered coconut.', 1800, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', 'Snacks')
ON CONFLICT (id) DO NOTHING;
