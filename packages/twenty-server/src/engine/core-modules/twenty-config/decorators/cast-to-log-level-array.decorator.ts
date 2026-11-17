import { Transform } from 'class-transformer';

const VALID_LOG_LEVELS = [
  'log',
  'error',
  'warn',
  'debug',
  'verbose',
  'performance',
];

export const CastToLogLevelArray = () =>
  Transform(({ value }: { value: unknown }) => toLogLevelArray(value));

const toLogLevelArray = (value: unknown) => {
  if (typeof value !== 'string' && !Array.isArray(value)) {
    return undefined;
  }

  const rawLogLevels = (
    Array.isArray(value) ? value : value.split(',')
  ).map((level) => (typeof level === 'string' ? level.trim() : String(level)));

  const invalidLevels = rawLogLevels.filter(
    (level) => !VALID_LOG_LEVELS.includes(level),
  );

  if (invalidLevels.length > 0) {
    throw new Error(
      `Invalid log level(s): ${invalidLevels.join(', ')}. Valid levels are: ${VALID_LOG_LEVELS.join(', ')}`,
    );
  }

  return rawLogLevels;
};
