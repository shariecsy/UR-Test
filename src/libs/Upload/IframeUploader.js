var classNames = require('classnames');
var getUid = require('./uid');

var IFRAME_STYLE = {
    position: 'absolute',
    top: 0,
    opacity: 0,
    filter: 'alpha(opacity=0)',
    left: 0,
    zIndex: 9999,
};
// diferent from AjaxUpload, can only upload on at one time, serial seriously
var IframeUploader = React.createClass({
    propTypes: {
        component: React.PropTypes.string,
        style: React.PropTypes.object,
        disabled: React.PropTypes.bool,
        prefixCls: React.PropTypes.string,
        className: React.PropTypes.string,
        accept: React.PropTypes.string,
        onStart: React.PropTypes.func,
        multiple: React.PropTypes.bool,
        children: React.PropTypes.any,
        data: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.func,
        ]),
        action: React.PropTypes.string,
        name: React.PropTypes.string,
    },

    getInitialState: function () {
        this.file = {};
        return {
            uploading: false,
        };
    },

    componentDidMount: function () {
        this.updateIframeWH();
        this.initIframe();
    },

    componentDidUpdate: function () {
        this.updateIframeWH();
    },

    onLoad: function () {
        if (!this.state.uploading) {
            return;
        }
        var file = this.file;
        var props = this.props;
        var response;
        try {
            var doc = this.getIframeDocument();
            var script = doc.getElementsByTagName('script')[0];
            if (script && script.parentNode === doc.body) {
                doc.body.removeChild(script);
            }
            response = doc.body.innerHTML;
            props.onSuccess(response, file);
        } catch (err) {
            console.error('cross domain error for Upload. Maybe server should return document.domain script. see Note from https://github.com/react-component/upload');
            response = 'cross-domain';
            props.onError(err, null, file);
        }
        this.endUpload();
    },
    /**
     * 事件改变处理函数
     * @returns {object}
     */
    onChange: function () {
        var target = this.getFormInputNode();
        // ie8/9 don't support FileList Object
        // http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files
        var file = this.file = {
            uid: getUid(),
            name: target.value,
        };
        this.startUpload();
        var props = this.props;
        if (!props.beforeUpload) {
            return this.post(file);
        }
        var before = props.beforeUpload(file);
        if (before && before.then) {
            before.then(function() {
                this.post(file);
            }, function() {
                this.endUpload();
            });
        } else if (before !== false) {
            this.post(file);
        } else {
            this.endUpload();
        }
    },
    /**
     * 获取iframe节点
     * @returns {string|string|null|*}
     */
    getIframeNode: function () {
        return this.refs.iframe;
    },

    /**
     * 获取iframe节点的DOM
     * @returns {Document}
     */
    getIframeDocument: function () {
        return this.getIframeNode().contentDocument;
    },

    /**
     * 获取form节点
     * @returns {Element}
     */
    getFormNode: function () {
        return this.getIframeDocument().getElementById('form');
    },

    /**
     * 获取form表单节点的input元素
     * @returns {Element}
     */
    getFormInputNode: function () {
        return this.getIframeDocument().getElementById('input');
    },

    /**
     * 获取form表单的数据节点
     * @returns {Element}
     */
    getFormDataNode: function () {
        return this.getIframeDocument().getElementById('data');
    },

    /**
     * 获取多文件
     * @param file 文件
     * @returns {[file]|file}
     */
    getFileForMultiple:function(file) {
        return this.props.multiple ? [file] : file;
    },

    /**
     * 获取iframe的html
     * @param domain 域名
     * @returns {string}
     */
    getIframeHTML: function (domain) {
        var domainScript = '';
        var domainInput = '';
        if (domain) {
            var script = 'script';
            domainScript = '<' + script + '>document.domain="' + domain + '";</' + script + '>';
            domainInput = '<input name="_documentDomain" value="' + domain + '" />';
        }
        return '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
            '<style>body,html {padding:0;margin:0;border:0;overflow:hidden;}</style>\"' + domainScript + '\"</head>' +
            '<body>' +
            '<form method="post" encType="multipart/form-data" action="' + this.props.action + '" id="form" style="display:block;height:9999px;position:relative;overflow:hidden;">' +
            '<input id="input" type="file" name="' + this.props.name + '" style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>' + domainInput + '<span id="data"></span>' +
            '</form>' +
            '</body>' +
            '</html>';
    },

    /**
     * 初始化iframe的src源
     */
    initIframeSrc: function () {
        if (this.domain) {
            this.getIframeNode().src = "javascript:void((function(){ var d = document;d.open();d.domain='" + this.domain + "';d.write('');d.close();})())";
        }
    },

    /**
     * 初始化iframe
     */
    initIframe: function () {
        var iframeNode = this.getIframeNode();
        var win = iframeNode.contentWindow;
        var doc;
        this.domain = this.domain || '';
        this.initIframeSrc();
        try {
            doc = win.document;
        } catch (e) {
            this.domain = document.domain;
            this.initIframeSrc();
            win = iframeNode.contentWindow;
            doc = win.document;
        }
        doc.open('text/html', 'replace');
        doc.write(this.getIframeHTML(this.domain));
        doc.close();
        this.getFormInputNode().onchange = this.onChange;
    },

    /**
     * 停止上传
     */
    endUpload: function () {
        if (this.state.uploading) {
            this.file = {};
            // hack avoid batch
            this.state.uploading = false;
            this.setState({
                uploading: false,
            });
            this.initIframe();
        }
    },

    /**
     * 开始上传
     */
    startUpload: function () {
        if (!this.state.uploading) {
            this.state.uploading = true;
            this.setState({
                uploading: true,
            });
        }
    },

    /**
     * 更新iframe的宽高度
     */
    updateIframeWH: function () {
        var rootNode = ReactDOM.findDOMNode(this);
        var iframeNode = this.getIframeNode();
        iframeNode.style.height = rootNode.offsetHeight+'px';
        iframeNode.style.width = rootNode.offsetWidth+'px';
    },

    /**
     * 终止当前任务
     * @param file
     */
    abort: function (file) {
        if (file) {
            var uid = file;
            if (file && file.uid) {
                uid = file.uid;
            }
            if (uid === this.file.uid) {
                this.endUpload();
            }
        } else {
            this.endUpload();
        }
    },

    /**
     * post方式提交数据
     * @param file
     */
    post: function (file) {
        var formNode = this.getFormNode();
        var dataSpan = this.getFormDataNode();
        var data = this.props.data;
        var onStart = this.props.onStart;
        if (typeof data === 'function') {
            data = data(file);
        }
        var inputs = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                inputs.push('<input name="' + key + '" value="' + data[key] + '"/>');
            }
        }
        dataSpan.innerHTML = inputs.join('');
        formNode.submit();
        dataSpan.innerHTML = '';
        onStart(file);
    },

    render: function () {
        var Tag = this.props.component;
        var disabled = this.props.disabled;
        var className = this.props.className;
        var prefixCls = this.props.prefixCls;
        var children = this.props.children;
        var style = this.props.style;

        var iframeStyle = {
            IFRAME_STYLE:IFRAME_STYLE,
            display: this.state.uploading || disabled ? 'none' : '',
        };

        var config = {};
        config[prefixCls] = true;
        config[prefixCls + '-disabled'] = disabled;
        config[className] = className;
        var cls = classNames(config);

        return (
            <Tag
                className={cls}
                style={{position: 'relative', zIndex: 0, style:style}}
            >
                <iframe
                    ref="iframe"
                    onLoad={this.onLoad}
                    style={iframeStyle}
                />
                {children}
            </Tag>
        );
    },
});

module.exports = IframeUploader;
