const channels = {};

function subscribe(channel, callback) {
  channels[channel] ??= [];
  channels[channel].push(callback);
}

function publish(channel, data) {
  channels[channel]?.forEach((callback) => callback(data));
}

function unsubscribe(channel, callback) {
  channels[channel] = channels[channel]?.filter(
    (subscription) => subscription !== callback
  );
}

export { publish, subscribe, unsubscribe };
