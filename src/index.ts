import { Client, Collection, GatewayIntentBits } from "discord.js";
import { loadEvents } from "./utils/loadEvents";

const client = new Client({
        intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers
        ]
});

client.commands = new Collection<string, any>();

await loadEvents(client, './src/events')

client.login(Bun.env.DISCORD_TOKEN);