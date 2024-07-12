// eslint-disable-next-line @typescript-eslint/no-var-requires
const pLimit = require('p-limit');

export const limit = pLimit(1);
