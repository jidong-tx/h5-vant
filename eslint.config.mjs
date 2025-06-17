import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import { fileURLToPath, URL } from "node:url";
import fs from "node:fs";
const autoImportPath = fileURLToPath(new URL("./.eslintrc-auto-import.json", import.meta.url));
const eslintrcAutoImport = JSON.parse(fs.readFileSync(autoImportPath, "utf8"));

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts,vue}"] },

	{ languageOptions: { globals: globals.browser, ...eslintrcAutoImport } },
	// eslint 默认推荐规则
	pluginJs.configs.recommended,
	// ts 默认推荐规则
	...tseslint.configs.recommended,
	// vue3 基础推荐规则
	...pluginVue.configs["flat/essential"],
	{
		files: ["**/*.vue"],
		languageOptions: { parserOptions: { parser: tseslint.parser } },
	},
	{
		// 自定义规则,根据需要增加  eslint 主要是校验代码规范  prettier  格式化代码的
		rules: {
			// 允许 ESLint 直接运行 Prettier 并将结果作为 ESLint 规则来报告
			// “prettier/prettier”: “error”
			// eslint（https://eslint.bootcss.com/docs/rules/）
			"no-var": "error", // 要求使用 let 或 const 而不是 var
			"vue/multi-word-component-names": "off", // 组件名称必须为多个单词
			"no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空行
			"no-unexpected-multiline": "error", // 禁止空余的多行
			"no-useless-escape": "off", // 禁止不必要的转义字符
			"@typescript-eslint/no-unused-vars": "warn", // 禁止定义未使用的变量
			"@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
			"@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
			"@typescript-eslint/semi": "off",
			"@typescript-eslint/no-unsafe-function-type": "off", // 禁止使用 Function 作为 type。
			"vue/script-setup-uses-vars": "error",
			"vue/no-mutating-props": "off", // 不允许组件 prop的改变
			"vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
			"no-unused-vars": "off",
		},
	},

	prettierRecommended,
];
