/**
 * UploaderFileData 组件，上传文件组件列表内部元素组件<br>
 * @constructor
 * @extends {ht.ui.Button}
 */
ht.ui.UploaderFileData = function () { }

/**
 * 设置元素的上传状态
 * @param {Boolean} type 上传状态
 */
ht.ui.Uploader.prototype.setUploadState = function (type) { }

/**
 * 获取元素的上传状态
 * @return {Boolean} 上传状态
 */
ht.ui.Uploader.prototype.getUploadState = function (type) { }

/**
 * 设置元素保存的上传文件
 * @param {File} file 上传文件
 */
ht.ui.Uploader.prototype.setFile = function (file) { }

/**
 * 设置元素保存的上传文件
 * @return {File} 上传文件
 */
ht.ui.Uploader.prototype.getFile = function () { }

/**
 * 设置元素右侧图标的状态，其中包含 deleteIcon 和 StateIcon
 * @param {String} state 右侧图标状态，'showDelete' || 'hoverDelete' || 'activeDelete'
 */
ht.ui.Uploader.prototype.setRightIconState = function (state) { }

/**
 * 设置元素右侧图标的状态，其中包含 deleteIcon 和 StateIcon
 * @return {String} 右侧图标状态，'showDelete' || 'hoverDelete' || 'activeDelete'
 */
ht.ui.Uploader.prototype.getRightIconState = function () { }
