import { createRequire } from 'node:module';

import { Job } from './index.js';
import { CustomClient } from '../extensions/custom-client.js';
import { Logger } from '../services/index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');
let Logs = require('../../lang/logs.json');

export class UpdateMemberRoleJob extends Job {
    public name = 'Update Member Role';
    public schedule: string = Config.jobs.updateMemberRole.schedule;
    public log: boolean = Config.jobs.updateMemberRole.log;
    public runOnce: boolean = Config.jobs.updateMemberRole.runOnce;
    public initialDelaySecs: number = Config.jobs.updateMemberRole.initialDelaySecs;

    constructor(private client: CustomClient) {
        super();
    }

    public async run(): Promise<void> {
        return;

        let membersUpdated = 0;
        Logger.info(Logs.info.updateMemberRoleStarted);

        for (let [_, guild] of this.client.guilds.cache) {
            Logger.info(`Looping Guilds ${guild.id}`);

            const guildMembers = await guild.members.fetch(); // guild.members.cache;
            const guildRoles = await guild.roles.fetch(); // guild.roles.cache;

            Logger.info(`Successfull loaded all ${guildMembers.size} Members and ${guildRoles.size} Roles`);

            // Members
            const memberRole = guildRoles.find(role => role.name === Config.roles.member);
            if (memberRole) {
                const membersWithRole = memberRole.members.map(m => m.user.id);
                Logger.info(`Member Role ${memberRole.id} - Size: ${membersWithRole.length}`);

                for (let [_, member] of guildMembers) {
                    if (!member.user.bot) {
                        if (!membersWithRole.includes(member.user.id)) {
                            membersUpdated++;
                            try {
                                await member.roles.add(memberRole);
                                Logger.info(Logs.info.updateMemberRoleUpdated.replaceAll('{MEMBER_NAME}', member.displayName).replaceAll('{ROLE_NAME}', memberRole.name));
                            } catch (error) {
                                Logger.error(
                                    Logs.error.updatedMemberRoleError
                                        .replaceAll('{ROLE_NAME}', memberRole.name)
                                        .replaceAll('{MEMBER_NAME}', member.user.displayName)
                                        .replaceAll('{MESSAGE}', error.message)
                                );
                            }
                        }
                    }
                }
            } else {
                Logger.error(`Guild ${guild.id} is missing "${Config.roles.member} Role"`);
            }

            // Bots
            const botRole = guildRoles.find(role => role.name === Config.roles.bot);
            if (botRole) {
                const botsWithRole = botRole.members.map(m => m.user.id);

                for (let [_, member] of guildMembers) {
                    if (member.user.bot) {
                        if (!botsWithRole.includes(member.user.id)) {
                            membersUpdated++;
                            try {
                                await member.roles.add(botRole);
                                Logger.info(Logs.info.updateMemberRoleUpdated.replaceAll('{MEMBER_NAME}', member.displayName).replaceAll('{ROLE_NAME}', botRole.name));
                            } catch (error) {
                                Logger.error(
                                    Logs.error.updatedMemberRoleError
                                        .replaceAll('{ROLE_NAME}', botRole.name)
                                        .replaceAll('{MEMBER_NAME}', member.user.displayName)
                                        .replaceAll('{MESSAGE}', error.message)
                                );
                            }
                        }
                    }
                }
            } else {
                Logger.error(`Guild ${guild.id} is missing "${Config.roles.bot} Role"`);
            }
        }

        Logger.info(Logs.info.updateMemberRoleEnded.replaceAll('{MEMBERS_UPDATED}', membersUpdated));
    }
}
