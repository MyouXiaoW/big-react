//ReactElement
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Props,
	Key,
	Ref,
	ReactElement,
	ElementType
} from 'shared/ReactTypes';
const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		props,
		ref,
		__mark: 'wang'
	};

	return element;
};

//从config中取出props创建reactElement
//处理maybeChildren属性
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	const props: Props = {};
	let key: Key = null;
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== 'undefined') {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== 'undefined') {
				ref = '' + val;
			}
			continue;
		}

		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}

	return ReactElement(type, key, ref, props);
};

/** jsxDEV 函数用在本地运行项目时，对比jsx函数不需要额外处理maybeChildren */
export const jsxDEV = (type: ElementType, config: any) => {
	const props: Props = {};
	let key: Key = null;
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== 'undefined') {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== 'undefined') {
				ref = '' + val;
			}
			continue;
		}

		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	return ReactElement(type, key, ref, props);
};
