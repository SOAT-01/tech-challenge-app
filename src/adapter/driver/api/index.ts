import { serverConfig } from "@config/index";
import { server } from "./server";

server.listen(serverConfig.port, () =>
    console.log(
        `${serverConfig.env} - Server running on port: ${serverConfig.port}`,
    ),
);
