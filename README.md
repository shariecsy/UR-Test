# UI组件库
这个是前端UI组件库，基于React.js的0.14.8版本，结合主要考虑到要兼容IE8的情况。(兼容IE8的情况，需要另外引用es5-sham和es5-shim的第三方库)。
***
## 项目目录结构说明
- dist 

	UI组件库的发布版本，其中包括了**ucsmy-ui.js**未压缩版和**ucsmy-ui.min.js**压缩版，生产上建议使用压缩版来提高加载效率。
	
	**libs**文件夹下面包含了React.js的0.14.8的基础库。
	
	**compatible**文件夹包含了兼容IE8的es5-sham和es5-shim的第三方垫片库。
- doc
	
	UI组件的API说明文档。
- examples
	
	UI组件的使用示例，包括可运行示例及示例源码，每一个组件都有一个示例。
- sass
	
	UI组件示例所用到的css样式源码。

- src

	UI组件的组件源码
***
## 使用说明

UI组件库在运行时，会创建一个全局对象，对象名称为**UcsmyUI**，所有的组件都包含在此对象中。

### 引用：
1.  在页面引用基础类库文件。

```
    <script type="text/javascript" src="../libs/react.min.js"></script>
    <script type="text/javascript" src="../libs/react-dom.min.js"></script>
    <script type="text/javascript" src="../../dist/ucsmy-ui.min.js"></script>
```

如果需要兼容IE7/8，需要在页面引用es5-sham和es5-shim的垫片文件。

```
    <script type="text/javascript" src="../../dist/compatible/es5-shim.min.js"></script>
    <script type="text/javascript" src="../../dist/compatible/es5-sham.min.js"></script>
```

2.  在JavaScript脚本中使用UI组件。

```
var Input = UcsmyUI.Input;
...

```

## API

组件API文档 http://172.17.21.138:8080

## 问题及支持

如果在使用的过程中，发现有问题或者希望我们提供新的组件时，请在ISSUE面板提交ISSUE，我们会在ISSUE上进行咨询答复，请按格式要求提交，谢谢。

- 问题

	【问题】xxx组件在xxx情况下有xxx问题
	
- 需求

	【需求】增加XXX功能组件
	
	【需求】XXX组件增加XXX功能
	
	【需求】XXX组件修改XXX功能
	
	【需求】XXX组件删除XXX功能
	
	【需求】删除XXX功能组件
	