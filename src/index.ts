import { Client, Collection, GatewayIntentBits } from "discord.js";
import { loadEvents } from "./utils/loadEvents";
import { loadCommands } from "./utils/loadCommands";

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