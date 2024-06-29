import { PermissionsString } from 'discord.js';

import { Lang } from '../../services/index.js';

interface PermissionData {
    displayName(): string;
}

export class Permission {
    public static Data: {
        [key in PermissionsString]: PermissionData;
    } = {
        AddReactions: {
            displayName(): string {
                return Lang.getRef('permissions.AddReactions');
            },
        },
        Administrator: {
            displayName(): string {
                return Lang.getRef('permissions.Administrator');
            },
        },
        AttachFiles: {
            displayName(): string {
                return Lang.getRef('permissions.AttachFiles');
            },
        },
        BanMembers: {
            displayName(): string {
                return Lang.getRef('permissions.BanMembers');
            },
        },
        ChangeNickname: {
            displayName(): string {
                return Lang.getRef('permissions.ChangeNickname');
            },
        },
        Connect: {
            displayName(): string {
                return Lang.getRef('permissions.Connect');
            },
        },
        CreateEvents: {
            displayName(): string {
                return Lang.getRef('permissions.CreateEvents');
            },
        },
        CreateGuildExpressions: {
            displayName(): string {
                return Lang.getRef('permissions.CreateGuildExpressions');
            },
        },
        CreateInstantInvite: {
            displayName(): string {
                return Lang.getRef('permissions.CreateInstantInvite');
            },
        },
        CreatePrivateThreads: {
            displayName(): string {
                return Lang.getRef('permissions.CreatePrivateThreads');
            },
        },
        CreatePublicThreads: {
            displayName(): string {
                return Lang.getRef('permissions.CreatePublicThreads');
            },
        },
        DeafenMembers: {
            displayName(): string {
                return Lang.getRef('permissions.DeafenMembers');
            },
        },
        EmbedLinks: {
            displayName(): string {
                return Lang.getRef('permissions.EmbedLinks');
            },
        },
        KickMembers: {
            displayName(): string {
                return Lang.getRef('permissions.KickMembers');
            },
        },
        ManageChannels: {
            displayName(): string {
                return Lang.getRef('permissions.ManageChannels');
            },
        },
        ManageEmojisAndStickers: {
            displayName(): string {
                return Lang.getRef('permissions.ManageEmojisAndStickers');
            },
        },
        ManageEvents: {
            displayName(): string {
                return Lang.getRef('permissions.ManageEvents');
            },
        },
        ManageGuild: {
            displayName(): string {
                return Lang.getRef('permissions.ManageGuild');
            },
        },
        ManageGuildExpressions: {
            displayName(): string {
                return Lang.getRef('permissions.ManageGuildExpressions');
            },
        },
        ManageMessages: {
            displayName(): string {
                return Lang.getRef('permissions.ManageMessages');
            },
        },
        ManageNicknames: {
            displayName(): string {
                return Lang.getRef('permissions.ManageNicknames');
            },
        },
        ManageRoles: {
            displayName(): string {
                return Lang.getRef('permissions.ManageRoles');
            },
        },
        ManageThreads: {
            displayName(): string {
                return Lang.getRef('permissions.ManageThreads');
            },
        },
        ManageWebhooks: {
            displayName(): string {
                return Lang.getRef('permissions.ManageWebhooks');
            },
        },
        MentionEveryone: {
            displayName(): string {
                return Lang.getRef('permissions.MentionEveryone');
            },
        },
        ModerateMembers: {
            displayName(): string {
                return Lang.getRef('permissions.ModerateMembers');
            },
        },
        MoveMembers: {
            displayName(): string {
                return Lang.getRef('permissions.MoveMembers');
            },
        },
        MuteMembers: {
            displayName(): string {
                return Lang.getRef('permissions.MuteMembers');
            },
        },
        PrioritySpeaker: {
            displayName(): string {
                return Lang.getRef('permissions.PrioritySpeaker');
            },
        },
        ReadMessageHistory: {
            displayName(): string {
                return Lang.getRef('permissions.ReadMessageHistory');
            },
        },
        RequestToSpeak: {
            displayName(): string {
                return Lang.getRef('permissions.RequestToSpeak');
            },
        },
        SendMessages: {
            displayName(): string {
                return Lang.getRef('permissions.SendMessages');
            },
        },
        SendMessagesInThreads: {
            displayName(): string {
                return Lang.getRef('permissions.SendMessagesInThreads');
            },
        },
        SendPolls: {
            displayName(): string {
                return Lang.getRef('permissions.SendPolls');
            },
        },
        SendTTSMessages: {
            displayName(): string {
                return Lang.getRef('permissions.SendTTSMessages');
            },
        },
        SendVoiceMessages: {
            displayName(): string {
                return Lang.getRef('permissions.SendVoiceMessages');
            },
        },
        Speak: {
            displayName(): string {
                return Lang.getRef('permissions.Speak');
            },
        },
        Stream: {
            displayName(): string {
                return Lang.getRef('permissions.Stream');
            },
        },
        UseApplicationCommands: {
            displayName(): string {
                return Lang.getRef('permissions.UseApplicationCommands');
            },
        },
        UseEmbeddedActivities: {
            displayName(): string {
                return Lang.getRef('permissions.UseEmbeddedActivities');
            },
        },
        UseExternalEmojis: {
            displayName(): string {
                return Lang.getRef('permissions.UseExternalEmojis');
            },
        },
        UseExternalSounds: {
            displayName(): string {
                return Lang.getRef('permissions.UseExternalSounds');
            },
        },
        UseExternalStickers: {
            displayName(): string {
                return Lang.getRef('permissions.UseExternalStickers');
            },
        },
        UseSoundboard: {
            displayName(): string {
                return Lang.getRef('permissions.UseSoundboard');
            },
        },
        UseVAD: {
            displayName(): string {
                return Lang.getRef('permissions.UseVAD');
            },
        },
        ViewAuditLog: {
            displayName(): string {
                return Lang.getRef('permissions.ViewAuditLog');
            },
        },
        ViewChannel: {
            displayName(): string {
                return Lang.getRef('permissions.ViewChannel');
            },
        },
        ViewCreatorMonetizationAnalytics: {
            displayName(): string {
                return Lang.getRef('permissions.ViewCreatorMonetizationAnalytics');
            },
        },
        ViewGuildInsights: {
            displayName(): string {
                return Lang.getRef('permissions.ViewGuildInsights');
            },
        },
    };
}
