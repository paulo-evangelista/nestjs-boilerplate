export default () => ({
  db: {
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres',
    host: process.env.POSTGRES_HOST || 'postgres',
  },
  microsoftTeamsApi: {
    url: process.env.MS_API_URL || undefined,
    key: process.env.MS_API_KEY || undefined,
    sendTo: process.env.MS_SEND_TO || undefined,
  },
});
