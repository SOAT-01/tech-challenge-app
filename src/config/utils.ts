export const parseEnvStr = (env: string, defaultEnv?: string): string => {
    return process.env[env] || defaultEnv;
};

export const parseEnvInt = (env: string, defaultEnv?: number): number => {
    if (env in process.env) {
        return parseInt(process.env[env], 10);
    }
    return defaultEnv;
};
