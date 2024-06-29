import { MessageContextMenuCommandInteraction, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';
import { DateTime } from 'luxon';

import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class ViewDateSent implements Command {
    public names = [Lang.getRef('messageCommands.viewDateSent')];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.HIDDEN;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: MessageContextMenuCommandInteraction): Promise<void> {
        await InteractionUtils.send(
            intr,
            Lang.getEmbed('displayEmbeds.viewDateSent', {
                DATE: DateTime.fromJSDate(intr.targetMessage.createdAt).toLocaleString(DateTime.DATE_HUGE),
            })
        );
    }
}
