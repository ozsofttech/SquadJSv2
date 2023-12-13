export default {
  regex:
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquadTrace: \[DedicatedServer](?:ASQSoldier::)?Die\(\): Player:(.+) KillingDamage=(?:-)*([0-9.]+) from ([A-z_0-9]+) \(Online IDs: (?:EOS: )?([0-9a-f]{32}|INVALID)(?: steam: )?([0-9]{17})? \| Contoller ID: (.+)\) caused by ([A-z_0-9-]+)_C/,
  onMatch: (args, logParser) => {
    const data = {
      ...logParser.eventStore.session[args[3]],
      raw: args[0],
      time: args[1],
      woundTime: args[1],
      chainID: args[2],
      victimName: args[3],
      damage: parseFloat(args[4]),
      attackerPlayerController: args[5],
      attackerEOSID: args[6],
      attackerSteamID: args[7],
      weapon: args[8]
    };

    logParser.eventStore.session[args[3]] = data;

    logParser.emit('PLAYER_DIED', data);
  }
};
