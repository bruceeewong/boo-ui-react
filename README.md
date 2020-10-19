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

### 跨浏览器样式统一

引入 `normalize.css` https://github.com/necolas/normalize.css

在其基础上, 混入预定好的 sass 变量.

#### Sass知识

##### Partial module

`_`开头的文件在sass看来是 partial 模块，只能被导入，不可以单独的编译导出（结果为空）。

使用`@import`不会额外发请求，引入的时候不需要加`_`

例子

```
// 假设同层级有 _variables.scss 文件
@import "variables"
```

## 组件

### Button组件

不同的 Button Type

- Primary
- Default
- Danger
- Link Button

不同的 Button Size

- normal
- small
- large

Disabled状态

- button disable
- link 需要做单独处理

```jsx
<Button
	size="lg"
	type="primary"
	disabled
	href?=""
	className?=""
	autoFocus?=""
	...
>
	prop children
</Button>
```

#### disabled 状态的 css

```scss
&.disabled,
&[disabled] {
    cursor: not-allowed;
    opacity: $btn-disabled-opacity;
    box-shadow: none;
    > * {
        pointer-events: none;
    }
}
```

#### 如何导入button, a 标签 原生属性?

使用 typescript  [Intersection Types 交叉类型](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types), 即 

```
type NewType = Type1 & Type2
```

将 `React.ButtonHTMLAttributes` 类型与 `自定义props` 结合起来.

又由于 button 和 anchor 存在不同的必选参数, 所以要使用 ts 的 Util type [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)  将必选变为可选.

结果如下:

```tsx
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
```

#### 支持用户自定义class

将props的 `className` 透传到 class 即可

#### 支持事件, 其他属性

通过解构 props + 透传 实现.

### Alert组件

用于页面中展示重要的提示信息, 页面中的非浮层元素, 不会自动消失

#### 功能点

- 点击关闭 整个元素消失
- 支持四种主题颜色: success, default, danger, warning
- 可以包含标题和内容,解释更详细的警告
- 右侧是否显示关闭按钮可配置

#### 设计

```
<Alert
	title=""
	content=""
	alertType=""
	closable={true}
	onClose={}
/>
```

## Menu 组件

#### 功能 

- 横向
- 纵向
- 下拉菜单
- disabled

#### 设计

```tsx
<Menu defaultIndex={0} onSelect={} mode="vertical">
	<Menu.Item>
		title one
	</Menu.Item>
	<Menu.Item disabled>
		diabled link
	</Menu.Item>
	<Menu.Item>
		<a href="https://qq.com">QQ</a>
	</Menu.Item>
</Menu>

interface MenuProps {
    activeIndex: number;
    mode: string;
    onSelect: (selectInedx: number) => void;
    className: string;
}

interface MenuItemProps {
    index: number;
    disabled: boolean;
    className: string;
}
```

#### 传递 selectedIndex 等数据

使用 context 与 useContext Hook 进行透传

#### 限制 children 类型

使用 `React.Children.map` 循环 chilren prop, 对属性名进行过滤

## 组件测试

### 测试库选型

Jest: https://jestjs.io/ 通用测试工具

[react testing library](https://testing-library.com/docs/react-testing-library/intro): React3.3.0后官方推荐的测试库 npm `@testing-library/react`

[jest-dom](https://github.com/testing-library/jest-dom#usage): 为 jest matcher 新增了对于 DOM 的断言matcher

## 知识点

### 将 css class 名组合起来

`classnames`: https://github.com/JedWatson/classnames

