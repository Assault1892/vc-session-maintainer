const { ApplicationCommandOptionType, ChannelType } = require("discord.js");
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");

module.exports = [
    {
        data: {
            name: "join",
            description: "特定のボイスチャンネルに接続します",
            options: [
                {
                    name: "channel",
                    type: ApplicationCommandOptionType.Channel,
                    description: "接続先のボイスチャンネル",
                    required: true,
                    channelTypes: [ChannelType.GuildVoice],
                },
            ],
        },
        async execute(interaction) {
            const channel = interaction.options.getChannel("channel");
            joinVoiceChannel({
                channelId: channel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            await interaction.reply({
                content: `${channel.name} に接続しました！`,
                ephemeral: true,
            });
        },
    },
    {
        data: {
            name: "disconnect",
            description: "ボイスチャンネルから切断します",
        },
        async execute(interaction) {
            const connection = getVoiceConnection(interaction.guildId);
            if (!connection) {
                return interaction.reply({
                    content: "現在どのボイスチャンネルにも接続していません。",
                    ephemeral: true,
                });
            }
            connection.destroy();
            await interaction.reply({
                content: "ボイスチャンネルから切断しました。",
                ephemeral: true,
            });
        },
    },
];
