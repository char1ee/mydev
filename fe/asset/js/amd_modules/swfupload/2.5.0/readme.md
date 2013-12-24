## 使用说明

官方提供的 swf 文件存在 XSS 漏洞，这里的版本已修复这个问题。详见：[第三方flash上传组件XSS及相应修复](http://add.corp.qihoo.net/pages/viewpage.action?pageId=3607062)

## 外链形式

```html
<div id="btn_upload"></div>
<script type="text/javascript" src="{{src}}"></script>
<script>
	var swfu;

	function fileDialogComplete() {
		this.startUpload();
	}

	function upload_success_function(fileObject, serverData, receivedResponse){
		alert(serverData);
	}

	window.onload = function () {
		var settings_object = {
			upload_url : "{{path}}/examples/upload.php",
			flash_url : "{{path}}/swfupload2.5.fix.swf",
			file_size_limit : "20 MB",

			button_placeholder_id: 'btn_upload',
			button_image_url : "{{path}}/examples/assert/XPButtonUploadText_61x22.png",
			button_width : 61,
			button_height : 22,

			file_dialog_complete_handler : fileDialogComplete,
			upload_success_handler : upload_success_function
		};

		swfu = new SWFUpload(settings_object);
	};
</script>
```

## 模块加载形式

SWFUpload 不是标准的 AMD 模块。不过仍然可以这样引入：

```
<script>
require(['{{module}}'], function(_) {
    var swfu = new SWFUpload(settings_object);
    //...
});
</script>
```

## 文档参考

[SWFUpload 2.5.0版 官方说明文档 中文翻译版](docs:SWFUpload v2.5.0 Documentation.md)