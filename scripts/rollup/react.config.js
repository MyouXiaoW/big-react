import { getPkgJson, resolvePkgPath, getBaseRollupPlugins } from './utils';
import generatePkgJson from 'rollup-plugin-generate-package-json';
const { name, module } = getPkgJson('react');
//react包的路径
const pkgPath = resolvePkgPath(name);
//react打包后产物路径
const distPath = resolvePkgPath(name, true);
// input包的路径
/**
 * input
 * big-react/react/index.ts
 *
 * output
 * big-react/dist/node_modules/react/index.js
 */
console.log(pkgPath);

export default [
	//react
	{
		input: `${pkgPath}/${module}`,
		output: { file: `${distPath}/index.js`, name: 'index.js', format: 'umd' },
		//1.解析ts插件
		//2.
		plugins: [
			...getBaseRollupPlugins(),
			/**
			 * 将react的pkgJson放到打包的文件中
			 */
			generatePkgJson({
				inputFolder: pkgPath,
				outFolder: distPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	//jsx-runtime
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: {
			file: `${distPath}/jsx-runtime.js`,
			name: 'jsx-runtime',
			format: 'umd'
		},
		plugins: getBaseRollupPlugins()
	},
	//jsx-dev-runtime
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: {
			file: `${distPath}/jsx-dev-runtime.js`,
			name: 'jsx-dev-runtime',
			format: 'umd'
		},
		plugins: getBaseRollupPlugins()
	}
];
