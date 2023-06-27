import { Request, Response } from "express";
import { testMongoConnection } from "@infra/mongo/helpers/testMongoConnection";

export class HealthController {
    constructor() {}

    public async get(req: Request, res: Response): Promise<Response> {
        try {
            if(await testMongoConnection())
                return res.status(200).send("Healthy");
            else
                return res.status(500).send("Unhealthy");
        }
        catch {
            return res.status(500).send("Unhealthy");
        }
    }
}
