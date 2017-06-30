var classNames = require('classnames');
var defaultRequest = require('./request');
var getUid = require('./uid');

var AjaxUploader = React.createClass({
    propTypes: {
        component: React.PropTypes.string,
        style: React.PropTypes.object,
        prefixCls: React.PropTypes.string,
        className: React.PropTypes.string,
        multiple: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        accept: React.PropTypes.string,
        children: React.PropTypes.any,
        onStart: React.PropTypes.func,
        data: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.func,
        ]),
        headers: React.PropTypes.object,
        beforeUpload: React.PropTypes.func,
        customRequest: React.PropTypes.func,
        onProgress: React.PropTypes.func,
        withCredentials: React.PropTypes.bool,
    },

    getInitialState: function () {
        this.reqs = {};
        return {
            uid: getUid(),
        };
    },

    componentWillUnmount: function () {
        this.abort();
    },

    /**
     * 事件改变处理函数
     * @param e
     */
    onChange: function (e) {
        var files = e.target.files;
        this.uploadFiles(files);
        this.reset();
    },

    /**
     * 点击事件处理函数
     */
    onClick: function () {
        var el = this.refs.file;
        if (!el) {
            return;
        }
        el.click();
    },

    /**
     * 按下按键事件处理程序
     * @param e
     */
    onKeyDown: function (e) {
        if (e.key === 'Enter') {
            this.onClick();
        }
    },

    /**
     * 拖动文件事件处理程序
     * @param e
     */
    onFileDrop: function (e) {
        if (e.type === 'dragover') {
            e.preventDefault();
            return;
        }

        var files = e.dataTransfer.files;
        this.uploadFiles(files);

        e.preventDefault();
    },

    /**
     * 上传文件
     * @param files
     */
    uploadFiles: function (files) {
        var postFiles = Array.prototype.slice.call(files);
        var len = postFiles.length;
        for (var i = 0; i < len; i++) {
            var file = postFiles[i];
            file.uid = getUid();
            this.upload(file, postFiles);
        }
    },

    /**
     * 上传数据处理方法
     */
    upload: function (file, fileList) {
        var _this_=this;
        var props = this.props;
        if (!props.beforeUpload) {
            // always async in case use react state to keep fileList
            return setTimeout(function () {
                _this_.post(file);
            }, 0);
        }

        var before = props.beforeUpload(file, fileList);
        if (before && before.then) {
            try{
                before.then(function (processedFile) {
                    var processedFileType = Object.prototype.toString.call(processedFile);
                    if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
                        _this_.post(processedFile);
                    } else {
                        _this_.post(file);
                    }
                });
            }
            catch(e){
                console && console.log(e); // eslint-disable-line
            }
        } else if (before !== false) {
            setTimeout(function () {
                _this_.post(file);
            }, 0);
        }
    },

    /**
     * post方式提交处理数据
     * @param file
     */
    post: function (file) {
        if (!this.isMounted()) {
            return;
        }
        var props = this.props;
        var data = props.data;
        var onStart = props.onStart;
        var onProgress = props.onProgress;
        if (typeof data === 'function') {
            data = data(file);
        }
        var uid = file.uid;
        var request = props.customRequest || defaultRequest;
        this.reqs[uid] = request({
            action: props.action,
            filename: props.name,
            file: file,
            data: data,
            headers: props.headers,
            withCredentials: props.withCredentials,
            onProgress: onProgress ? function (e) {
                onProgress(e, file);
            } : null,
            onSuccess: function (ret) {
                delete this.reqs[uid];
                props.onSuccess(ret, file);
            }.bind(this),
            onError: function (err, ret) {
                delete this.reqs[uid];
                props.onError(err, ret, file);
            }.bind(this),
        });
        onStart(file);
    },
    /**
     * 重置提交状态
     */
    reset: function () {
        this.setState({
            uid: getUid(),
        });
    },

    /**
     * 终止当前任务状态
     * @param file
     */
    abort: function (file) {
        var reqs = this.reqs;
        if (file) {
            var uid = file;
            if (file && file.uid) {
                uid = file.uid;
            }
            if (reqs[uid]) {
                reqs[uid].abort();
                delete reqs[uid];
            }
        } else {
            Object.keys(reqs).forEach(function (uid) {
                if (reqs[uid]) {
                    reqs[uid].abort();
                }

                delete reqs[uid];
            });
        }
    },

    render: function () {
        var Tag = this.props.component;
        var prefixCls = this.props.prefixCls;
        var className = this.props.className;
        var disabled = this.props.disabled;
        var style = this.props.style;
        var multiple = this.props.multiple;
        var accept = this.props.accept;
        var children = this.props.children;

        var config = {};
        config[prefixCls] = true;
        config[prefixCls + '-disabled']=disabled;
        config[className]=className;

        var cls = classNames(config);
        var events = disabled ? {} : {
            onClick: this.onClick,
            onKeyDown: this.onKeyDown,
            onDrop: this.onFileDrop,
            onDragOver: this.onFileDrop,
            tabIndex: '0'
        };
        return (
            <Tag
                {...events}
                className={cls}
                role="button"
                style={style}
            >
                <input
                    type="file"
                    ref="file"
                    key={this.state.uid}
                    style={{display: 'none'}}
                    accept={accept}
                    multiple={multiple}
                    onChange={this.onChange}
                />
                {children}
            </Tag>
        );
    },
});

module.exports = AjaxUploader;
