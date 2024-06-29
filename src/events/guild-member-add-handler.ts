import { GuildMember } from 'discord.js';
import { createRequire } from 'node:module';

import { EventHandler } from './index.js';
import { Lang, Logger } from '../services/index.js';
import { ClientUtils, FormatUtils, MessageUtils } from '../utils/index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');
let Logs = require('../../lang/logs.json');

export class GuildMemberAddHandler implements EventHandler {
    constructor() {}

    public async process(member: GuildMember): Promise<void> {
        Logger.info(Logs.info.guildMemberAdd.replaceAll('{MEMBER_NAME}', member.displayName).replaceAll('{GUILD_NAME}', member.guild.name));

        setTimeout(async () => {
            // Send welcome message to the server's notify channel
            let notifyChannel = await ClientUtils.findNotifyChannel(member.guild);
            if (notifyChannel) {
                await MessageUtils.send(
                    notifyChannel,
                    Lang.getEmbed('displayEmbeds.memberWelcome', {
                        MEMBER_NAME: FormatUtils.userMention(member.id),
                        GUILD_NAME: member.guild.name,
                        ROLES_CHANNEL_LINK: FormatUtils.channelMention(Config.channels.rules),
                        EMOJI_CAMPFIRE: Config.emojis.campfire,
                        EMOJI_MARSHMALLOW: Config.emojis.marshmallow,
                    }).setAuthor({
                        name: member.guild.name,
                        iconURL: member.guild.iconURL(),
                    })
                );
            }
        }, 1000);
    }
}
