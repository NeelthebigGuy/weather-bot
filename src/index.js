import process from 'node:process';
import { URL } from 'node:url';
import { Client, GatewayIntentBits } from 'discord.js';
import { loadCommands, loadEvents } from './util/loaders.js';
import { registerEvents } from './util/registerEvents.js';

// Initialize the client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load the events and commands
const events = await loadEvents(new URL('events/', import.meta.url));
const commands = await loadCommands(new URL('commands/', import.meta.url));

// Register the event handlers
registerEvents(commands, events, client);

// Login to the client
void client.login(process.env.DISCORD_TOKEN);

//          to do
//  1.  Create commands to change date/time and location for api call
//  2.  create a readme
//  3.  find a better api to call to, avoiding my key
//  4.  make the bot publishable! maybe monitize
//  5.  create a bash script such that this discord bot will run apon boot
//
