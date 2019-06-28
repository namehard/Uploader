var FileData = ui.UploaderFileData = function(uploader) {
    var self = this;
    
    FileData.superClass.constructor.call(self);

    self._source = uploader;
};

Default.def("ht.ui.UploaderFileData", ui.Button, {
    ms_ac: [
        'uploadState', 'file', 'rightIconState'
    ],

    // 继承
    __icon: 'Uploader_file',
    __iconWidth: 16,
    __iconHeight: 16,
    __iconTextGap: 5,
    __border: null,
    __align: 'left',
    __text: '未知文件.xxx',
    __textFont: '18px arial, sans-serif',
    __textColor: '#4B5B6F',
    __hoverTextColor: '#31A5FF',
    __activeTextColor: '#31A5FF',
    __background: '#FFF',
    __hoverBackground: '#F5F8FA',
    __activeBackground: '#F5F8FA',
    __state: 'normal',
    __padding: [4, 5, 4, 5],

    _rightIconState: 'showState', // 'showDelete' | 'hoverDelete' | 'activeDelete'

    _fileName: '未知文件.xxx',
    _uploadState: 'waiting',

    // 私有
    // 二分法 (非最优算法) 得到应该显示的文件名 (避免过长)
    _getShowFileName: function (fileFont, fileName, limitWidth) {
        var self        = this,
            source      = self._source,
            textSize    = Default.getTextSize(fileFont, fileName),
            suffix      = source.getSuffix(),
            suffixSize  = Default.getTextSize(fileFont, suffix),
            realWidth   = limitWidth - suffixSize.width,
            showFileName;

        if (realWidth < 0) {
            showFileName = suffix;
        } else if (textSize.width < limitWidth) {
            showFileName = fileName;
        } else {
            if (textSize.width > 2 * realWidth) {
                for (var i = 1; i < fileName.length; i++) {
                    showFileName = fileName.slice(0, i - 1);
                    var element = fileName.slice(0, i),
                        size = Default.getTextSize(fileFont, element);
                    if (size.width > realWidth) {
                        break;
                    }
                }
            } else {
                for (var i = fileName.length - 1; i > 0; i--) {
                    showFileName = fileName.slice(0, i);
                    var size = Default.getTextSize(fileFont, showFileName);
                    if (size.width < realWidth) {
                        break;
                    }
                }
            }
            showFileName += suffix;
        }

        return showFileName;
    },
    // 交互
    getInteractorClasses: function () {
        return [ui.UploaderFileDataInteractor];
    },

    getCurrentStateIconDrawable: function () {
        var self                = this,
            source              = self._source,
            uploadState         = self.getUploadState(),
            trueIconDrawable    = source.getTrueIconDrawable(),
            falseIconDrawable   = source.getFalseIconDrawable();

        return typeof (uploadState) === 'string' ? undefined : uploadState ? trueIconDrawable : falseIconDrawable;
    },

    // 刷新
    validateImpl: function (x, y, width, height) {
        // 决定 text 的相关属性
        var self            = this,
            source          = self._source,
            fileName        = self.getFile().name,
            textFont        = self.getTextFont(),
            iconTextGap     = self.getIconTextGap(),
            iconWidth       = self.getIconWidth(),
            rightIconWidth  = source.getRightIconWidth(),
            limitWidth      = width - rightIconWidth - iconWidth - iconTextGap * 2,
            showFileName    = self._getShowFileName(textFont, fileName, limitWidth);

        self.__text = showFileName;
            
        ui.UploaderFileData.superClass.validateImpl.call(self, x, y, width, height);

        var g                   = self.getRootContext(),
            rightIconHeight     = source.getRightIconHeight(),

            deleteIconDrawable  = source.getDeleteIconDrawable(),
            
            currentStateIconDrawable = self.getCurrentStateIconDrawable(),

            rightIconState      = self.getRightIconState(),

            paddingRight        = self.getPaddingLeft(),
            borderRight         = self.getBorderLeft(),            
            paddingTop          = self.getPaddingTop(),
            borderTop           = self.getBorderTop(),

            rightIconRect = self._rightIconRect = {
                x: x + width - rightIconWidth - paddingRight - borderRight,
                y: y + (height - rightIconHeight) / 2 - paddingTop - borderTop,
                width: rightIconWidth,
                height: rightIconHeight
            };

        g.beginPath();

        if (rightIconState === 'showState') {
            currentStateIconDrawable && currentStateIconDrawable.draw(rightIconRect.x + x, rightIconRect.y + y, rightIconRect.width, rightIconRect.height, null, self);
        } else if (rightIconState === 'showDelete') {
            deleteIconDrawable.draw(rightIconRect.x + x, rightIconRect.y + y, rightIconRect.width, rightIconRect.height, null, self);
        } else if (rightIconState === 'hoverDelete') {
            var hoverDeleteIconDrawable = source.getHoverDeleteIconDrawable() ? source.getHoverDeleteIconDrawable() : deleteIconDrawable;
            hoverDeleteIconDrawable.draw(rightIconRect.x + x, rightIconRect.y + y, rightIconRect.width, rightIconRect.height, null, self);
        } else if (rightIconState === 'activeDelete') {
            var activeDeleteIconDrawable = source.getActiveDeleteIconDrawable() ? source.getActiveDeleteIconDrawable() : deleteIconDrawable;
            activeDeleteIconDrawable.draw(rightIconRect.x + x, rightIconRect.y + y, rightIconRect.width, rightIconRect.height, null, self);
        }
    },
    // 序列化
    getSerializableProperties: function() {
        return {};
    }
});
