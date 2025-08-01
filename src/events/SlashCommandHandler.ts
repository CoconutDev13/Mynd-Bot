import { Client, Events, type Interaction } from "discord.js";
import type { EventModule } from "../type";

const event: EventModule = {
        name: Events.InteractionCreate,
        execute: function (interaction: Interaction): void | Promise<void>
        {
                if(!interaction.isChatInputCommand()) return;

                const client = interaction.client;
                const commandName = interaction.commandName;
                const command = client.commands.get(commandName)

                if(!command) {
                        return console.log(`Command ${commandName} could not be found`);
                }

                command.execute(interaction);
        }
}

export default event;