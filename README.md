# Boo UI React组件库

> 作者: Bruski aka Boo
>
> 更新时间: 2020/10/18

##  项目初步分析

需要思考的问题

- 代码结构
- 需求分析和编码
- 样式解决方案
- 组件测试用例分析和编码
- 代码打包输出和发布
- CI/CD，文档生成

化繁为简，从简单入手，在需求中慢慢复杂

### 项目结构设计

```
boo-ui-react/
	README.md
	node_modules/
	package.json
	tsconfig.json
	src/
		components/
			Button/
				button.tsx
				button.test.tsx
				style.scss
        styles/
            ...
       	index.tsx
```

### 代码规范

create-react-app 集成了 `react-app`

 vs code 配置 `.vscode/setting.json`

```json
{
  "eslint.validate": {
    "javascript",
    "javascriptreact",
    {"language": "typescript", "autoFix": true}, 
    {"language": "typescriptreact", "autoFix": true}, 
  }
}
```

### 样式解决方案分析

- inline-css 

- css in js
- styled component
- sass / less (Picked!)

文件结构

```
styles/
	_variables.scss  // 变量和可配置项
	_mixins.scss  // 全局 mixins
	_functions.scss  // 全局 functions
components/
	Button/
		style.scss // 组件单独的样式
```

### 创建组件库的色彩体系

系统色板：

	- 基础色板
	- 中性色板

产品色板

- 功能色

色彩体系

![色彩体系](docs/img/色彩体系.png)

### 组件库样式变量分类

- 基础色彩系统
- 字体系统
- 表单
- 按钮
- 边框和阴影
- 可配置开关

### 构建sass全局styles

#### 定义色彩系统

>  `src/styles/_variables.scss`

```scss
/* 系统色板 */
/* ========================== */
/* 中性色 Neutral colors */
$white:   #ffffff   !default;
$black:   #000000   !default;
$gray-100:#f8f9fa   !default;
$gray-200:#e9ecef   !default;
$gray-300:#dee2e6   !default;
$gray-400:#ced4da   !default;
$gray-500:#adb5bd   !default;
$gray-600:#6c757d   !default;
$gray-700:#495057   !default;
$gray-800:#343a40   !default;
$gray-900:#212529   !default;

/* 基础色板 Basic colors */
$red:     #dc3545   !default; // 红
$pink:    #d63384   !default; // 粉
$orange:  #fd7e14   !default; // 橙
$yellow:  #fadb14   !default; // 黄
$green:   #52c41a   !default; // 绿
$teal:    #20c997   !default; // 青
$cyan:    #17a2b8   !default; // 蓝绿
$blue:    #0d6efd   !default; // 蓝
$indigo:  #6610f2   !default; // 靛青
$purple:  #6f42c1   !default; // 紫 

/* 产品色板 */
/* ========================== */
/* 功能色 */
$primary:   $blue       !default;
$secondary: $gray-600   !default;
$success:   $green      !default;
$info:      $cyan       !default;
$warning:   $yellow     !default;
$danger:    $red        !default;
$light:     $gray-100   !default;
$dark:      $gray-800   !default;
```

`!default` 关键字是sass提供，说明该变量可以被覆盖。



