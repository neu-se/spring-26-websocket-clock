# Websocket Clock

Implements a simple webserver with a periodically-updating clock and a
counter.

- The `/api/status` REST endpoint returns the current clock tick, and
  connected socket.io clients will receive a `tick` event whenever the clock
  updates.
- The `/api/poke` REST endpoint will increment the current counter value, and
  whenever the counter increments, a `count` event is sent to all connected
  socket.io clients with the current count.

Each socket.io event also includes the number of currently connected socket.io
clients.
