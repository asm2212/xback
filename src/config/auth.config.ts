

const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'wow' as string,
  jwtExpiration: '1h',
  bcryptSaltRounds: 10
} as const;

export default authConfig;
