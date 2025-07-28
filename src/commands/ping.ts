import { ChatInputCommandInteraction, SlashCommandBuilder, type Interaction } from 'discord.js';
import type { CommandModule } from '../type';

const command: CommandModule = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('Pong!');
  }
};

export default command;
