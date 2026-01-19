import { commonEnvironment } from './environment.common';

const env: Partial<typeof commonEnvironment> = {
  titleApp: 'DEV APP',
};

export const environment = { ...commonEnvironment, ...env };
