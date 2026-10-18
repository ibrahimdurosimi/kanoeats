-- ============================================================================
-- KanoEats — seed data
-- Generated from src/data.ts. Run after schema.sql.
-- Re-runnable: existing rows are updated rather than duplicated.
-- ============================================================================

insert into public.restaurants (id, name, cuisine, rating, review_count, delivery_time, tags, logo_text, address, city, opens, closes, art_key) values
  ('gidan-arewa', 'Gidan Arewa (Arewa Palace)', 'Traditional Hausa Kitchen', 4.9, 2140, 20, array['Halal','Traditional']::text[], 'GA', 'Zoo Road, Nassarawa, Kano State', 'Kano', '8:00am', '9:30pm', 'kitchen'),
  ('kano-suya-palace', 'Kano Suya Palace (Mai Suya)', 'Arewa Flame BBQ', 4.8, 1204, 15, array['Halal','Spicy']::text[], 'KS', 'Post Office Road, Fagge, Kano State', 'Kano', '4:00pm', '11:00pm', 'suya'),
  ('bukkah-hut', 'Bukkah Palace & Local Fusion', 'Traditional Nigerian', 4.7, 876, 25, array['Halal','Spicy']::text[], 'BP', 'Murtala Mohammed Way, Bompai, Kano State', 'Kano', '9:00am', '10:00pm', 'tuwo'),
  ('oasis-smoothies', 'Arewa Oasis Drinks & Cups', 'Naturally Nourishing', 4.6, 512, 18, array['Halal','Vegan']::text[], 'AO', 'France Road, Sabon Gari, Kano State', 'Kano', '8:00am', '10:00pm', 'kunun'),
  ('mai-kilishi', 'Mai Kilishi Heritage House', 'Dried Meat Specialists', 4.8, 640, 22, array['Halal','Traditional']::text[], 'MK', 'Kofar Wambai Market, Kano State', 'Kano', '9:00am', '8:00pm', 'kilishi'),
  ('waina-corner', 'Waina Corner (Masa House)', 'Pan-Fired Rice Cakes', 4.5, 388, 14, array['Halal','Vegan']::text[], 'WC', 'Gwammaja Quarters, Dala, Kano State', 'Kano', '6:00am', '12:00pm', 'masa')
on conflict (id) do update set
  name = excluded.name, cuisine = excluded.cuisine, rating = excluded.rating,
  review_count = excluded.review_count, delivery_time = excluded.delivery_time,
  tags = excluded.tags, logo_text = excluded.logo_text, address = excluded.address,
  city = excluded.city, opens = excluded.opens, closes = excluded.closes,
  art_key = excluded.art_key;

insert into public.dishes (id, restaurant_id, name, description, price, category, art_key, spice_level) values
  ('ga-masa', 'gidan-arewa', 'Golden Waina (Masa) with Miyan Taushe', 'Lightly fermented golden pan-fried rice cakes served with rich sweet-savoury pumpkin peanut stew (Miyan Taushe), enriched with mutton and wild spinach.', 2400, 'Mains', 'masa', 1),
  ('ga-tuwo', 'gidan-arewa', 'Tuwo Shinkafa & Fresh Miyan Kuka', 'Soft, smoothly mashed white rice swallow served with traditional baobab leaf soup (Miyan Kuka), slow-cooked with dry fish, locust beans and goat meat.', 2800, 'Mains', 'tuwo', 2),
  ('ga-fura', 'gidan-arewa', 'Chilled Fura da Nono Bowl', 'Traditional spiced millet flour balls mashed thoroughly into rich, thick local cow milk yoghurt. Served cold with a hint of ginger and sugarcane.', 1500, 'Drinks', 'fura', 0),
  ('ga-dambu', 'gidan-arewa', 'Dambun Nama Beef Floss', 'Thoroughly shredded, spiced and deep-fried tender dried beef floss. An iconic Hausa savoury snack with a fine, melt-in-mouth texture.', 3200, 'Snacks', 'dambu', 2),
  ('ks-suya', 'kano-suya-palace', 'Signature Tsire Beef Suya Skewer', 'Tender thin slices of prime beef skewered and roasted over charcoal heat, lavishly rubbed with freshly milled groundnut and yaji red-chilli spice blend.', 3500, 'Mains', 'suya', 3),
  ('ks-balangu', 'kano-suya-palace', 'Balangu Slow-Roasted Special Ram', 'Authentic slow-smoked juicy chunks of seasoned ram grilled over logs, seasoned with local wild herbs and finished with sliced onion.', 4500, 'Mains', 'balangu', 2),
  ('ks-kilishi', 'kano-suya-palace', 'Spicy Dried Kilishi Sheets', 'Arewa-style jerky meat sheets coated in a spicy peanut paste infusion, naturally sun-dried and flame-flashed.', 4000, 'Snacks', 'kilishi', 3),
  ('ks-kunun', 'kano-suya-palace', 'Kunun Zaki (Spiced Millet Nectar)', 'Sweet, smooth and nourishing beverage brewed carefully from fermented millet grain, sweet potatoes and cloves.', 1000, 'Drinks', 'kunun', 0),
  ('bp-jollof', 'bukkah-hut', 'Smoky Arewa Jollof Feast', 'Golden spiced firewood Jollof rice cooked in rich cattle-bone stock, topped with succulent slow-grilled chicken and plantains.', 3200, 'Mains', 'tuwo', 2),
  ('bp-pounded-yam', 'bukkah-hut', 'Fluffy Pounded Yam & Egusi', 'Classic pounded yam served with thick Egusi stew studded with assorted smoked meats and rich local leafy greens.', 3900, 'Mains', 'tuwo', 2),
  ('bp-peppered-dodo', 'bukkah-hut', 'Peppered Gizzard & Caramel Dodo', 'Golden caramel pan-fried plantains tossed with spicy seasoned turkey gizzard chunks in a chilli-onion sauce.', 2500, 'Starters', 'balangu', 3),
  ('ao-kunun-aya', 'oasis-smoothies', 'Sweet Kunun Aya (Tigernut Milk)', 'Spiced tigernut milk blended smooth with dry coconut flakes, sweet dates, cardamom and ginger. Dairy-free, refreshing and thick.', 1200, 'Drinks', 'kunun', 0),
  ('ao-zobo', 'oasis-smoothies', 'Premium Ginger Zobo Spritzer', 'Rich dark crimson brewed hibiscus elixir infused heavily with ground hot ginger, sweet pineapple rinds and cloves.', 1000, 'Drinks', 'kunun', 1),
  ('ao-dates', 'oasis-smoothies', 'Stuffed Dates & Coconut Floss', 'Sweet soft dates pitted and stuffed with roasted almond kernels, finished with light powdered coconut.', 1800, 'Snacks', 'fura', 0),
  ('mk-kilishi-250', 'mai-kilishi', 'Hand-Cut Kilishi 250g Pack', 'Paper-thin beef sheets marinated in groundnut paste and yaji, sun-dried on raffia racks and flame-finished to order.', 4800, 'Snacks', 'kilishi', 3),
  ('mk-dankwa', 'mai-kilishi', 'Dankwa Groundnut Bites', 'Crunchy sweet-savoury groundnut and millet bites rolled by hand, a classic Kano roadside snack.', 1400, 'Snacks', 'dambu', 1),
  ('mk-gift-box', 'mai-kilishi', 'Sallah Kilishi Gift Set', 'Hand-cut kilishi sheets and dankwa boxed in woven raffia with a personal note card. Ideal for Sallah gifting.', 12000, 'Snacks', 'kilishi', 2),
  ('wc-masa-six', 'waina-corner', 'Fluffy Rice Masa (6 pieces)', 'Fermented round rice cakes fired in traditional oil pan grillers, served with yaji or honey on the side.', 1800, 'Starters', 'masa', 0),
  ('wc-masa-bundle', 'waina-corner', 'Masa Morning Bundle', 'Two dozen fresh masa with yaji, honey and a flask of hot kunun zaki — enough for the whole house.', 9800, 'Mains', 'masa', 1),
  ('wc-kunun-zaki', 'waina-corner', 'Hot Kunun Zaki Flask', 'A one-litre flask of warm spiced millet drink, brewed each morning and sweetened with dates.', 2200, 'Drinks', 'kunun', 0)
on conflict (id) do update set
  restaurant_id = excluded.restaurant_id, name = excluded.name,
  description = excluded.description, price = excluded.price,
  category = excluded.category, art_key = excluded.art_key,
  spice_level = excluded.spice_level;
