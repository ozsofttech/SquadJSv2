export default {
  regex:
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogNet: UChannel::Close: Sending CloseBunch\. ChIndex == [0-9]+\. Name: \[UChannel\] ChIndex: [0-9]+, Closing: [0-9]+ \[UNetConnection\] RemoteAddr: ((?:[0-9]{1,3}\.){3}[0-9]{1,3}:[0-9]+), Name: EOSIpNetConnection_[0-9]+, Driver: GameNetDriver EOSNetDriver_[0-9]+, IsServer: YES, PC: ([^ ]+PlayerController_C_[0-9]+), Owner: [^ ]+PlayerController_C_[0-9]+, UniqueId: RedpointEOS:([0-9a-f]{32})/,
  onMatch: (args, logParser) => {
    const data = {
      raw: args[0],
      time: args[1],
      chainID: args[2],
      ip: args[3],
      playerController: args[4],
      eosID: args[5],
    };

    logParser.eventStore.disconnected[data.eosID] = true;
    logParser.emit('PLAYER_DISCONNECTED', data);
  }
};
