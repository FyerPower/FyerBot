import { Message } from 'discord.js';

import { EventHandler, TriggerHandler } from './index.js';
import { Logger } from '../services/logger.js';

export class MessageHandler implements EventHandler {
    constructor(private triggerHandler: TriggerHandler) {}

    public async process(msg: Message): Promise<void> {
        Logger.info(`New Message >> ${msg.author.displayName}: ${msg.content}`);

        // Don't respond to system messages or self
        if (msg.system || msg.author.id === msg.client.user?.id) {
            return;
        }

        // Process trigger
        await this.triggerHandler.process(msg);
    }
}
