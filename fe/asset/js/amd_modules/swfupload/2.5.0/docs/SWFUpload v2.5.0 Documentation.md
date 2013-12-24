# 2.5.0版 官方说明文档 中文翻译版

## SWFUpload

SWFUpload 最初是Vinterwebb.se 开发的客户端文件上传工具。它联合javascript和flash，在浏览器中提供一个优于传统上传标签 `<input type="file" />` 的功能（和良好的用户体验）,就像这样：

<input type="file" />

SWFUpload 的主要特性:

- 文件浏览对话框中可以选择多个文件
- AJAX风格的上传，不用重刷新
- 上传过程中的各种事件
- 可以在客户端调节图片大小
- 它使用的类命名空间兼容各种js库(i.e., jQuery, Prototype, 等.)
- 支持 Flash 9 and Flash 10 (2.2.0版本后取消对flash 8的支持)

SWFUpload 的设计理念与其他基于flash的上传工具不同。SWFUpload 给开发者尽可能多的UI控制能力. 开发者可以使用 XHTML, CSS, JavaScript 来使它更符合自己网站的样式风格. 它提供一组简单的js事件更新上传状态，开发者可以根据这些事件来在网页中显示文件上传进度。

不过不幸的是 Flash Player 10 迫使我们不得不用一个按钮（点击后）才能触发文件选择对话框，但SWFUpload允许开发者用js来修改这个按钮的文字等外观。

## SWFUpload v2

SWFUpload v2 包含了许多新的特性，增强的稳定性，解决了Flash Player 中的一些bug，提供了一些有用的插件（Plug-ins）. 新特性包括:

- 可利用Flash Player 10 安全特性.
- 可以随上传来POST额外的数据
- 针对每一个文件上传发送POST数据
- 完善的各种事件组.
- 所有设置，参数，都可以灵活配置.
- 可获取服务器回传的数据.
- 可暂停正在上传的文件，而不是取消.
- 任意修改上传的次序.
- 可提供单一或多文件的选择对话框.
- 可限制上传文件队列长度，文件大小，上传文件个数
- 可更好地处理0字节文件.
- 每个文件都有上传确认事件.

## 概述 (Overview)

### HTML上传

标准的HTML上传框只提供一个按钮和一个文本框让用户选择单个文件。然后通过表单提交。整个文件必须等到它上传完毕后才能确认并检查文件大小，文件扩展名，而且上传的过程中，回传反馈很少。这就造成了一些使用上的不便利。

但传统的HTML上传十分简单，单一步骤，所有浏览器都支持它。

### SWFUpload

SWFUpload 使用Flash 影片（flash movie） 来选择和上传文件。影片里有一个可定制的按钮来激活文件选择对话框。文件选择对话框允许用户选择单一的文件或者多个文件。 选择的的文件类型也是可以被限制的，开发人员可以限定用户只能选择指定的适当的文件，例如*.jgp;*.gif。

一旦选择并点击确定，每个文件都会被验证，并放入队列。当Flash上传文件的时候，由开发人员预定义的Javascript事件会被触发以便来更新页面中的UI显示，并且还能实时提供上传状态和错误信息。

文件的上传是独立于页面和表单的。每个文件单独的上传到处理页面，这就使服务器可以简单轻松地处理文件。flash提供的上传服务使得整个页面不必提交或者刷新。这有点像AJAX程序。页面中的Form表单数据会和FLASH控制的文件上传单独处理。

## 入门 (Getting Started)

SWFUpload 不是拖放式的上传控件。因此需要一些dom和js的知识。几个demo将会展示swfUpload的能力以及如何使用它们完成任务。

SWFUpload 包含4部分:

1. 初始化和设置 (JavaScript)
1. JavaScript 库: SWFUpload.js
1. Flash控件: swfupload.swf 和 swfupload_fp9.swf
1. 事件处理机制 (JavaScript)

许多使用 SWFUpload 的问题都出在设置上。错误的事件处理， Flash/浏览器的Bug,或者服务器配置。

### 初始化和设置 (Initialization and Settings)

SWFUpload 必须在页面上初始化.它通常在js的window.onload事件里完成. SWFUpload 的构造函数需要获取一个Object类型的对象（js）. 这个对象的数据直接的传递给构造函数.

初始化的SWFUpload对象的引用（reference）应该保存好，（即用变量存储起来.如例子中的swfu）因为在启动文件上传以及控制其他特性的时候也需要这个引用。

例子:初始化SWFUpload时直接传入一个匿名对象来配置参数

```
var swfu;

window.onload = function () {
    swfu = new SWFUpload({
        upload_url : "http://www.swfupload.org/upload.php",
        flash_url : "http://www.swfupload.org/swfupload.swf",
        flash9_url : "http://www.swfupload.org/swfupload_fp9.swf",
        file_size_limit : "20 MB"
    });
};
```

例子: 也可以在初始化SWFUpload时使用一个对象变量（settings_object）传入配置参数

```
var swfu;

window.onload = function () {
    var settings_object = {
        upload_url : "http://www.swfupload.org/upload.php",
        flash_url : "http://www.swfupload.org/swfupload.swf",
        flash9_url : "http://www.swfupload.org/swfupload_fp9.swf",
        file_size_limit : "20 MB"
    };

    swfu = new SWFUpload(settings_object);
};
```

### js库 (JavaScript library)

如果想使用swfupload， js库文件(swfupload.js) 必须被引入到使用的页面中.

一旦 SWFUpload 对象被创建，就可以访问许多功能函数。开发者可以以此来控制SWFUpload。

例: 如何引入swfupload.js库

```
<script type="text/javascript" src="http://www.swfupload.org/swfupload.js"></script>
```

例: 按需初始化 SWFUpload.

```
var swfu = new SWFUpload({
    upload_url : "http://www.swfupload.org/upload.php",
    flash_url : "http://www.swfupload.org/swfupload.swf",
    flash9_url : "http://www.swfupload.org/swfupload_fp9.swf",
    button_placeholder_id : "spanSWFUploadButton"
});
```
### flash控件 (Flash Control)

SWFUpload js库能动态的加载 Flash 控件 (swfupload.swf 或 swfupload_fp9.swf).

Flash控件的文件地址在初始化的时候就必须在SWFUpload设置对象中定义。

Flash控件实际上是个Flash小影片，它可以控制文件的选择，验证和上传。

它在页面中展现给用户的是一个UI可自定制的按钮，并且能检测Flash Player的版本（9，10）自动加载适合用户播放器版本的flash控件

使用 flash_url 和 flash9_url 可以设置swfupload.swf 或者 swfupload_fp9.swf 的路径。

### 事件处理 (The Event Handlers)

开发者必须创建一组js函数来处理SWFUpload的事件. 当各种重要的事件发生的时候，这些函数会被触发执行。

通过处理SWFUpload的事件，开发人员能够提供关于上传进度、出错信息以及上传完成等的信息反馈。注意：开发人员不要重写了存储在SWFUpload.prototype的函数。

例: SWFUpload事件处理和初始化.

```
// The uploadStart event handler.  This function variable is assigned to upload_start_handler in the settings object
var myCustomUploadStartEventHandler = function (file) {
    var continue_with_upload;

    if (file.name === "the sky is blue") {
        continue_with_upload = true;
    } else {
        continue_with_upload = false;
    }

    return continue_with_upload;
};

// The uploadSuccess event handler.  This function variable is assigned to upload_success_handler in the settings object
var myCustomUploadSuccessEventHandler = function (file, server_data, receivedResponse) {
    alert("The file " + file.name + " has been delivered to the server. The server responded with " + server_data);
};

// Create the SWFUpload Object
var swfu = new SWFUpload({
    upload_url : "http://www.swfupload.org/upload.php",
    flash_url : "http://www.swfupload.org/swfupload.swf",
    flash9_url : "http://www.swfupload.org/swfupload_fp9.swf",
    file_size_limit : "200 MB",

    upload_start_handler : myCustomUploadStartEventHandler,
    upload_success_handler : myCustomUploadSuccessEventHandler
});
```

## swfupload js 对象 SWFUpload JavaScript Object

### 构造函数 (Constructor)

SWFUpload(settings object)

返回: 一个SWFUpload 实例

```
var swfupload_instance = new SWFUpload(settings_object);
```

### 全局变量和常量 (Globals and Constants)

SWFUpload定义了一些全局变量和常量，这对SWFUpload的高级应用和处理错误都是很有用的，它们都是只读的。

#### SWFUpload.instances

SWFUpload.instances 是存贮着一个页面中所有SWFUpload实例引用的数组对象。Flash Player依靠这个对象数组来调用正确的事件处理函数。SWFUpload.instances对象数组的索引是movieName属性。

#### SWFUpload.movieCount

SWFUpload.movieCount 是一个全局变量，记录页面中已创建了多少个SWFUpload对象实例，并用来确保每个flash影片均被赋予一个唯一的movieName.

#### SWFUpload.QUEUE_ERROR

SWFUpload.QUEUE_ERROR 是一个简单的js对象，包含了队列错误码（Queue Error code）的常量。用来决定当文件队列错误（fileQueueError）发生时，将发送什么错误码。

```
SWFUpload.QUEUE_ERROR = {
    QUEUE_LIMIT_EXCEEDED: -100,
    FILE_EXCEEDS_SIZE_LIMIT: -110,
    ZERO_BYTE_FILE: -120,
    INVALID_FILETYPE: -130
};
```

- QUEUE_LIMIT_EXCEEDED - 指出用户入队过多，超过队列最大长度。不过一旦在队列中的文件被上传或者删除，用户仍然可以添加文件到文件上传等待队列中。
- FILE_EXCEEDS_SIZE_LIMIT -指出超过了所限制的文件大小（file_size_limit）.
- ZERO_BYTE_FILE - 指出选择的文件时0字节的。Flash Player不能处理空文件。上传Windows快捷方式图标也会触发这个错误。
- INVALID_FILETYPE - 指出选择的文件扩展名与允许不符。用户手工输入扩展名不符的文件名，而不是用鼠标点击选择文件的时候就有可能触发这个错误。个错误。

#### SWFUpload.UPLOAD_ERROR

SWFUpload.UPLOAD_ERROR 也是一个简单的js数组对象，它包含了上传错误码常量（Upload Error code constants）.用来决定当上传错误（uploadError）事件发生时发送什么错误码.

- HTTP_ERROR - 尝试上传给服务器，但服务器没有返回200状态码（200表示无异常）
- MISSING_UPLOAD_URL - 没有设置上传地址（upload_url）.
- IO_ERROR - 当读取和发送文件时出现了一些错误。通常发生在服务器非预期地关闭了终端连接的时候。
- SECURITY_ERROR - 安全错误，上传违反了安全约束。比较少见。
- UPLOAD_LIMIT_EXCEEDED - 用户尝试上传比预设数多的文件
- UPLOAD_FAILED - 尝试初始化上传时出现了错误。比较少见。
- SPECIFIED_FILE_ID_NOT_FOUND - 一个文件开始上传，但没有找到这个文件。（文件选择完并添加到队列后，用户又在磁盘上改了文件名或者删除了文件等）
- FILE_VALIDATION_FAILED - 当上传开始时传回了某错误
- FILE_CANCELLED - 取消了上传（调用了cancelUpload函数）
- UPLOAD_STOPPED - 暂停了上传（调用了stopUpload函数）
- RESIZE_ERROR - 当调整图像大小时出现了某错误

#### SWFUpload.FILE_STATUS

SWFUpload.FILE_STATUS 是一个js数组对象，包含了文件状态码常量（ File Status code constants）. 用来检测File对象的属性

- QUEUED - 指示此文件正在等待上传队列中
- IN_PROGRESS - 指示此文件现在正在上传中
- ERROR - 指示此文件引发了一个队列或上传错误
- COMPLETE - 指示此文件已成功传输给服务器
- CANCELLED - 指示此文件被取消上传（调用了cancelUpload函数）.

#### SWFUpload.UPLOAD_TYPE[作用：确定上传类型]

SWFUpload.UPLOAD_TYPE 是一个js数组对象，包含了上传类型常量（Upload Type constants）. 用于检测File对象的上传类型属性（ upload type property）

- NORMAL - 普通的SWFUpload 上传
- RESIZED - 被调整大小的图片上传，数据以HTTP的post方式发送。

#### SWFUpload.BUTTON_ACTION[作用：决定点击按钮后执行的动作]

SWFUpload.BUTTON_ACTION 是一个js数组对象，包含了按钮动作码常量（button action code constants）. 用于按钮动作（button_action）的值设置，从而可设置flash影片中的那个交互式按钮对各种鼠标动作的的相关响应.

- SELECT_FILE - 点击按钮时，打开单一文件选择对话框。（js设定的）鼠标点击事件不会被触发
- SELECT_FILES - 点击按钮时，打开多文件选择对话框。（js设定的）鼠标点击事件不会被触发
- START_UPLOAD - 点击按钮时，在上传队列的第一个文件将被上传。（js设定的）鼠标点击事件不会被触发
- NONE - 这种情况下，（js设定的）鼠标点击事件会被触发
- JAVASCRIPT - 和NONE相同。这个值已被弃用

#### SWFUpload.CURSOR[作用：改变鼠标样式]

SWFUpload.CURSOR 是一个js数组对象，包含了按钮光标常量。用于按钮光标 （button_cursor）的值的设置，从而改变鼠标指向按钮时，鼠标的样式。

- ARROW - 光标呈现成箭头指针
- HAND - 光标呈现成手型

#### SWFUpload.WINDOW_MODE[作用：影片的显示模式]

SWFUpload.WINDOW_MODE 是一个js数组对象，包含了按钮影片窗口模式参数常量（button movie wmode parameter constants）. 用于告诉浏览器如何呈现flash影片。

有些 WINDOW_MODE/WMODE 设置会导致一些浏览器问题 具体请看 [Known Issues](#known-issues).

- WINDOW 是默认模式. flash影片绘制在页面的最上层.
- OPAQUE 允许页面其他元素遮盖这个按钮影片。
- TRANSPARENT 透明。按钮的背景呈透明状，允许html元素在它下面显示

#### SWFUpload.RESIZE_ENCODING[作用：指出图片编码格式]

SWFUpload.RESIZE_ENCODING 是一个js数组对象，包含了大小调整类型常量（ resize encoding type constants）.用以指出被大小调整的图片的编码格式

- JPEG - JPEG编码格式
- PNG - PNG 编码格式

#### SWFUpload.onload [作用：定义页面加载完毕后的操作函数]

onload 是一个可以通过swfobject的addDOMLoadEvent方法执行的函数. 你通过这个方法，在页面加载完毕之后可以执行你的脚本程序。不过你应该确定你没有使用其他类似的方法 (比如 jQuery框架的 “Ready” 或者 Prototype库中的 dom:loaded).

```
SWFUpload.onload = function () {
    new SWFUpload(settingsObject);
}
```

上面一个例子将在最早的浏览器加载事件中初始化SWFUpload。大部分浏览器的DOMReady事件（DOMReady event）会在window.onload之前执行。

### 属性 (Properties)

请遵循下面的属性列表描述来使用这些属性。如果使用其他属性或重写只读属性，将会导致SWFUpload错误。

#### customSettings (可读写)[作用：开发人员自定义设置]

“自定义设置”属性（ customSettings）是一个js空对象。用以存储与一个SWFUpload实例有关的数据。 它的内容可以使用设置对象中的custom_settings属性来初始化。

Example:

```
// Initialize SWFUpload with some custom settings
var swfu = new SWFUpload({
    custom_settings : {
        custom_setting_1 : "custom_setting_value_1",
        custom_setting_2 : "custom_setting_value_2",
        custom_setting_n : "custom_setting_value_n",
    }
});

swfu.customSettings.custom_setting_1 = "custom_setting_value_1";    // Change an existing custom setting
swfu.customSettings.myNewCustomSetting = "new custom setting value";    // Add a new custom setting

// Overwrite the customSettings with a completely new object
swfu.customSettings = {
    custom_setting_A : "custom_setting_value_A",
    custom_setting_B : "custom_setting_value_B"
};
```

存储在自定义设置对象（customSettings object）的值可以轻松地被事件处理函数访问:

```
function uploadSuccess(file, serverData, receivedResponse) {
    if (this.customSettings.custom_setting_A === true) {
        alert("Checked the custom setting!");
    }
}
```

#### movieName （只读）[作用：存储一个swfload实例的唯一标示]

包含了某SWFUpload实例的唯一标示名. 这个值可传递给Flash，以帮助as-js之间的交互。用于索引存储在SWFUpload.instances数组的实例. 你不应该也不能改变它。

### 方法 (Methods)

下面的方法用于操作SWFUpload. 有些方法可以与DOM元素的单击事件绑定，其它的方法供SWFUpload内部处理事件中调用。

#### object addSetting(setting_name, value, default_value)

不赞成使用 The addSetting function sets a setting value. If the value is undefined then the default_value is used. The function is used by SWFUpload

addSetting returns the value that was stored in the setting.

#### object getSetting(setting_name)

不赞成使用 The getSetting function retrieves the value of a setting. If the setting is not found an empty string is returned.

#### object retrieveSetting(setting_value, default_value)

在 v2.1.0 中移除 The retrieveSetting function is similar to the addSetting function except it does not modify the internal settings object. retrieveSetting returns the setting_value unless it is undefined in which case it returns the default_value

This is a utility function.

#### bool destroy() [作用：销毁一个SWFUpload实例]

自 v2.1.0 添加

移除一个SWF的DOM元素，并且销毁SWFUpload的内部引用. 用以彻底删除页面中的一个SWFUpload实例. 防止在ie中的内存泄露问题

如果成功移除，返回true，如果出现任何导致SWFUpload实例的状态出现错误的问题，将返回false（Returns false if any error occurs leaving the SWFUpload instance in an inconsistent state）.

#### void displayDebugInfo()[作用：输出调试信息]

在debug事件中displayDebugInfo（）输出SWFUpload 设置. 如果在初始化时候debug setting被设置为true，这个函数会被自动的调用。

#### void selectFile()

不推荐. 不兼容 Flash Player 10.

selectFile causes the Flash Control to display a File Selection Dialog window. A single file may be selected from the Dialog window.

Calling selectFile begins the File Event Chain.

#### void selectFiles()

不推荐. 不兼容Flash Player 10.

selectFiles causes the Flash Control to display a File Selection Dialog window. A multiple files may be selected from the Dialog window.

Calling selectFiles begins the File Event Chain.

#### void startUpload(file_id)【作用：开始上传文件】

startUpload接收file_id来上传文件。如果不传给它file_id值，那么将默认上传待上传队列的第一个文件

调用startUpload会触发上传事件链 （the Upload Event Chain）.

#### void startResizedUpload(file_id, width, height, encoding, quality, allowEnlarging)【作用：附带调整图片大小功能的上传】

startResizedUpload 接收file_id参数来上传文件. SWFUpload尝试调整文件长宽等设置（如果是flash支持的图片格式） .如果图片格式不被支持，会引发一个上传错误（uploadError）.

width和height参数用来设定图片最大宽和高。但调整过程中会保持图片宽高比。

encoding的值必须是是存在SWFUpload.RESIZE_ENCODING中的常量.

quality 只能用于调节JPEG格式图像的品质。接收范围是0-100。如果在这个范围外，会强制成0或100.

allowEnlarging参数定义了SWFUpload是否允许将原图像扩大。（默认为true）如果原图像的长宽小于前面所说的width和height。如果设置其值为false的话，图像仍然会被编码，但不会将它扩大。

调用startResizedUpload方法会引发一个普通的上传事件链. 但是Flash Player不会定时地提供 uploadProgress 事件. SWFUpload只会发送模拟 0% 和 100% 的上传过程事件（uploadProgress events）.

被调节大小的图片以POST方式传递数据，(而不是像FILE那样) 因为Flash Player 10引入了安全特性 .附带调整图片大小功能的上传的php处理页面和普通的上传php处理页面有所不同：

```
$resizedImageData = $_POST["Filedata"]; // Data from $_POST rather than $_FILE
$fileHandle = fopen("image.jpg", "w");
fwrite($fileHandle, $resizedImageData);
fclose($fileHandle);
```

#### void cancelUpload(file_id, trigger_error_event)【作用：移除一个上传】

cancelUpload接收file_id 参数来移除一个文件的上传.这个文件会被移除出待上传队列 .

如果不给它file_id，默认上传队列中的第一个文件将会被取消.

可选参数trigger_error_event如果被设置为false，uploadError事件将不会被触发.

#### void stopUpload()【作用：停止上传文件】

stopUpload停止当前正在上传的文件，并且把它还原到待上传队列中。（和移除不同，就是取消这个文件的上传，但不会移除出上传队列）

调用stopUpload时，如果有正在上传的文件，uploadError事件会被触发；如果此时没有正在上传文件，那么不会发生任何操作，也不会触发任何事件。

#### bool requeueUpload(file_id or index)【作用：重新入队】

requeueUpload将之前曾经入队的文件重新加入等待上传队列

如果文件没有找到，或者正在被上传，会返回false

注意：被重新入队的文件不会被再一次检查文件大小，队列大小，总上传个数或其他限制，只会把文件添加到队列中，如果这个文件引用仍然存在

#### object getStats()【作用：返回当前状态对象】

返回状态对象（stats object）.

#### void setStats(stats_object)【作用：设置或修改状态对象】

设置或修改状态对象（ Stats Object) . 如果你在上传完毕后改变上传成功数，上传失败数，你可以使用此方法

#### object getFile(file_id|index)【作用：在队列中获取特定文件对象】

getFile通过接收file id (某个文件对象的id) 或者 file index (某个文件对象的index属性)，返回在队列中的文件对象.

当给getFile传递一个file_id,只有在队列中的文件才可能被获取，如果找不到文件，将返回null

当给getFile传递一个index，所有尝试入队的（包括那些入队时产生了错误的文件）将可能被获取。如果index索引超出范围，会返回null

#### object getQueueFile(file_id|index)【作用：返回等待上传队列中特定的文件对象】

getQueueFile 用来从等待上传队列中返回单个文件对象。 具体是通过接收file id (某个文件对象的id) 或者 file index (某个文件对象的index属性)，返回在队列中的文件对象.index 索引从0开始计算.

当给 getQueueFile传递一个file_id,只有在等待上传队列中的文件才可能被获取，如果找不到文件，将返回null

当给 getQueueFile传递一个index，只有在等待上传队列中的文件才可以被获取 例如: getQueueFile(0) 返回一个在等待上传队列首部的文件对象. 如果调用了startUpload函数，它将在当前上传文件上传完毕后被上传。

（上面2个方法的区别可能是：getFile是获取文件队列中的文件。包括已上传的，错误的，等待上传的队列。而getQueueFile只获取等待上传队列中的文件）

#### void addPostParam(name, value)【作用：添加一个键/值对】

addPostParam 添加一个键/值对，在每个的文件被上传时以POST方式捎带发送

它对应着post_params设置中的相同键值对。如果post_params中已经存在该值，那么实际上会被覆盖。

#### void removePostParam(name)【作用：移除一个键/值对】

removePostParam 移除一个键/值对，这个键值对之前将在每个的文件被上传时以POST方式捎带发送

它对应着post_params设置中的相同键值对。如果post_params中已经存在该值，那么实际上会被移除。

#### bool addFileParam(file_id, name, value)

为指定file_id的某一文件对象添加一个POST键/值对，如果添加的name属性已经存在，那么原值会被覆盖。

如果需要给所有文件对象添加POST值，那么可以使用设置中的post_params属性。

#### bool removeFileParam(file_id, name)

删除由addFileParam添加的POST值对.

如果POST设置中没有此属性，那么返回false

#### void setUploadURL(url)

动态修改设置中的upload_url属性。

#### void setPostParams(param_object)

动态修改post_params，以前的属性全部被覆盖。param_object必须是一个JavaScript的基本对象，所有属性和值都必须是字符串类型。

#### void setFileTypes(types, description)

动态修改设置中的file_types 和 file_types_description，两个参数都是必须的

#### void setFileSizeLimit(file_size_limit)

动态修改设置中的file_size_limit，此修改针对之后的文件大小过滤有效。file_size_limit参数接收一个单位，有效的单位有B、KB、MB、GB，默认单位是KB。

例如: 2147483648 B, 2097152, 2097152KB, 2048 MB, 2 GB

#### void setFileUploadLimit(file_upload_limit)

动态修改设置中的file_upload_limit，特殊值0表示无限制。

提醒：这里限制的是一个SWFUpload实例控制上传成功的文件总数。

#### void setFileQueueLimit(file_queue_limit)

动态修改设置中的file_queue_limit，特殊值0表示无限制。

提醒：这里限制的是文件上传队列中（入队检测通过的文件会添加到上传队列等待上传）允许排队的文件总数。

#### void setFilePostName(file_post_name)

动态修改设置中的file_post_name，注意在Linux环境下，FlashPlayer是忽略此设置的。

#### void setUseQueryString(use_query_string)

动态修改设置中的use_query_string，设置为true的时候，SWFUpload以GET形式发送数据，如果为false，那么就以POST发送数据。

#### void setDebugEnabled(debug_enabled)

动态启动/禁止 debug输出，debug_enabled参数是一个布尔值。

#### void setButtonImageURL(url)

动态修改按钮的图片。url参数是相对于该swf文件或者是绝对地址的图片(例如：以 /开始的相对路径或者是绝对路径：`http://www.swfupload.org/buttonImage.png`)。所有FLASH支持的图片类型都可以使用（gif,jpg,png）。

该按钮图片需要经过一定规则（CSS Sprite）的处理。按钮图片中需要包括按钮的4个状态，从上到下依次是normal, hover, down/click, disabled.（可以参照官方demo中的图片）

#### void setButtonDimensions(width, height)

动态修改SWF影片的尺寸以适应Button的图片大小。值必须是纯数值不能包括长度单位.高必须是整个图片按钮高的1/4，以此来保证显示的正确

#### void setButtonText(text)

动态设置Flash Button中显示的文字，支持HTML。HTML文本的样式可以通过CSS选择器并配合setButtonTextStyle方法来设置。如果文字过大，将会被隐藏超过的部分关于Flash文本对HTML的支持详细可见 [Adobe's Flash documentation](http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/text/TextField.html#htmlText)。

#### void setButtonTextStyle(css_style_text)

配合setButtonText方法，可以通过CSS样式来动态设置Flash Button中的文字样式。关于Flash文本对CSS的支持详细可见[Adobe's Flash documentation](http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/text/StyleSheet.html)

#### void setButtonTextPadding(left, top)

设置flash按钮文本的左边和右边的padding。值可以为负数

#### void setButtonDisabled(isDisabled)

当设置为 'true'是会禁用flash按钮，任何关于按钮的动作与操作都会被忽略。

#### void setButtonAction(buttonAction)

定义鼠标被点击后执行的动作。BUTTON_ACTION常量枚举中存储着这个方法可用的值

#### void setButtonCursor(buttonCursor)

设置鼠标指针指向按钮时的样式。CURSOR常量枚举中存储着这个方法可用的值

### 事件 (Events)

SWFUpload在操作过程中会触发一系列事件，开发者可以利用这些回调的处理事件来控制UI，控制操作或者报告错误。

所有的事件都是在SWFUpload实例的上下文中调用的，因此在这些回调的事件中使用this能够直接访问到该触发该事件的实例对象。

所有事件应该在实例初始化时setting参数中预设完成。

上传一个文件时，事件按照下面的顺序被调用(上传事件链):

- `uploadResizeStart` - 附加调整图片大小功能的上传开始
- `uploadStart` - 普通上传开始
- `uploadProgress` - 正在上传中 (在上传文件的过程中重复的被调用着)
- `uploadError` - 上传错误 (当出现某些错误时被调用, 上传文件将被取消或停止)
- `uploadSuccess` - 上传成功 (成功的上传了文件，服务器接受到了可用数据)
- `uploadComplete` - 完成了上传 (上传完成，SWFUpload 准备开始上传下一个)

#### flashReady()

该事件函数是内部事件，因此不能被重写。加载的FLASH控件完成所有初始化操作时，将触发此事件来通知SWFUpload它可以接受各种命令了。

提醒：对应设置中的自定义事件swfupload_loaded_handler

#### swfUploadPreload()

swfUploadPreload 事件是 SWFUpload 已确认各项可用特性之后，Flash Movie加载完毕之前的这段时间内触发的事件.此事件的处理函数如果返回false，将停止加载swfupload。通常用在处理浏览器不支持某重要特性参数的情况 。

在设置对象的 swfupload_preload_handler 属性中可设置此事件处理函数

#### swfUploadLoadFailed()

当页面不能正常加载flash影片的时候。通常是因为没有安装Flash Player或者它的版本低于 9.0.28

在设置对象的 swfupload_load_failed_handler 属性中可设置此事件处理函数

#### swfUploadLoaded()

swfUploadLoaded 事件在flash加载并准备完毕后被触发. 它是可设定的。 swfUploadLoaded 事件将会通知你flash加载完毕，能安全的执行各项方法了。

在设置对象的 swfupload_loaded_handler 属性中可设置此事件处理函数

#### mouseClick()

mouseClick事件在按钮被单击，（同时button_action setting的值为SWFUpload.BUTTON_ACTION.NONE，或者是flash按钮被设置为disable时）才被触发。 如果button_action settings的值为其他，或者flash按钮可用，这个事件都不被触发

在设置对象的 mouse_click_handler 属性中可设置此事件处理函数

#### mouseOver()

mouseOver事件将在鼠标在flash影片的任何部分移动时被触发

在设置对象的 mouse_over_handler 属性中可设置此事件处理函数

#### mouseOut()

mouseOut 事件再鼠标离开flash影片时被触发

在设置对象的 mouse_out_handler 属性中可设置此事件处理函数

#### fileDialogStart()

此事件在selectFile或者selectFiles调用后，文件选择对话框显示之前触发。只能同时存在一个文件对话框。但是，这个事件处理函数将不被执行，直到文件选择对话框被关闭

在设置对象的 file_dialog_start_handler 属性中可设置此事件处理函数

#### fileQueued(file object)

当选择好文件，文件选择对话框关闭消失时，如果选择的文件成功加入待上传队列，那么针对每个成功加入的文件都会触发一次该事件（N个文件成功加入队列，就触发N次此事件）。

对应设置中的自定义事件file_queued_handler

#### fileQueueError(file object, error code, message)

当选择文件对话框关闭时，如果选择的文件加入到上传队列中失败，那么针对每个出错的文件都会触发一次该事件(此事件和fileQueued事件是二选一触发，文件添加到队列只有两种可能，成功和失败)。

文件入队出错的原因可能有：1.超过了上传大小限制，2.文件为零字节，3.超过文件队列数量限制，4.允许外的无效文件类型。

(经测试，message所含的内容如下：

1.超过了上传大小限制：message=File size exceeds allowed limit.

2.文件为零字节：message=File is zero bytes and cannot be uploaded.

3.超过文件队列数量限制：message=int（指你设定的队列大小限制数）

4.允许外的无效文件类型：message=File is not an allowed file type.

如果你要改这些消息，请在开源包里的swfupload.as里改，然后重新编译成swfupload.swf。

)

具体的出错原因可由error code参数来获取，error code的类型可以查看SWFUpload.QUEUE_ERROR中的定义。

提醒：对应设置中的自定义事件file_queue_error_handler

注意：如果选择入队的文件数量超出了设置中的数量限制，那么所有文件都不入队，此事件只触发一次。如果没有超出数目限制，那么会对每个文件进行文件类型和大小的检测，对于不通过的文件触发此事件，通过的文件成功入队。

#### fileDialogComplete(number of files selected, number of files queued, total number of files in the queued)

当选择文件对话框关闭，并且所有选择文件已经处理完成（加入上传队列成功或者失败）时，此事件被触发，number of files selected是选择的文件数目，number of files queued是此次选择的文件中成功加入队列的文件数目。

提醒：对应设置中的自定义事件file_dialog_complete_handler

注意：如果你希望文件在选择以后自动上传，那么在这个事件中调用this.startUpload() 是一个不错的选择。 如果需要更严格的判断，在调用上传之前，可以对入队文件的个数做一个判断，如果大于0，那么可以开始上传。

#### uploadResizeStart(file object, width, height, encoding, quality)

uploadResizeStart事件处理函数在一个图片开始调整大小时被调用。调整期间不提供progress事件和处理方法。 但是重新编码图片会花费一些时间 。如果这期间出现错误的话 uploadError事件将会被触发

当调整完成SWFUpload 继续触发 uploadStart事件，并且开始和普通上传一样的事件链.

#### uploadStart(file object)

在文件开始向服务端上传之前触发uploadStart事件，这个事件处理函数可以完成上传前的最后验证以及其他你需要的操作，例如添加、修改、删除post数据等。

在完成最后的操作以后，如果函数返回false，那么这个上传不会被启动，如果返回true或者无返回，那么将正式启动上传。

提醒：对应设置中的自定义事件upload_start_handler

#### uploadProgress(file object, bytes complete, total bytes)

uploadProgress事件由flash控件定时触发，提供三个参数分别访问上传文件对象、已上传的字节数，总共的字节数。因此可以在这个事件中来定时更新页面中的UI元素，以达到及时显示上传进度的效果。

注意: 在Linux下，Flash Player只在整个文件上传完毕以后才触发一次该事件，官方指出这是Linux Flash Player的一个bug，目前SWFpload库无法解决。

提醒：对应设置中的自定义事件upload_progress_handler

#### uploadError(file object, error code, message)

无论什么时候，只要上传被终止或者没有成功完成，那么uploadError事件都将被触发。error code参数表示了当前错误的类型，更具体的错误类型可以参见SWFUpload.UPLOAD_ERROR中的定义。Message参数表示的是错误的描述。File参数表示的是上传失败的文件对象。

例如，我们请求一个服务端的一个不存在的文件处理页面，那么error code会是-200，message会是404。 停止、退出、uploadStart返回false、HTTP错误、IO错误、文件上传数目超过限制等，都将触发该事件，Upload error will not fire for files that are cancelled but still waiting in the queue。（对于官方的这句话我还存在疑问，文件退出以后怎么还会保留在文件上传队列中呢？）

提醒：对应设置中的自定义事件upload_error_handler

注意：此时文件上传的周期还没有结束，不能在这里开始下一个文件的上传。

#### uploadSuccess(file object, server data, received response)

当文件上传的处理已经完成（这里的完成只是指向目标处理程序发送完了Files信息，只管发，不管是否成功接收），并且服务端返回了200的HTTP状态时，触发uploadSuccess事件。server data指的是服务器发出的一些数据（比如你自己echo出的）而received response是服务器自己发出的HTTP状态码

由于一些Flash Player的bug，HTTP状态码可能不会被获取到，从而导致uploadSuccess事件不能被触发。由于这个原因，2.50版在设置对象中增加了一个新属性assume_success_timeout 用来设置是否超过了等待接收HTTP状态码的最长时间，超过即触发 uploadSuccess。在这种情况下，（received response）参数会无效。

设置对象中的 http_success 允许设置在HTTP状态码为非200的其他值时也触发uploadSuccess事件。In this case no server data is available from the Flash Player.

提醒：对应设置中的自定义事件upload_success_handler

注意：

1. server data是服务端处理程序返回的数据。

1. 此时文件上传的周期还没有结束，不能在这里开始下一个文件的上传。

1. 在window平台下，那么服务端的处理程序在处理完文件存储以后，必须返回一个非空值，否则此事件不会被触发，随后的uploadComplete事件也无法执行。

#### uploadComplete(file object)

当上传队列中的一个文件完成了一个上传周期，无论是成功(uoloadSuccess触发)还是失败(uploadError触发)，uploadComplete事件都会被触发，这也标志着一个文件的上传完成，可以进行下一个文件的上传了。

如果要下个文件自动上传，那么在这个时候调用this.startUpload()来启动下一个文件的上传是不错的选择。不过要小心使用。参见注意

提醒：对应设置中的自定义事件upload_complete_handler

注意：当在进行多文件上传的时候，中途用cancelUpload取消了正在上传的文件，或者用stopUpload停止了正在上传的文件，那么在uploadComplete中就要很小心的使用this. startUpload()，因为在上述情况下，uploadError和uploadComplete会顺序执行，因此虽然停止了当前文件的上传，但会立即进行下一个文件的上传，你可能会觉得这很奇怪，但事实上程序并没有错。如果你希望终止整个队列的自动上传，那么你需要做额外的程序处理了。

#### debug(message)

如果debug setting设置为true，那么页面底部会自动添加一个textArea， 如果此debug事件没有被重写，那么SWFUpload库和Flash都会调用此事件来在页面底部的输出框中添加debug信息供调试使用。

提醒：对应设置中的自定义事件debug_handler

### 功能对象 (SWFUpload Utility Objects)

#### 设置对象 (Settings object)

它是一个js的Object类型的变量，为SWFUpload的实例初始化提供配置。 其中的每一个配置属性都只能出现一次。 很多属性都是可选的，如果可选属性没有被配置，那么会使用SWFUpload库中默认指定的合适的值，具体可查看setting的详细介绍。

例如:（setting可以配置的所有属性）

Example:

```
{
    upload_url : "http://www.swfupload.org/upload.php",
    flash_url : "http://www.swfupload.org/swfupload.swf",
    flash9_url : "http://www.swfupload.org/swfupload_fp9.swf",

    file_post_name : "Filedata",
    post_params : {
        "post_param_name_1" : "post_param_value_1",
        "post_param_name_2" : "post_param_value_2",
        "post_param_name_n" : "post_param_value_n"
    },
    use_query_string : false,
    requeue_on_error : false,
    http_success : [201, 202],
    assume_success_timeout : 0,
    file_types : "*.jpg;*.gif",
    file_types_description: "Web Image Files",
    file_size_limit : "1024",
    file_upload_limit : 10,
    file_queue_limit : 2,

    debug : false,

    prevent_swf_caching : false,
    preserve_relative_urls : false,

    button_placeholder_id : "element_id",
    button_image_url : "http://www.swfupload.org/button_sprite.png",
    button_width : 61,
    button_height : 22,
    button_text : "<b>Click</b> <span class="redText">here</span>",
    button_text_style : ".redText { color: #FF0000; }",
    button_text_left_padding : 3,
    button_text_top_padding : 2,
    button_action : SWFUpload.BUTTON_ACTION.SELECT_FILES,
    button_disabled : false,
    button_cursor : SWFUpload.CURSOR.HAND,
    button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,

    swfupload_loaded_handler : swfupload_loaded_function,
    mouse_click_handler : mouse_click_function,
    mouse_over_handler : mouse_over_function,
    mouse_out_handler : mouse_out_function,
    file_dialog_start_handler : file_dialog_start_function,
    file_queued_handler : file_queued_function,
    file_queue_error_handler : file_queue_error_function,
    file_dialog_complete_handler : file_dialog_complete_function,
    upload_start_handler : upload_start_function,
    upload_progress_handler : upload_progress_function,
    upload_error_handler : upload_error_function,
    upload_success_handler : upload_success_function,
    upload_complete_handler : upload_complete_function,
    debug_handler : debug_function,

    custom_settings : {
        custom_setting_1 : "custom_setting_value_1",
        custom_setting_2 : "custom_setting_value_2",
        custom_setting_n : "custom_setting_value_n",
    }
}
```

#### 设置参数的详细描述 (Settings Description)

##### upload_url

默认值：空字符串

upload_url设置接收的是一个绝对的或者相对于SWF文件的完整URL。推荐使用完整的绝对路径，以避免由浏览器和FlashPlayer修改了基准路径设置而造成的请求路径错误。

如果设置对象的属性preserve_relative_urls为false，SWFUpload将会把相对路径转化成绝对路径，来避免URL在不同系统的flash player中被解析成各种不同的格式。如果你禁用SWFUploads的这个转换，应该使用相对路径来设定swfupload.swf的位置

注意：这里需要考虑FlashPlayer的安全域模型。

##### file_post_name

默认值：Filedata

file_post_name参数允许你设置POST信息中上传文件的name值（类似传统Form中设置了`<input type="file" name="Filedata"/>`的name属性）。

注意：（2.5版待定）在Linux下面此参数设置无效，接收的name总为Filedata，因此为了保证最大的兼容性，建议此参数使用默认值。

##### post_params

默认值：空的Object对象

post_params定义了一些键/值对，允许在上传每个文件时候捎带地post给服务器。这个属性可以用一个js数组对象来赋值。键/值对必须是纯字符串或者数字。（可用js的 typeof（）函数检测）

注意: Flash Player 8 不支持捎带发送post数据. SWFUpload 会自动的以一个query string的形式发送post_params。

##### use_query_string

默认值：false

该属性可选值为true和false，设置post_params是否以GET方式发送。如果为false，那么则以POST形式发送。 引进自v2.1.0

##### preserve_relative_urls

默认值：false

preserve_relative_urls可选值为boolean变量。指示SWFUpload是否将相对URL转换成绝对URL。如果设置为true，那么不会转换。默认为false。即自动转换。

##### requeue_on_error

默认值：false

该属性可选值为true和false。如果设置为true，当文件对象发生uploadError时（除开fileQueue错误和FILE_CANCELLED错误），该文件对象会被重新插入到文件上传队列的前端，而不是被丢弃。如果需要，重新入队的文件可以被再次上传。如果要从上传队列中删除该文件对象，那么必须使用cancelUpload方法。

跟上传失败关联的所有事件同样会被一一触发，因此将上传失败的文件重新入队可能会和Queue Plugin造成冲突（或者是自动上传整个文件队列的自定义代码）。如果代码中调用了startUpload方法自动进行下一个文件的上传，同时也没有采取任何措施让上传失败的文件退出上传队列，那么这个重新入队的上传失败的文件又会开始上传，然后又会失败，重新入队，重新上传...，进入了无止境的循环。

该设置是在v2.1.0中引入的。

##### http_success

默认值：[]

该数组可自定义触发success事件的HTTP状态值。200的状态值始终会触发success，并且只有200的状态会提供serverData。

当接受一个200以外的HTTP状态值时，服务端不需要返回内容。

##### assume_success_timeout

默认值：0

assume_success_timeout设定SWFUpload将等待多少秒来检测服务器响应，超时将强制触发上传成功 （uploadSuccess）事件。这个属性是为了在 Flash Player的bug下正常工作。避免长时间的等待服务器响应，同时解决flash player在mac操作系统下无法使服务器返回内容的bug。

flash在最后一个uploadProgress事件被触发30秒后将忽略服务器的响应而强制触发上传成功事件。

如果assume_success_timeout被设置为0，将禁用这个特性。 SWFUpload将长时间等待 Flash Player来触发 uploadSuccess事件.

##### file_types

默认值：*.*

设置文件选择对话框的文件类型过滤规则，该属性接收的是以分号分隔的文件类型扩展名，例如“ *.jpg;*.gif”，则只允许用户在文件选择对话框中可见并可选jpg和gif类型的文件。默认接收所有类型的文件。

提醒：该设置只是针对客户端浏览器的过滤，对服务端的文件处理中的文件类型过滤没有任何限制，如果你需要做严格的文件过滤，那么服务端同样需要程序检测。

##### file_types_description

默认值：All Files

设置文件选择对话框中显示给用户的文件描述。

##### file_size_limit

默认值：0

设置文件选择对话框的文件大小过滤规则，该属性可接收一个带单位的数值，可用的单位有B,KB,MB,GB。如果忽略了单位，那么默认使用KB。特殊值0表示文件大小无限制。

提醒：该设置只对客户端的浏览器有效，对服务端的文件处理没有任何限制，如果你需要做严格文件过滤，那么服务端同样需要程序处理。

##### file_upload_limit

默认值：0

设置SWFUpload实例允许上传的最多文件数量，同时也是设置对象中file_queue_limit属性的上限。一旦用户已经上传成功或者添加文件到队列达到上最大数量，那么就不能继续添加文件了。特殊值0表示允许上传的数量无限制。只有上传成功（上传触发了uploadSuccess事件）的文件才会在上传数量限制中记数。使用setStats方法可以修改成功上传的文件数量。

注意：该值不能跨页面使用，当页面刷新以后该值也被重置。严格的文件上传数量限制应该由服务端来检测、管理。

##### file_queue_limit

默认值：0

设置文件上传队列中等待文件的最大数量限制。当一个文件被成功上传，出错，或者被退出上传时，如果文件队列中文件数量还没有达到上限，那么可以继续添加新的文件入队，以顶替该文件在文件上传队列中的位置。如果允许上传的文件上限（file_upload_limit）或者剩余的允许文件上传数量小于文件队列上限（file_queue_limit），那么该值将采用这个更小的值。

##### flash_url

默认值：空字符串

设置绝对或者相对于此上传页面的完整URL，一旦SWFupload实例化以后，此设置不能再被修改。

提醒：测试发现使用setUploadURL方法是可以修改此设置的。

##### flash9_url

(v2.5.0新增) 支持 Flash Player 9的Flash 控件（swf） 绝对或相对的URL

##### flash_width

(v2.1.0已删除) Defines the width of the HTML element that contains the flash. Some browsers do not function correctly if this setting is less than 1 px. This setting is optional and has a default value of 1px.

##### flash_height

(v2.1.0已删除) Defines the height of the HTML element that contains the flash. Some browsers do not function correctly if this setting is less than 1 px. This setting is optional and has a default value of 1px.

##### flash_color

（ v2.2.0已删除） This setting sets the background color of the HTML element that contains the flash. The default value is '#FFFFFF'.

Note: This setting may not be effective in "skinning" 1px flash element in all browsers.

##### prevent_swf_caching

默认值：true

(v2.2.0新增)该布尔值设置是否在Flash URL后添加一个随机值，用来防止浏览器缓存了该SWF影片。这是为了解决一些基于IE-engine的浏览器上出现的一个BUG。

提醒：SWFUpload是直接在flash_url后添加了一个swfuploadrnd的随机参数。如果你给定的flash_url中已经存在了GET类型的参数，那么就会出现两个问号连接符导致错误。

##### debug

默认值：false

该值是布尔类型，设置debug事件是否被触发。

注意：SWFUpload代码中是将此变量和字符串true做的恒等判断，因此它只认定true为DEBUG模式开启，如果设置为1，虽然JS认定是开启模式，并且在初始化完毕后会有生成Debug Console，但后续操作中FLASH不会输出调试信息。（因为我习惯用1和0代表布尔变量，因此一度疑惑为何Flash的debug信息无法输出。）

##### button_placeholder_id

默认值：null

(v2.2.0新增) 该必要参数指定了swfupload.swf将要替换的页面内的DOM元素的ID值。当对应的DOM元素被替换为SWF元素时，SWF的容器会被添加一个名称为"swfupload"的样式选择器供CSS自定义使用。

##### button_image_url

默认值：空字符串

(v2.2.0新增) V2.2.0版最大的改变就是引入了一个按钮到SWF中，利用该参数可以设置一个相对于该swf文件或者是绝对地址的图片（或者是SWF），作为按钮的UI展现。所有FLASH支持的图片类型都可以使用（gif,jpg,png,或者是一个SWF）。

该按钮图片需要经过一定规则（CSS Sprite）的处理。按钮图片中需要包括按钮的4个状态，从上到下依次是normal, hover, down/click, disabled.(可以参照官方demo中的图片)

##### button_width

默认值：1

(v2.2.0新增) 设置该SWF的宽度属性。

##### button_height

默认值：1

(v2.2.0新增)设置该SWF的高度属性（按钮图片高度的1/4）

##### button_text

默认值：空字符串

(v2.2.0新增) 该属性设置Flash Button中显示的文字，支持HTML。HTML文本的样式可以通过CSS选择器并配合button_text_style参数来设置。关于Flash文本对HTML的支持详细可见 [Adobe's Flash documentation](http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/text/TextField.html#htmlText)。

##### button_text_style

默认值："color: #000000; font-size: 16pt;"

(v2.2.0新增)此参数配合button_text参数，可以通过CSS样式来设置Flash Button中的文字样式。关于Flash文本对CSS的支持详细可见[Adobe's Flash documentation](http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/text/StyleSheet.html)

##### button_text_top_padding

默认值：0

(v2.2.0新增) 设置Flash Button上文字距离顶部的距离，可以使用负值。

##### button_text_left_padding

默认值：0

(v2.2.0新增) 设置Flash Button上文字距离左侧的距离，可以使用负值。

##### button_action

默认值：SWFUpload.BUTTON_ACTION.SELECT_FILES(多文件上传)

(v2.2.0新增) 设置Flash Button点击以后的动作。默认为SWFUpload.BUTTON_ACTION.SELECT_FILES，点击按钮将会打开多文件上传的对话框。如果设置为SWFUpload.BUTTON_ACTION.SELECT_FILE，则为单文件上传。如果设置为SWFUpload.BUTTON_ACTION.START_UPLOAD，则启动文件上传。

##### button_disabled

默认值：false

(v2.2.0新增) 该布尔值设置Flash Button是否是禁用状态。当它处于禁用状态的时候，点击不会执行任何操作。

##### button_cursor

默认值：SWFUpload.CURSOR.ARROW(箭头光标)

(v2.2.0新增) 此参数可以设置鼠标划过Flash Button时的光标状态。默认为SWFUpload.CURSOR.ARROW，如果设置为SWFUpload.CURSOR.HAND，则为手形

##### button_window_mode

默认值：SWFUpload.WINDOW_MODE.WINDOW

(v2.2.0新增) 此参数可以设置浏览器具体以哪种模式显示该SWF影片。

##### custom_settings

默认值：空的Object对象

该属性接收一个Object类型数据，可用于安全地存储与SWFUpload实例关联的自定义信息，例如属性和方法，而不用担心跟SWFUpload内部的方法和属性冲突以及版本升级的兼容。

设置完毕以后，可以通过实例的customSettings属性来访问。

```
var swfu = new SWFUpload({
    custom_settings : {
        "My Setting" : "This is my setting",
        myothersetting : "This is my other setting",
        integer_setting : 100,
        a_dom_setting : document.getElementById("some_element_id")
    }
});

var my_setting = swfu.customSettings["My Setting"]);
swfu.customSettings["My Setting"] = "This is my new setting";
swfu.customSetting.myothersetting = "another new value";
swfu.customSetting.integer_setting += 25;
swfu.customSetting["a_dom_setting"].style.visibility = "hidden";
```

##### Event Handlers

默认值：null

剩下的设置定义的是一系列事件处理的回调函数，在SWFUpload的操作过程中相应的事件会被触发。如果你需要在这些回调中进行自定义操作，那么你应该在设置中定义对应的JavaScript函数。

#### Support Object

SWFUpload实例的support属性（其类型是一个对象）能确认SWFUpload的某些特性是否能被浏览器使用的某版本Flash Player支持

```
{
    load : bool,            // Indicates if SWFupload is able to load based of Flash Player version
    imageResize : bool,     // Indicates of Flash Player 10 or later is installed and SWFUpload supports client side resizing and uploading of images.
}
```

#### File Object

File对象包含了一组可用的文件属性，很多处理事件都会传递一个File Object参数来访问该文件的相关属性。某些操作系统没有不会填写任何值。

```
{
    id : string,            // SWFUpload file id, used for starting or cancelling and upload
    index : number,         // The index of this file for use in getFile(i)
    name : string,          // The file name. The path is not included.
    size : number,          // The file size in bytes
    type : string,          // The file type as reported by the client operating system
    creationdate : Date,        // The date the file was created
    modificationdate : Date,    // The date the file was last modified
    filestatus : number,        // The file's current status. Use SWFUpload.FILE_STATUS to interpret the value.
    post : object           // The post params that will be sent with this file (compiled from the post_params setting and any params added with the addFileParam function

}
```

#### Stats Object

该对象提供了上传队列的状态信息，访问实例的getStats方法可获取此对象。

该对象包括下面属性：

````
{
    in_progress : number        // 1 or 0 indicating if a file upload is currently in progress
    files_queued : number       // The number of files currently in the queue
    successful_uploads : number // The number of files that have uploaded successfully (caused uploadSuccess to be fired)
    upload_errors : number      // The number of files that have had errors (excluding cancelled files)
    upload_cancelled : number   // The number of files that have been cancelled
    queue_errors : number       // The number of files that caused fileQueueError to be fired
}
````

所有这些属性的值都可以使用setStats方法来修改，除了in_progress 和 files_queued。

## 插件 (SWFUpload Plug-ins)

SWFUpload v2.0版本之后引入了几个插件。它们帮助SWFUpload实现一些功能

大多数插件使用文档在js插件（plugin）文件夹里

### SWFObject

SWFObject插件使用 [SWFObject library](http://code.google.com/p/swfobject/) 来将 SWFUpload Flash组件（Component）插入页面

这个插件也提供文档结构载入完毕检测功能（Document Ready loading） 。（此功能像是jQery的$(document).ready()）和flash版本检测功能。详细使用方法以文档的方式记录在此插件文件夹内。你最好不要使用 SWFObject的文档结构载入完毕检测功能（ Document Ready loading）和其他库的相似功能混搭共同使用。只用其中的一个就可以了。

Flash Player 10: 由于 Flash Player 10要求使用一个按钮来触发影片的相关操作，如果这个按钮 （设置对象里的button_placeholder_id属性可标示它的id）被css之类的设置成hidden或者display：none，SWFUpload将加载失败 。

### Cookies

为了解决Flash Cookie的 Bug，Cookies插件将自动获取你浏览器的cookie，并随上传发送。cookie将以 POST or GET 形式随上传url发送。

此插件以POST或GET方式发送cookie的键/值对.在服务器端它们不会以cookie形式来解析。某些自动检测cookie来确认session和身份授权的框架可能并不能获取此插件传递的值。

### Queue Handling

Queue Handling插件提供队列处理功能。比如整个队列的上传，整个队列的取消，入队后自动开始上传。

### Speed

speed插件扩展了'file' 对象的几个属性用以描述当前上传情况。此插件包含了当前速度（ current speed）,平均速度（ average speed）,已上传时间（ elapsed time）,预计还需的时间（ remaining time）等值。

## 已知的问题 (Known Issues)<a name="known-issues"></a>

Flash Player以及许多浏览器的bug 困扰着SWFUpload. 但是我们一直在努力。

### linux上的取消 (Cancelling in Linux)

使用Flash 9 Player以及更早版本，在linux操作系统上执行取消上传功能将可能导致浏览器崩溃。不过新版本的Flash Player改善了这个问题。

### linux上的上传进度 (Upload Progress in Linux)

linux上的 Flash Player只在上传完毕后发出一次上传进度事件 （uploadProgress） ，而不是像windows里那样上传过程中不断发出。

这是由于一些linux分发版会在上传过程中锁定整个浏览器。

### MAC上的上传进度 (Upload Progress in OS X)

我们收到了一些关于MAC操作系统上Flash Player不能触发uploadProgress事件的报告。详细的情况还有待了解，但请注意其潜在的问题

### MIME Type

无论文件的实际MIME格式是什么，Flash Player以 mime格式application/octet-stream 上传所有的文件

### 文件最大可选择数 (Maximum number of selected files)
Flash Player本身并没有限制可选择上传文件数的最大值，但是限制了总文件名的最大长度。这个字符串是这样组成的： "文件名"空格"文件名"。能上传文件的个数取决于操作系统对文件名总长度的限制。如果用户选择了过多的文件，将会收到flash player的警告消息，并且显示在文件选择对话框里

### 代理 (Proxies)

Flash Player可能不能正常的使用代理。 它在处理代理验证时候有些问题，可能导致某些冲突。

有些杀毒软件使用一个本地客户端代理来接收上传的文件并进行扫描，（貌似是截获了上传文件，并把它写入一个代理服务器，扫描完毕后才会真正发送给目标服务器）这导致SWFUpload错误的以为整个文件被上传了，它将的发出大量的uploadProgress事件，直到100%完毕。当代理真正地上传给目标服务器的过程中，SWFUpload看起来像是被暂停了。

卡巴斯基杀毒软件：卡巴斯基 （和其他一些杀软）实现了一个用户端的代理，用来截获本地上传出的数据。SWFUpload不能检测这个代理系统的存在。这些代理服务器能非常快地接收上传的文件，扫描后再发送给目标文件。

### apache安全模块 (Apache mod_security)

Apache的安全模块 mod_security 验证服务器收到的 POST 消息. Flash Player实现了一个边缘化的方式 POST 上传文件，服务器的 mod_security 模块会拒绝上传。你可以用 .htaccess 文件禁用 mod_security 模块。

### 安全套接层协议层 SSL

我们收到一些报告称Flash Player 不能通过SSL来上传. 这个问题的具体情况还没被确认，但是看起来确实在ssl下上传并不可靠。特别是使用公匙-自签名证书（self-signed certificates）时会出现问题。

同样，由不被信任的签发机构CA发放的 SSL 证书不能被Flash接受。因为flash并没有提供一个这样的接收证书的方法。就像前面说的cookie bug，windows下的flash player只接收它所信任的名单中的CA发放的证书，而不管浏览器正在使用中的证书。

### 授权 (Authentication)

HTTP 的授权验证机制不能被Flash Player良好的支持. 最新版本的 Flash Player会好一些，旧版本的可能会造成浏览器崩溃。

### 过早终止连接 (Prematurely terminated connections)

过早终止连接 Prematurely ending the response (比如ASP.NET中的Response.end()方法) 会导致原本上传完毕，SWFUpload却报告上传失败。

### 文件的POST名 (Filedata POST name in Linux)

改变文件接收名 (默认 “Filedata” ，设置对象中file_post_name属性) 在Linux的 Flash Player中并不起作用.

### Cookie bug

在Windows 下非IE浏览器 (FireFox, Opera, Safari, etc) flash插件将会发送IE的cookie . 这破坏了很多服务器的session和授权验证机制

开发者必须自己手动解决传递 Session 和授权 cookie 信息的问题，还要自己手动修改在服务器上的session。如果他们想使用session。

不过SWFUpload软件包里提供了一个PHP 或 ASP.Net里解决此bug的例子代码。

###  ExternalInterface bugs

当和浏览器/js交互时，Flash Player不能正确使用escape方法编码数据。SWFUpload为解决这个问题做了很大的努力。将来如果这个bug修复了，SWFUpload将会发送额外的escape编码数据.

### 超长服务器数据bug（Server Data length bugs）

过长的服务器响应数据在MAC或Linux系统中的Flash Player下会导致错误。数据可能会被裁短，改变或者某些重复。我们建议服务器发回的数据尽量的短小简明。

### Avant Browser

一旦被缓存了，SWFUpload不能正确工作在Avant浏览器上.

SWFUpload v2.2.0版本后添加了 prevent_swf_caching 设置来试图解决这个问题 .

### 文件选择对话框与页面改变 (File Dialog & Page Changing)

在出现文件选择对话框时离开或者刷新页面将会导致浏览器崩溃。（所有浏览器，所有操作系统下）

这种情况大多出现在你设定了一个超级链接`<a>`的“onclick”事件调用selectFile/selectFiles ，但又没有禁止它默认的转跳行为，点击这个超链的同时会跳到其他页面但同时又打开了文件选择对话框。

### 服务器脚本执行时间过长 (Long Running Upload Scripts)

Flash上传文件给web服务器后，上传接收程序就会被执行。 接收程序决定是否存储它们，创建缩略图，扫描病毒等等，如果接收程序30秒内不返回任何数据，Flash将断开链接，并返回一个IO错误。

如果你不想这样做，那么在处理的过程中，让服务器返回几个字符或者数据。

比如PHP，虽然PHP脚本能在Flash断开后继续成功地完成操作，但断开之后Flash将不会接收到任何返回数据。

### 窗口模式（WMODE/BUTTON_WINDOW_MODE）

在某些浏览器中，如果flash控件没有处于屏幕显示区域，设定的WMODE（由BUTTON_WINDOW_MODE设定）会阻止flash控件的载入。只有当你拉动滚动条，让flash控件处于屏幕显示区域，才会加载并呈现。

这种特性可能会对SWFObject插件有不利的影响。SWFUpload事件可能不会被触发，按钮的背景图可能不会被载入除非控件呈现完毕。

某些操作系统中 (Linux ) 当 WMODE 被设置为透明， Flash 打开的文件选择对话框会在浏览器窗口之后。

### 内存泄露（Memory Leaks）

一些浏览器 (特别是 IE)不能在flash player用 ExternalInterface类与js交互后回收内存，(比如 SWFUpload). 生成过多的SWFUpload实例并且刷新几次页面将导致浏览器占用内存过多，进而导致浏览器崩溃或者其他一些系统错误。

在 v2.2.0版本的 SWFUpload 中，我们实现了一些预防内存泄露的机制。但是还是推荐您在页面关闭时候调用destroy方法。如果你在一个页面使用几百个SWFUpload实例，你必须小心测试以防内存泄露。

### 有关MAC操作系统的一些问题 (Other Mac Issues)

- 服务器返回的数据或 Mac系统上的 Flash Player 可能并不会触发 uploadSuccess 事件.我们添加了一个 assume_success_timeout 设置来帮助解决这个问题 。但是通常情况下，在接收成功后返回一个简短的字段是十分容易且可靠的。
- 有些用户反映在Mac系统下上传给含子域名的地址时有一些问题
- 有些用户反映重定向(HTTP 状态码 302) 不能被 Mac Flash Player很好的处理. Windows 下似乎没这个问题. 302 重定向经常用在一些授权模式和MVC设计框架中。
- flash的开发文档指出，在早于 OS X 10.3版本的系统中，bytes loaded 一直会是 -1. SWFUpload把它改成了 0，但是 total bytes将不会被发送出来，进度永远到不了100% 。因此请设定在上传完毕，发出uploadSuccess 或 uploadComplete事件时更新UI让其显示100%。以此来让UI在各系统统一。
- 有些用户反映Mac Flash Player上传路径有空格字符时将出现问题. 请将它们替换成+或者%20
- 有些用户反映Mac Flash Player 会在 HTTP HOST头里加入端口号 (比如 `http://www.example.com:80`). 如果你检查这个参数，要小心对付这个问题。
- 文件如果只包含一个资源分支（resource fork），将会被Flash Player以0字节文件对待，不能上传(提示: Flash Player 10.1可能解决了这个问题)