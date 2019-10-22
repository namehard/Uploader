
索引

* [概述](#ref_description)
* [基础功能](#ref_base)
* [弹窗设置](#ref_popOption)
* [上传状态](#ref_state)
* [组件样式](#ref_style)
* [上传筛选](#ref_filter)

---

!(#ref_description)

### 概述

`ht.ui.Uploader` 上传组件，点击上传按钮增加上传文件列表，可以通过对上传列表编辑控制上传文件内容。

使用此组件需要先引入 `js` 文件

    <script src="ht.js"></script>
    <script src="ht-ui.js"></script>
    <script src="ht-ui-uploader.js"></script>

示范例子：

!(#example_demo@440)

!(#ref_base)

### 基础功能

组件提供 `getFiles` 方法获取上传文件列表内的文件集合 [`ht.List`](http://www.hightopo.com/guide/guide/core/beginners/ht-beginners-guide.html#ref_list)，并能通过鼠标点击 `delete` 按钮删除上传列表内文件，可以重载 `handleFileDataDelete` 做其他操作，最后利用 `removeFileData` 做删除即可，默认代码如下：

    uploader.handleFileDataDelete = function (fileData) {
        uploader.removeFileData(fileData);
    }

!(#ref_popOption)

### 弹窗设置

组件点击上传按钮后，有一个文件选择弹窗，有两个相关属性 `multiple` 和 `accept`：

* `multiple`：控制弹窗内是否支持运用 `鼠标框选` 按住 `ctrl` 或者 `shift` 等方式进行多选，默认为 `true`
* `accept`：控制弹窗默认接收文件类型，默认为 `'all'`，即全部类型，可设置为 `'.jpg'` 等等相关文件类型

!(#example_uploaderPop@240)

代码如下：

    uploader.setMultiple(false);
    uploader.setAccept('.jpg, .png');

!(#ref_state)

### 上传状态

组件提供对上传列表内的文件设置上传状态，以此显示出文件提交到服务器的成功与否，通过对子组件 `fileData` 的 `uploadState` 属性进行设置控制状态图标，默认为 `'waiting'` 不显示状态图标，`true` 和 `false` 分别显示对应的状态图标

!(#example_uploadState@440)

    fileData.setUploadState(true);
    fileData.setUploadState(false);
    
可以通过 `getFileDatas` 获取到 `fileData` 的 [`ht.List`](http://www.hightopo.com/guide/guide/core/beginners/ht-beginners-guide.html#ref_list) 集合，每个 `fileData` 内部保存的文件都有一个属性 `fullName` 作为唯一标识，其规则为 `绝对路径` + `文件名称`，所以 `uploader` 组件拒绝 `fullName` 完全相同的文件重复上传

    file     = fileData.getFile();
    fullName = file.fullName;

!(#ref_style)

### 组件样式

组件可以通过配置对样式进行设置

!(#example_uploaderStyle@440)

组件提供对 `suffix`、 `trueIcon`、 `falseIcon`、 `deleteIcon`  等样式属性进行调整

* `suffix`：上传文件名过长时，结尾省略的字段，默认 `...`
* `trueIcon`：上传成功态图标，大小通过 `rightIconHeight` 和 `rightIconWidth` 控制，提供 `Drawable` 对象可进行绘制控制
* `falseIcon`：上传失败态图标，大小通过 `rightIconHeight` 和 `rightIconWidth` 控制，提供 `Drawable` 对象可进行绘制控制
* `deleteIcon`：删除图标，分为 `hover`、 `active`、 `normal` 三态，分别通过 `hoverDeleteIcon`、 `activeDeleteIcon`、 `deleteIcon` 三个样式属性控制，三态均通过 `rightIconHeight` 和 `rightIconWidth` 控制大小，但是三态分别提供独立的 `Drawable` 对象

代码如下：

     // 更改图标集
    uploader.setTrueIcon('newTrue');
    uploader.setFalseIcon('newFalse');
    uploader.setDeleteIcon('newDeleteIcon');
    uploader.setHoverDeleteIcon('newHoverDeleteIcon');
    uploader.setActiveDeleteIcon('newActiveDeleteIcon');
    
    // 更新省略后缀
    uploader.setSuffix('···');

    // 设置右侧图标大小
    uploader.setRightIconWidth(20);
    uploader.setRightIconHeight(20);

组件的上传按钮继承于 [`ht.ui.Button`](http://www.hightopo.cn/ui/guide/zh/button/ht-ui-button-guide.html)，可以通过重构原型 `prototype` 上的 `createButton` 函数对上传按钮样式进行定义，代码如下：

    ht.ui.Uploader.prototype.createButton = function () {
        var button = new ht.ui.Button();
        button.setBackground('rgb(0,153,173)');
        button.setTextColor('#F7FFFF');
        button.setText('上传文件');
        button.setActiveTextColor('rgb(0,153,173)');
        button.setHoverTextColor('rgb(0,153,173)');
        button.setBorder(new ht.ui.border.LineBorder(1, 'rgb(0,153,173)'));
        return button;
    };

子组件 `fileData` 也继承于 [`ht.ui.Button`](http://www.hightopo.cn/ui/guide/zh/button/ht-ui-button-guide.html)，可以通过 `addViewListener` 监听 `fileDataCreating` 事件对独立的 `fileData` 进行样式控制，代码如下：

    fileDataNumber = 0;
    uploader.addViewListener(e => {
        if (e.kind === 'fileDataCreating') {
            switch (fileDataNumber % 2) {
                case 0:
                    e.data.setBackground('#a2a2a2');
                    e.data.setIcon('Uploader_file_white');
                    e.data.setHoverIcon('Uploader_file');
                    e.data.setActiveIcon('Uploader_file');
                    e.data.setTextColor('#f0f0f0');
                    break;
                case 1:
                    e.data.setTextColor('#929292');
                    e.data.setBackground('#f0f0f0');
                    break;
                default:
                    e.data.setBackground('#a2a2a2');
                    e.data.setTextColor('#f0f0f0');
                    break;
            }
            e.data.setHoverBackground('rgba(255,118,33, 0.1)');
            e.data.setHoverTextColor('rgb(0,153,173)');
            fileDataNumber ++;
        }
    });

组件自身继承于 [`ht.ui.VBoxLayout`](http://www.hightopo.cn/ui/guide/zh/hbox&vbox/ht-ui-hbox&vbox-guide.html#ref_vbox)，通过调节 `align`、 `gap` 等等属性改变布局效果，并提供一个布局颠倒方法 `reverse`，组件设置了最小尺寸 `minsize`，默认 `width` 为 300，`height` 为 100

!(#ref_filter)

### 上传筛选
组件除了使用最简单的 `limit` 属性限制文件上传数量外，也可以实现上传文件筛选功能，取消过大的文件或者其他方面不符合要求的文件，代码如下：

    uploader.setFileFilterFunc(function(file) {
        return file.size > 512000 ? false: true;
    });

!(#example_uploaderFilter@440)