import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const yamlPath = path.resolve('./src/data/verbs.yaml');
const yamlContent = fs.readFileSync(yamlPath, 'utf8');
const data = yaml.load(yamlContent) as { verbs: string[] };

export const verbs = data.verbs.sort(new Intl.Collator('nb-NO').compare);
