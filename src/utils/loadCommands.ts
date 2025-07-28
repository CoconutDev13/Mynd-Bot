import fs from 'fs';
import path from 'path';
import { Collection, REST, Routes, type Client } from 'discord.js';
import type { CommandModule } from '../type';

export async function loadCommands(client: Client, commandsDir = './src/commands') {
  const commandsPath = path.resolve(commandsDir);
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.ts') || f.endsWith('.js'));

  client.commands ??= new Collection();

  const commandsToRegister: any[] = [];

  for (const file of commandFiles) {
    const fullPath = path.join(commandsPath, file);
    const mod = await import(fullPath);
    const command: CommandModule = mod.default || mod;

    if (!command?.data || typeof command.execute !== 'function') {
      console.warn(`⚠️ Το command "${file}" δεν έχει σωστή δομή.`);
      continue;
    }

    const commandName = command.data.name;
    client.commands.set(commandName, command);
    commandsToRegister.push(command.data.toJSON());

    console.log(`✅ Φορτώθηκε command: ${commandName}`);
  }

  const rest = new REST({ version: '10' }).setToken(Bun.env.DISCORD_TOKEN!);

  try {
    console.log('📡 Κάνω register τα slash commands...');
    await rest.put(
      Routes.applicationCommands(Bun.env.CLIENT_ID!),
      { body: commandsToRegister }
    );
    console.log('✅ Slash commands καταχωρήθηκαν επιτυχώς!');
  } catch (error) {
    console.error('❌ Σφάλμα κατά την καταχώρηση των slash commands:', error);
  }
}
