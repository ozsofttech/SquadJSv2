export default {
  regex:
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquad: PostLogin: NewPlayer: BP_PlayerController_C .+(BP_PlayerController_C_[0-9]+) \(IP: (?:[0-9]{1,3}\.){3}[0-9]{1,3} \| Online IDs: EOS: ([0-9a-f]{32}) steam: ([0-9]{17})\)/,
  onMatch: (args, logParser) => {
    const data = {
      raw: args[0],
      time: args[1],
      chainID: args[2],
      controller: args[3],
      eosID: args[4],
      steamID: args[5]
    };

    logParser.eventStore['player-controller'] = args[3];
    logParser.eventStore['eos-id'] = args[4];
    logParser.eventStore['steam-id'] = args[5];

    logParser.emit('PLAYER_CONTROLLER_CONNECTED', data);
  }
};
