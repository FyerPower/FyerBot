import { ShardingManager } from 'discord.js';
import { createRequire } from 'node:module';
import 'reflect-metadata';

import { GuildsController, RootController, ShardsController } from './controllers/index.js';
import { Job } from './jobs/index.js';
import { Api } from './models/api.js';
import { Manager } from './models/manager.js';
import { JobService, Logger } from './services/index.js';
import { MathUtils, ShardUtils } from './utils/index.js';

const require = createRequire(import.meta.url);
let Config = require('../config/config.json');
let Logs = require('../lang/logs.json');

async function start(): Promise<void> {
    Logger.info(Logs.info.appStarted);

    // Sharding
    let shardList: number[];
    let totalShards: number;
    try {
        let recommendedShards = await ShardUtils.recommendedShardCount(Config.client.token, Config.sharding.serversPerShard);
        shardList = MathUtils.range(0, recommendedShards);
        totalShards = recommendedShards;
    } catch (error) {
        Logger.error(Logs.error.retrieveShards, error);
        return;
    }

    if (shardList.length === 0) {
        Logger.warn(Logs.warn.managerNoShards);
        return;
    }

    let shardManager = new ShardingManager('dist/start-bot.js', {
        token: Config.client.token,
        mode: 'process',
        respawn: true,
        totalShards,
        shardList,
    });

    // Jobs
    let jobs: Job[] = [
        // TODO: Add new jobs here
    ].filter(Boolean);

    let manager = new Manager(shardManager, new JobService(jobs));

    // API
    let guildsController = new GuildsController(shardManager);
    let shardsController = new ShardsController(shardManager);
    let rootController = new RootController();
    let api = new Api([guildsController, shardsController, rootController]);

    // Start
    await manager.start();
    await api.start();
}

process.on('unhandledRejection', (reason, _promise) => {
    Logger.error(Logs.error.unhandledRejection, reason);
});

start().catch(error => {
    Logger.error(Logs.error.unspecified, error);
});
