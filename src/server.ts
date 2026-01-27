/* eslint no-console: "off" */

import { server } from "./app.ts";

const PORT = parseInt(process.env.PORT || "3000");
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
