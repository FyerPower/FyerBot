import { ChatInputCommandInteraction, EmbedBuilder, PermissionsString } from 'discord.js';

import { HelpOption } from '../../enums/index.js';
import { EventData } from '../../models/internal-models.js';
import { Lang } from '../../services/index.js';
import { ClientUtils, FormatUtils, InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class HelpCommand implements Command {
    public names = [Lang.getRef('chatCommands.help')];
    public deferType = CommandDeferType.HIDDEN;
    public requireClientPerms: PermissionsString[] = [];
    public async execute(intr: ChatInputCommandInteraction): Promise<void> {
        let args = {
            option: intr.options.getString(Lang.getRef('arguments.option')) as HelpOption,
        };

        let embed: EmbedBuilder;
        switch (args.option) {
            case HelpOption.CONTACT_SUPPORT: {
                embed = Lang.getEmbed('displayEmbeds.helpContactSupport');
                break;
            }
            case HelpOption.COMMANDS: {
                embed = Lang.getEmbed('displayEmbeds.helpCommands', {
                    CMD_LINK_TEST: FormatUtils.commandMention(await ClientUtils.findAppCommand(intr.client, Lang.getRef('chatCommands.test'))),
                    CMD_LINK_INFO: FormatUtils.commandMention(await ClientUtils.findAppCommand(intr.client, Lang.getRef('chatCommands.info'))),
                });
                break;
            }
            default: {
                return;
            }
        }

        await InteractionUtils.send(intr, embed);
    }
}
