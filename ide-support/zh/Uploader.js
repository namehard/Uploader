/**
 * Uploader 组件，上传文件组件<br>
 * @constructor
 * @extends {ht.ui.VBoxLayout}
 */
ht.ui.Uploader = function () { }


/**
 * 设置文件选择弹窗默认接收类型，有兼容性问题
 * @param {String} type null || 'all' || '.jpg, .png' ...
 */
ht.ui.Uploader.prototype.setAccept = function (type) { }

/**
 * 获取文件选择弹窗默认接收类型
 * @return {String} null || 'all' || '.jpg, .png' ...
 */
ht.ui.Uploader.prototype.getAccept = function () { }

/**
 * 设置文件选择弹窗是否支持多选
 * @param {Boolean} type true 多选 false 单选
 */
ht.ui.Uploader.prototype.setMultiple = function (type) { }

/**
 * 获取文件选择弹窗是否支持多选
 * @return {Boolean} 是否多选
 */
ht.ui.Uploader.prototype.getMultiple = function () { }

/**
 * 设置文件筛选函数
 * @param {Function} func 文件筛选函数, return true || false;
 */
ht.ui.Uploader.prototype.setFileFilterFunc = function (func) { }

/**
 * 获取文件筛选函数
 * @return {Function} 文件筛选函数
 */
ht.ui.Uploader.prototype.getFileFilterFunc = function () { }

/**
 * 设置元素的省略结尾字符, 默认 '...'
 * @param {String} suffix 省略结尾字符
 */
ht.ui.Uploader.prototype.setSuffix = function (suffix) { }

/**
 * 设置元素的省略结尾字符
 * @return {String} 省略结尾字符
 */
ht.ui.Uploader.prototype.getSuffix = function () { }

/**
 * 设置删除图标
 * @param {Object} icon 图标
 */
ht.ui.Uploader.prototype.setDeleteIcon = function (icon) { }

/**
 * 获取删除图标
 * @return {Object} 图标
 */
ht.ui.Uploader.prototype.getDeleteIcon = function () { }

/**
 * 设置删除图标的 Drawable 对象
 * @param {ht.ui.drawable.Drawable} drawable 图标 Drawable 对象
 */
ht.ui.Uploader.prototype.setDeleteIconDrawable = function (drawable) { }

/**
 * 获取删除图标的 Drawable 对象
 * @return {ht.ui.drawable.Drawable} 图标 Drawable 对象
 */
ht.ui.Uploader.prototype.getDeleteIconDrawable = function () { }

/**
 * 设置 active 状态下的删除图标
 * @param {Object} icon 图标,
 */
ht.ui.Uploader.prototype.setActiveDeleteIcon = function (icon) { }

/**
 * 获取 active 状态下的删除图标
 * @return {Object} 图标
 */
ht.ui.Uploader.prototype.getActiveDeleteIcon = function () { }

/**
 * 设置 active 状态下删除图标的 Drawable 对象
 * @param {ht.ui.drawable.Drawable} drawable 图标 Drawable 对象
 */
ht.ui.Uploader.prototype.setActiveDeleteIconDrawable = function (drawable) { }

/**
 * 获取 active 状态下的删除图标的 Drawable 对象
 * @return {ht.ui.drawable.Drawable} 图标 Drawable 对象
 */
ht.ui.Uploader.prototype.getActiveDeleteIconDrawable = function () { }

/**
 * 设置 hover 状态下的删除图标
 * @param {Object} icon 图标, return true || false;
 */
ht.ui.Uploader.prototype.setHoverDeleteIcon = function (icon) { }

/**
 * 获取 hover 状态下的删除图标
 * @return {Function} 图标
 */
ht.ui.Uploader.prototype.getHoverDeleteIcon = function () { }

/**
 * 设置 hover 状态下删除图标的 Drawable 对象
 * @param {ht.ui.drawable.Drawable} drawable 图标 Drawable 对象
 */
ht.ui.Uploader.prototype.setHoverDeleteIconDrawable = function (drawable) { }

/**
 * 获取 hover 状态下的删除图标的 Drawable 对象
 * @return {ht.ui.drawable.Drawable} 图标 Drawable 对象
 */
ht.ui.Uploader.prototype.getHoverDeleteIconDrawable = function () { }

/**
 * 设置文件上传状态为 true 的图标
 * @param {Object} icon 图标
 */
ht.ui.Uploader.prototype.setTrueIcon = function (icon) { }

/**
 * 获取文件上传状态为 true 的图标
 * @return {Object} 图标
 */
ht.ui.Uploader.prototype.getTrueIcon = function () { }

/**
 * 设置 true 图标的 Drawable 对象
 * @param {ht.ui.drawable.Drawable} drawable 图标 Drawable 对象
 */
ht.ui.Uploader.prototype.setTrueIconDrawable = function (drawable) { }

/**
 * 获取 true 图标的 Drawable 对象
 * @return {ht.ui.drawable.Drawable} 图标 Drawable 对象
 */
ht.ui.Uploader.prototype.getTrueIconDrawable = function () { }

/**
 * 设置文件上传状态为 false 的图标
 * @param {Object} icon 图标
 */
ht.ui.Uploader.prototype.setFalseIcon = function (icon) { }

/**
 * 获取文件上传状态为 false 的图标
 * @return {Object} 图标
 */
ht.ui.Uploader.prototype.getFalseIcon = function () { }

/**
 * 设置 true 图标的 Drawable 对象
 * @param {ht.ui.drawable.Drawable} drawable 图标 Drawable 对象
 */
ht.ui.Uploader.prototype.setFalseIconDrawable = function (drawable) { }

/**
 * 获取 true 图标的 Drawable 对象
 * @return {ht.ui.drawable.Drawable} 图标 Drawable 对象
 */
ht.ui.Uploader.prototype.getFalseIconDrawable = function () { }

/**
 * 设置右侧图标宽度
 * @param {Number} width 右侧图标宽度
 */
ht.ui.Uploader.prototype.setRightIconWidth = function (width) { }

/**
 * 获取右侧图标宽度
 * @return {Number} 右侧图标宽度
 */
ht.ui.Uploader.prototype.getRightIconWidth = function () { }

/**
 * 设置右侧图标高度
 * @param {Number} height 右侧图标高度
 */
ht.ui.Uploader.prototype.setRightIconHeight = function (height) { }

/**
 * 获取右侧图标高度
 * @return {Number} 右侧图标高度
 */
ht.ui.Uploader.prototype.getRightIconHeight = function () { }

/**
 * 删除上传文件列表中文件
 * @param {ht.ui.UploaderFileData} fileData 上传列表内元素
 */
ht.ui.Uploader.prototype.removeFileData = function (fileData) { }

/**
 * 创造上传按钮方法，可重载做样式处理
 * @return {ht.ui.Button} 按钮，可以重载函数做样式处理
 */
ht.ui.Uploader.prototype.createButton = function () { }

/**
 * 获取上传列表中的元素集合
 * @return {ht.List} 按钮，可以重载函数做样式处理
 */
ht.ui.Uploader.prototype.getFileDatas = function () { }

/**
 * 处理 FileData 删除方法，默认使用 removeFileData 删除 fileData<br>
 * 可重载做其他操作
 * @param {ht.ui.UploaderFileData} fileData 上传文件列表元素
 */
ht.ui.Uploader.prototype.handleFileDataDelete = function (fileData) { }

/**
 * 获取所有上传文件
 * @return {ht.List} 上传文件集合
 */
ht.ui.Uploader.prototype.getFiles = function () { }

/**
 * 布局上下颠倒
 */
ht.ui.Uploader.prototype.reverse = function () { }
