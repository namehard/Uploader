/**
 * 自定义组件
 */
ui.Uploader = function() {
    var self        = this,
        inputFile   = self.inputFile = document.createElement('input');

    inputFile.type = 'file';
    inputFile.multiple = "multiple";

    ui.Uploader.superClass.constructor.call(this);
    
    var fileList        = new ui.VBoxLayout(),
        button          = self.createButton();

    inputFile.addEventListener('change', function () {
        self._onChangeFunc();
        inputFile.value = '';
    });

    button.on('click', function () {
        inputFile.click();
    }, undefined, undefined, undefined, true);

    self._button = button;
    self._fileList = fileList;

    self.addView(button);
    self.addView(fileList, {
        width: 'match_parent',
        height: 'match_parent'
    });

};

Default.def('ht.ui.Uploader', ui.VBoxLayout, {
    ms_ac: [
        'fileFilterFunc', 'multiple', 'accept', 'suffix', 'limit', 'button'
    ],

    ui_ac: [
        'drawable:deleteIcon', 'drawable:activeDeleteIcon', 'drawable:hoverDeleteIcon',
        'drawable:trueIcon', 'drawable:falseIcon',
        'rightIconHeight', 'rightIconWidth', 'fileRowBackground', 'fileHoverRowBackground', 'fileTextColor', 'fileHoverTextColor', 'fileTextFont', 'fileRowHeight'
    ],
    
    __padding: [10, 20, 10, 20],
    __minSize: {
        width: 300,
        height: 100
    },


    __deleteIcon: 'Uploader_delete',
    __hoverDeleteIcon: 'Uploader_hoverDelete',
    __activeDeleteIcon: 'Uploader_activeDelete',

    __trueIcon: 'Uploader_true',
    __falseIcon: 'Uploader_false',

    __rightIconWidth: 16,
    __rightIconHeight: 16,

    _multiple: true,
    _accept: 'all',
    _suffix: '...',
    _limit: 20,

    __fileHoverRowBackground: '#F5F8FA',
    __fileRowBackground: '#FFF',
    __fileTextColor: '#4B5B6F',
    __fileHoverTextColor: '#31A5FF',
    __fileTextFont: '18px arial, sans-serif',
    __fileRowHeight: 33,

    _fileFilterFunc: function (file) {
        var isFilter = true;
        return isFilter;
    },

    // 添加 FileData
    _addFileData: function (fileData) {
        var self = this,
            fileList = self._fileList,
            layoutParams = fileData.getLayoutParams() ? fileData.getLayoutParams() : {};

        layoutParams.width = 'match_parent';
        var hoverBackground = self.getFileHoverRowBackground(),
            activeBackground = hoverBackground,
            background = self.getFileRowBackground(),
            textFont = self.getFileTextFont(),
            textColor = self.getFileTextColor(),
            hoverTextColor = self.getFileHoverTextColor(),
            activeTextColor = hoverTextColor,
            height = self.getFileRowHeight();

        fileData.setHoverBackground(hoverBackground);
        fileData.setActiveBackground(activeBackground);
        fileData.setBackground(background);
        fileData.setTextFont(textFont);
        fileData.setTextColor(textColor);
        fileData.setHoverTextColor(hoverTextColor);
        fileData.setActiveTextColor(activeTextColor);
        layoutParams.height = height;

        fileList.addView(fileData, layoutParams);

        self.fireViewEvent({
            kind: 'fileDataAdded',
            data: fileData,
            source: self
        });
    },

    _getInputFilesList: function () {
        var self = this,
            uploaderFiles = self.inputFile.files,
            list = new ht.List();

        for (var i = 0; i < uploaderFiles.length; i++) {
            var element = uploaderFiles[i];

            list.add(element);
        }

        return list;
    },

    _getInputFilesListPath: function () {
        var self = this,
            value = self.inputFile.value,
            path;

        path = self._getPath(value);

        return path;
    },

    _onChangeFunc: function () {
        var self = this,
            inputFilesList = self._getInputFilesList(),
            path = self._getInputFilesListPath(),
            fileFilterFunc = self.getFileFilterFunc(),
            fileDatas = self.getFileDatas(),
            limit = self.getLimit(),
            fileList = self._fileList;

        inputFilesList.each(function (data) {
            var fullName = path + data.name,
                has;

            data.fullName = fullName;

            if (fileFilterFunc(data)) {

                if (limit) {
                    var fileListSize = fileList.getChildren().size();
                    if (fileListSize >= limit) {
                        var diffSize = fileListSize - limit,
                            removeList = new ht.List();

                        fileList.getChildren().each(function (exist, ind) {
                            if (ind < diffSize) {
                                removeList.add(exist);
                            }
                        });

                        removeList.each(function (removeData) {
                            self.removeFileData(removeData);
                        });

                        var fileData = new ui.UploaderFileData(self);

                        self.fireViewEvent({
                            kind: 'fileDataCreating',
                            data: fileData,
                            source: self
                        });

                        fileData.setFile(data);

                        for (var i = 0; i < fileDatas.length; i++) {
                            var file = fileDatas.get(i).getFile();
                            if (fullName === file.fullName) {
                                has = true;
                                break;
                            }
                        }

                        if (!has) {
                            self.removeFileData(fileList.getChildren().get(0));
                            self._addFileData(fileData);
                        }

                    } else {
                        var fileData = new ui.UploaderFileData(self);

                        self.fireViewEvent({
                            kind: 'fileDataCreating',
                            data: fileData,
                            source: self
                        });

                        fileData.setFile(data);

                        for (var i = 0; i < fileDatas.length; i++) {
                            var file = fileDatas.get(i).getFile();
                            if (fullName === file.fullName) {
                                has = true;
                                break;
                            }
                        }

                        !has && self._addFileData(fileData);
                    }

                } else {
                    var fileData = new ui.UploaderFileData(self);

                    self.fireViewEvent({
                        kind: 'fileDataCreating',
                        data: fileData,
                        source: self
                    });

                    fileData.setFile(data);

                    for (var i = 0; i < fileDatas.length; i++) {
                        var file = fileDatas.get(i).getFile();
                        if (fullName === file.fullName) {
                            has = true;
                            break;
                        }
                    }

                    !has && self._addFileData(fileData);
                }
            }
        });
    },

    /**
     * @description 从路径全名中取路径
     * @param {String} fullName 路径全名
     */
    _getPath: function (fullName) {
        var local = fullName.lastIndexOf('\\'),
            path = fullName.slice(0, local + 1);

        return path;
    },

    // 删除 fileData
    removeFileData: function (fileData) {
        var self = this,
            fileList = self._fileList;

        fileList.removeView(fileData);

        self.fireViewEvent({
            kind: 'fileDataRemoved',
            data: fileData,
            source: self
        });
    },

    createButton: function () {
        var button = new ht.ui.Button();
        button.__background = '#48A2E9';
        button.__textColor = '#F7FFFF';
        button.__text = '点击上传';
        return button;
    },

    setButton: function (newButton) {
        var self = this,
            button = self._button;
        self.removeView(button);
        self._button = newButton;
        self.addView(newButton, undefined, 0);
        self.fp('button', button, newButton);
        newButton.on('click', function () {
            self.inputFile.click();
        }, undefined, undefined, undefined, true);
    },

    setFileRowBackground: function (background) {
        var self = this;
        var old = self.__fileRowBackground;
        self.__fileRowBackground = background;
        self._fileList.getChildren().each(function(fileData) {
            fileData.setBackground(background);
        })
        self.fp('fileRowBackground', old, background);
        
    },
    setFileHoverRowBackground: function (background) {
        var self = this;
        var old = self.__fileHoverRowBackground;
        self.__fileHoverRowBackground = background;
        self._fileList.getChildren().each(function (fileData) {
            fileData.setHoverBackground(background);
            fileData.setActiveBackground(background);
        })
        self.fp('fileHoverRowBackground', old, background);
    },
    setFileTextFont: function (textFont) {
        var self = this;
        var old = self.__fileTextFont;
        self.__fileTextFont = textFont;
        self._fileList.getChildren().each(function(fileData) {
            fileData.setTextFont(textFont);
        })
        self.fp('fileTextFont', old, textFont);

    },
    setFileTextColor: function (textColor) {
        var self = this;
        var old = self.__fileTextColor;
        self.__fileTextColor = textColor;
        self._fileList.getChildren().each(function(fileData) {
            fileData.setTextColor(textColor);
        })
        self.fp('fileTextColor', old, textColor);
    },

    setFileHoverTextColor: function (textColor) {
        var self = this;
        var old = self.__fileHoverTextColor;
        self.__fileHoverTextColor = textColor;
        self._fileList.getChildren().each(function(fileData) {
            fileData.setHoverTextColor(textColor);
            fileData.setActiveTextColor(textColor);
        })
        self.fp('fileHoverTextColor', old, textColor);
    },

    setFileRowHeight: function (height) {
        var self = this;
        var old = self.__fileRowHeight;
        self.__fileRowHeight = height;
        self._fileList.getChildren().each(function(fileData) {
            fileData.setLayoutParams('height', height);
        })
        self.fp('fileRowHeight', old, height);
    },

    setAccept: function (type) {
        var self = this,
            inputFile = self.inputFile;

        if (type && type != 'all') {
            inputFile.accept = type;
        } else {
            type = 'all';
            inputFile.accept = undefined;
        }

        self.setPropertyValue("accept", type);
    },

    setLimit: function (limit) {
        var self = this,
            fileList = self._fileList,
            fileListSize = fileList.getChildren().size();

        if (fileListSize > limit) {
            var diffSize = fileListSize - limit,
                removeList = new ht.List();
            fileList.getChildren().each(function (existFile, ind) {
                if (ind < diffSize) {
                    removeList.add(existFile);
                }
            });
            removeList.each(function (data) {
                self.removeFileData(data);
            });
        }
        self.setPropertyValue("limit", limit);
    },
    
    // 是否支持多文件上传
    setMultiple: function (multiple) {
        var self = this,
            inputFile = self.inputFile;

        if (multiple) {
            multiple = true;
            inputFile.multiple = 'multiple';
        } else {
            multiple = false;
            inputFile.multiple = undefined;
        }

        self.setPropertyValue("multiple", multiple);
    },

    getFileDatas: function () {
        var fileList = this._fileList,
            children = fileList.getChildren(),
            fileDatas = children.toList();

        return fileDatas;
    },

    handleFileDataDelete:function (fileData) {
        var self = this;

        self.removeFileData(fileData);
    },

    /**
     * @deprecated 获取上传文件集合
     * @return {ht.List}
     */
    getFiles: function () {
        var self        = this,
            fileDatas   = self.getFileDatas(),
            list        = new ht.List();
        
        fileDatas.each(function (data) {
             list.add(data.getFile());
        });

        return list;
    },
    /**
     * @description 布局颠倒
     */
    reverse: function () {
        var self     = this,
            children = self.getChildren();
        
        children.reverse();
        self.iv();
    },

    getSerializableProperties: function () {
        var self = this,
            parentProperties = ui.Uploader.superClass.getSerializableProperties.call(self);

        delete parentProperties.children;

        return Default.addMethod(parentProperties, {
            fileFilterFunc: true,
            multiple: true,
            accept: true,
            suffix: true,
            button: true,

            deleteIcon: true,
            activeDeleteIcon: true, 
            hoverDeleteIcon: true,
            trueIcon: true, 
            falseIcon: true,
            rightIconHeight: true,
            rightIconWidth: true,
            fileRowBackground: true,
            fileHoverRowBackground: true,
            fileTextColor: true,
            fileHoverTextColor: true,
            fileTextFont: true,
            fileRowHeight: true
        });
    },

    /**
     * @description 清除所有上传数据
     */
    clearFileDatas: function() {
        var self = this;
        self.getFileDatas().each(function (fileData) {
            self.removeFileData(fileData);
        })
    }
});