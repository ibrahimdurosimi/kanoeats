import { pgTable, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Usually Auth provider's UUID
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  restaurantId: text('restaurant_id').notNull(),
  items: jsonb('items').notNull(), // Array of items
  totalAmount: text('total_amount').notNull(),
  status: text('status').notNull(), // 'pending', 'preparing', 'delivering', 'delivered', 'cancelled'
  deliveryAddress: text('delivery_address').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
