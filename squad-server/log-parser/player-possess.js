export default {
  regex:
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquadTrace: \[DedicatedServer](?:ASQPlayerController::)?OnPossess\(\): PC=(.+) \(Online IDs: (?:EOS: )?([0-9a-f]{32})(?: steam: )?([0-9]{17})?\) Pawn=([A-z0-9_]+)_C_(.+)/,
  onMatch: (args, logParser) => {
    const data = {
      raw: args[0],
      time: args[1],
      chainID: args[2],
      playerSuffix: args[3],
      playerEOSID: args[4],
      plaayerSteamID: args[5],
      possessClassname: args[6],
      pawn: args[6]+'_C_'+args[7]
    };

    logParser.eventStore.session[args[3]] = args[2];

    logParser.emit('PLAYER_POSSESS', data);
  }
};
