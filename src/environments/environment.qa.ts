import { commonEnvironment } from './environment.common';

const env: Partial<typeof commonEnvironment> = {
  domain: 'https://azure-333',
};

export const environment = { ...commonEnvironment, ...env };
