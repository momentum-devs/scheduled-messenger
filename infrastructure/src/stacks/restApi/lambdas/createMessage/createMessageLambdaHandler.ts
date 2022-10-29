import 'reflect-metadata';

import { Handler } from 'aws-lambda';

export const lambda: Handler = async () => {
  console.log('Creating message...');

  console.log('Message created.');
};
