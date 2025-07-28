import { Client, Events } from "discord.js";
import type { EventModule } from "../type";

const event: EventModule = {
        name: Events.ClientReady,
        execute: function (client: Client): void | Promise<void>
        {
                console.log(`Bot ${client.user?.username}, is up and running`);
        }
}

export default event;