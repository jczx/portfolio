import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const cache = new Map();
export const loadReactSource = relativePath => {
  const path = resolve(repoRoot, relativePath);
  if (cache.has(path)) return cache.get(path);
  const source = readFileSync(path, 'utf8').replaceAll('import.meta.env.BASE_URL', '"./"');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
    fileName: path,
  });
  const module = { exports: {} };
  const nativeRequire = createRequire(path);
  const localRequire = specifier => {
    if (!specifier.startsWith('.')) return nativeRequire(specifier);
    const target = resolve(dirname(path), specifier);
    const filename = ['', '.ts', '.tsx'].map(extension => target + extension).find(existsSync);
    if (!filename) throw new Error(`Missing import: ${target}`);
    return loadReactSource(filename);
  };
  cache.set(path, module.exports);
  new Function('require', 'module', 'exports', outputText)(localRequire, module, module.exports);
  cache.set(path, module.exports);
  return module.exports;
};
