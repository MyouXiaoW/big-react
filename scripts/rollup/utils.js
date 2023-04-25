import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}

export function getPkgJson(pkgName) {
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, { coding: 'utf-8' });
	return JSON.parse(str);
}

/**
 * 提供基础插件的函数
 * rollup-plugin-typescript2
 * @rollup/plugin-commonjs
 *
 * @returns {[plugin]}
 */
export function getBaseRollupPlugins({ typescript = {} } = {}) {
	return [
		nodeResolve({
			extensions: ['.mjs', '.js', '.json', '.ts']
		}),
		cjs(),
		ts(typescript)
	];
}
