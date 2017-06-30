var AjaxUpload = require('./AjaxUploader');
var IframeUpload= require('./IframeUploader');

function empty() {
}
/**
 * 上传组件
 * @author phy <yao.qianfeng@ucsmy.com>
 * 示例
 *
 *      @example
 *      var options= {
 *          action: '/upload.do',
 *          data: { a: 1, b: 2 },
 *          headers: {
 *              Authorization: 'xxxxxxx',
 *           },
 *          multiple: true,
 *          beforeUpload:function(file) {
 *              console.log('beforeUpload', file.name);
 *          },
 *          onStart:function(file) {
 *              console.log('onStart', file.name);
 *          },
 *          onSuccess:function(file) {
 *              console.log('onSuccess', file);
 *          },
 *          onProgress:function(step, file) {
 *              console.log('onProgress', Math.round(step.percent), file.name);
 *          },
 *          onError:function(err) {
 *              console.log('onError', err);
 *          },
 *      };
 *      <Upload {...options} ref="inner"><a>开始上传</a></Upload>
 *
 */
var Upload = React.createClass({
    propTypes: {
        component: React.PropTypes.string,
        style: React.PropTypes.object,
        prefixCls: React.PropTypes.string,
        action: React.PropTypes.string,
        name: React.PropTypes.string,
        multipart: React.PropTypes.bool,
        onError: React.PropTypes.func,
        onSuccess: React.PropTypes.func,
        onProgress: React.PropTypes.func,
        onStart: React.PropTypes.func,
        data: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.func,
        ]),
        headers: React.PropTypes.object,
        accept: React.PropTypes.string,
        multiple: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        beforeUpload: React.PropTypes.func,
        customRequest: React.PropTypes.func,
        onReady: React.PropTypes.func,
        withCredentials: React.PropTypes.bool,
        supportServerRender: React.PropTypes.bool,
    },

    getDefaultProps:function() {
        return {
            component: 'span',
            prefixCls: 'ucs-upload',
            data: {},
            headers: {},
            name: 'file',
            multipart: false,
            onReady: empty,
            onStart: empty,
            onError: empty,
            onSuccess: empty,
            supportServerRender: false,
            multiple: false,
            beforeUpload: null,
            customRequest: null,
            withCredentials: false,
        };
    },

    getInitialState:function() {
        return {
            Component: null,
        };
    },

    componentDidMount:function() {
        if (this.props.supportServerRender) {
            /* eslint react/no-did-mount-set-state:0 */
            this.setState({
                Component: this.getComponent(),
            }, this.props.onReady);
        }
    },
    getComponent:function() {
        return typeof FormData !== 'undefined' ? AjaxUpload : IframeUpload;
    },
    /**
     * 终止当前任务处理进度
     * @param file 上传的文件
     */
    abort:function(file) {
        this.refs.inner.abort(file);
    },

    render:function() {
        if (this.props.supportServerRender) {
            var Component  = this.state.Component;
            if (Component) {
                return <Component {...this.props} ref="inner"/>;
            }
            return null;
        }
        var Component = this.getComponent();
        return <Component {...this.props} ref="inner"/>;
    },
});

module.exports =Upload;
