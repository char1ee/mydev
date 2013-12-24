# 基本用法

<div id="btn_upload"></div>
<script type="text/javascript" src="{{src}}"></script>
<script>
	var swfu;

	function fileDialogComplete() {
		this.startUpload();
	}

	function upload_success_function(fileObject, serverData, receivedResponse){
		alert("\"" + fileObject.name + "\" " + serverData);
	}

	function upload_complete_function(){
		this.startUpload();
	}


	var settings_object = {
		upload_url : "{{path}}/examples/upload.php",
		flash_url : "{{path}}/swfupload2.5.fix.swf",
		file_size_limit : "20 MB",
		debug:true,

		button_placeholder_id: 'btn_upload',
		button_image_url : "{{path}}/examples/assert/XPButtonUploadText_61x22.png",
		button_width : 61,
		button_height : 22,

		file_dialog_complete_handler : fileDialogComplete,
		upload_success_handler : upload_success_function,
		upload_complete_handler : upload_complete_function
	};

	swfu = new SWFUpload(settings_object);
</script>
