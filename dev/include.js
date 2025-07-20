import { promises as fs } from 'fs';
import { RULES } from './rules.js';

export class Include {
    log() {
        console.log(this.source);
    }
}
