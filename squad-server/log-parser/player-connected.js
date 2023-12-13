export default {
  regex: /^\[([0-9.:-]+)]\[([ 0-9]*)]LogNet: Join succeeded: (.+)/,
  onMatch: (args, logParser) => {
    const data = {
      raw: args[0],
      time: args[1],
      chainID: args[2],
      playerSuffix: args[3],
      ip: logParser.eventStore['client-login'], // client login
      eosID: logParser.eventStore['eos-id'], // playercontroller connected
      steamID: logParser.eventStore['steam-id'], // playercontroller connected
      controller: logParser.eventStore['player-controller'] // playercontroller connected
    };

    delete logParser.eventStore['client-login'];
    delete logParser.eventStore['eos-id'];
    delete logParser.eventStore['steam-id'];
    delete logParser.eventStore['player-controller'];

    // Handle Reconnecting players
    if (logParser.eventStore.disconnected[data.eosID]) {
      delete logParser.eventStore.disconnected[data.eosID];
    }
    logParser.emit('PLAYER_CONNECTED', data);
    logParser.eventStore.players[data.eosID] = {
      ip: data.ip,
      eosID: data.eosID,
      steamID: data.steamID,
      suffix: data.playerSuffix,
      controller: data.controller
    };
  }
};
