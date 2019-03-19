import { GUID } from './src/Utils';

let guid: GUID;

guid = GUID.generate();

console.log(guid);

guid = new GUID('11-11-11');

console.log(guid);
