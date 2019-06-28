/**
 * Uploader FileDataInteractor 交互器
 */
ui.UploaderFileDataInteractor = function (comp) {
    ui.UploaderFileDataInteractor.superClass.constructor.call(this, comp);
}

def(ui.UploaderFileDataInteractor, ht.ui.ButtonInteractor, {
    handle_mousedown: function (e) {
        var self = this;
        self.handle_touchstart(e);
    },
    handle_touchstart: function (e) {
        Default.preventDefault(e);
        var self = this,
            fileData = self.getComponent();

        if (!fileData.isDisabled() && fileData.hitTest(e)) {
            fileData.requestFocus();
            fileData.setState('active');
            self._touchstart = true;
            // Default.startDragging(self, e);
            // self.addToTouchScrollClearQuene(e);
        }
        if (!fileData.isDisabled() && Default.isLeftButton(e)) {
            var source = fileData._source,
                lp = fileData.lp(e);
            if (Default.containsPoint(fileData._rightIconRect, lp)) {
                self._deleteTouchstart = true;
                fileData.setRightIconState('activeDelete');
            }
        }
    },
    handle_mouseup: function (e) {
        var self = this;
        self.handle_touchend(e);
    },
    handle_touchend: function (e) {
        var self = this,
            fileData = self.getComponent(),
            source = fileData._source,
            lp = fileData.lp(e);

        if (self._touchstart) {
            if (Default.isTouchable) {
                fileData.setState('normal');
                fileData.setRightIconState('showState');
            }
            else {
                fileData.setState('hover');
                if (Default.containsPoint(fileData._rightIconRect, lp) && self._deleteTouchstart) {
                    fileData.setRightIconState('hoverDelete');
                    source.handleFileDataDelete(fileData);
                } else {
                    fileData.setRightIconState('showDelete');
                }
            }
            self._touchstart = null;
            self._deleteTouchstart = null;
        }
    },
    handle_mousemove: function (e) {
        var self = this,
            fileData = self.getComponent(),
            lp = fileData.lp(e);

        if (fileData.isDisabled()) return;

        if (fileData.hitTest(e)) {
            if (self._touchstart) {
                fileData.setState('active');
                if (self._deleteTouchstart && Default.containsPoint(fileData._rightIconRect, lp)) {
                    fileData.setRightIconState('activeDelete');
                } else if (Default.containsPoint(fileData._rightIconRect, lp)) {
                    fileData.setRightIconState('hoverDelete');
                } else {
                    fileData.setRightIconState('showDelete');
                }

            }
            else if (!Default.getInternal().getDragger()) {
                fileData.setState('hover');
                if (Default.containsPoint(fileData._rightIconRect, lp)) {
                    fileData.setRightIconState('hoverDelete');
                }else {
                    fileData.setRightIconState('showDelete');
                }
            }
        }
        else {
            fileData.setState('normal');
            fileData.setRightIconState('showState');
        }
    },
    handle_mouseleave: function (e) {
        var self = this,
            fileData = self.getComponent();

        if (fileData.isDisabled()) return;
        fileData.setState('normal');
        fileData.setRightIconState('showState');
        self._touchstart = null;
        self._deleteTouchstart = null;
    }
});
