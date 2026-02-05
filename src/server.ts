/* eslint no-console: "off" */
import { server, emitTick } from "./app.ts";


setInterval(() => {
  emitTick();
}, 4000);

const PORT = parseInt(process.env.PORT || "3000");
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
