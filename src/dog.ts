import { Dog } from '@qqi/log';
import { isFalse } from 'a-type-of-js';

/**  dev log  */
export const dog = new Dog({
  name: 'create a npm',
  type: false,
});

/**  正式环境  */
export const dun = isFalse(dog.type);
