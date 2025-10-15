import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const yamlPath = path.resolve('./src/data/nouns.yaml');
const yamlContent = fs.readFileSync(yamlPath, 'utf8');
const data = yaml.load(yamlContent) as { nouns: string[] };

export const nouns = data.nouns.sort(new Intl.Collator('nb-NO').compare);