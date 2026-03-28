const { Client, Events, GatewayIntentBits } = require("discord.js");

const commands = require("./commands.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.once(Events.ClientReady, async (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);

    // コマンドの一括登録
    const commandData = commands.map((cmd) => cmd.data);
    await c.application.commands.set(commandData);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.find(
        (cmd) => cmd.data.name === interaction.commandName,
    );
    if (!command) return;

    await command.execute(interaction);
});

client.login(process.env.BOT_TOKEN);
