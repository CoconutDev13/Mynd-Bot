import { relations } from "drizzle-orm";
import { translatorConfigurations, users } from "./schema";

const usersRelations = relations(users, ({ one }) => ({
    translatorConfiguration: one(translatorConfigurations, {
        fields: [users.id],
        references: [translatorConfigurations.user],
    }),
}));

const translatorConfigRelations = relations(translatorConfigurations, ({ one }) => ({
  user: one(users, {
    fields: [translatorConfigurations.user],
    references: [users.id],
  }),
}));

export const relationships = {
        usersRelations,
        translatorConfigRelations
};