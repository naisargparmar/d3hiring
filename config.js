var config = {
    local: {
        BACKEND_PORT: 3003,
        
        HOST:"localhost",
        USER: "root",
        PASSWORD: "root",
        DATABASE: 'd3hiring'
    },
    development: {
        BACKEND_PORT: 3003,
        
        HOST:"localhost",
        USER: "root",
        PASSWORD: "root",
        DATABASE: 'd3hiring'
    },
    uat: {
        BACKEND_PORT: 3003,
        
        HOST:"localhost",
        USER: "root",
        PASSWORD: "root",
        DATABASE: 'd3hiring'
    },
    production: {
        BACKEND_PORT: 3003,

        HOST:"localhost",
        USER: "root",
        PASSWORD: "root",
        DATABASE: 'd3hiring'
    },
};

const env = process.env.APP_ENV || 'local';
console.log('Environment = ', env);

// Overwrite process.env
const envConfig = config[env];
Object.keys(envConfig).forEach((key) => {
    if (!process.env[key]) {
        process.env[key] = envConfig[key];
    }
});
