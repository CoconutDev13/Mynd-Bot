// schema.ts
import { pgTable, integer, varchar, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  member_id: varchar('member_id', { length: 255 }).notNull(),
  language: varchar('language', { length: 2 }).notNull().default('el'),
  color: integer('color').notNull().default(0xffffff),
});

export const translatorConfigurations = pgTable('translator_configs', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  user: integer('user').unique().references(() => users.id),
  language: varchar('language', { length: 2 }).notNull().default('el'),
  enabled: boolean('enabled').notNull().default(false),
});

export const schema = {
  users,
  translatorConfigurations,
};
