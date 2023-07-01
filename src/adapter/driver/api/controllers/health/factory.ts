import { HealthController } from "./controller";

export class HealthControllerFactory {
    public static create(): HealthController {
        return new HealthController();
    }
}
