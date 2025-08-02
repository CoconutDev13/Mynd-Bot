import { Client, Collection, GatewayIntentBits } from "discord.js";
import { loadEvents } from "./utils/loadEvents";
import { loadCommands } from "./utils/loadCommands";
import { users, translatorConfigurations } from './db/schema';
import { db } from "./db";

const client = new Client({
        intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers
        ]
});

client.commands = new Collection<string, any>();

await loadEvents(client)
await loadCommands(client)

client.login(Bun.env.DISCORD_TOKEN);

await db.execute(`TRUNCATE TABLE translator_configs, users RESTART IDENTITY CASCADE`);

const [user] = await db.insert(users).values({
        member_id: 'abc123',
        language: 'en',
        color: 0x00ff00,
}).returning();

if (user)
{
        await db.insert(translatorConfigurations).values({
                user: user.id,
                language: 'en',
                enabled: true,
        });

        const userId = user.id;

        const userWithConfig = await db.query.users.findFirst({
                where: (u, { eq }) => eq(u.id, userId),
                with: {
                        translatorConfiguration: true,
                },
        });

        console.log(userWithConfig?.translatorConfiguration);
} else
{
        console.log('unfortunately user is undefined')
}
