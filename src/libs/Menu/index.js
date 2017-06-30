var setClass = require('classnames');

/**
 * @author DuHuiling
 *
 * 导航菜单 Mene : 为页面和功能提供导航的菜单列表。
 *
 * @param [mode] {"horizontal"|"inline"|"vertical"}
 * 	菜单类型，现在支持水平、内嵌和垂直模式三种
 *
 * @param [disabled]
 * 是否禁用
 *
 * @param [title] {string|ReactNode}
 * 分组标题
 *
 * @param [visible] {boolean}
 * 子菜单初始是否可见
 *
 * 示例：
 *
 *  需要引入：
 *
 *     @example
 *		var Menu = UcsmyUI.Menu;
 *		var MenuItem = Menu.MenuItem;
 *		var SubMenu = Menu.SubMenu;
 *
 * 水平模式：
 *
 *		<Menu id="abc" className = 'menu-test'>
 *		    <MenuItem className = 'menu-active'>
 *		        <a href="">首页</a>
 *			</MenuItem>
 *			<MenuItem disabled>禁用样式</MenuItem>
 *			<MenuItem>
 *				<a href="">链接</a>
 *			</MenuItem>
 *			<SubMenu className="sub-classname" title = { <a href="http://www.baidu.com">可点击title</a> } visible = {true}>
 *				<MenuItem><a href="">二级目录1</a></MenuItem>
 *				<MenuItem>二级目录2</MenuItem>
 *			</SubMenu>
 *		</Menu>
 *
 * 内嵌模式：
 *
 * 		<Menu mode = 'inline'>
 * 		    <MenuItem className = 'menu-active'>
 * 		        <a href="">首页</a>
 *			</MenuItem>
 *			<MenuItem disabled>禁用样式</MenuItem>
 * 			<MenuItem>
 * 				<a href="">链接</a>
 * 			</MenuItem>
 * 			<SubMenu title = '点击title显示子导航' visible = {false}>
 * 				<MenuItem>二级目录1</MenuItem>
 *				<MenuItem>二级目录2</MenuItem>
 * 			</SubMenu>
 * 		</Menu>
 *
 * 垂直模式：
 *
 * 		<Menu mode = 'vertical'>
 * 	    	<MenuItem>首页</MenuItem>
 * 	    	<MenuItem disabled>禁用样式</MenuItem>
 * 	    	<MenuItem>
 * 	        	<a href="">链接</a>
 * 	        </MenuItem>
 * 	        <SubMenu title = '鼠标移上title显示子导航'>
 * 	            <MenuItem>二级目录1</MenuItem>
 * 	            <MenuItem>二级目录2</MenuItem>
 * 			</SubMenu>
 * 		</Menu>
 */
var Menu = React.createClass({
    getDefaultProps: function () {
        return {
            mode: 'horizontal'
        }
    },
    componentDidMount: function () {
        var _children = this.props.children,
            len = _children.length;
    },
    render: function () {
        var self = this;
        var menuClass = setClass('ucs-menu', 'menu-' + this.props.mode, this.props.className);
        return (
            <div className={menuClass} id={this.props.id}>
                <ul>
                    {
                        React.Children.map(self.props.children, function (child) {
                            return React.cloneElement(child, {mode: self.props.mode});
                        })
                    }
                </ul>
            </div>
        )
    }
});

Menu.MenuItem = React.createClass({
    render: function () {
        var itemClass = setClass(this.props.className, {'menu-disabled': this.props.disabled});
        return (
            <li className={itemClass} className={itemClass}>{ this.props.children }</li>
        )
    }
});

Menu.SubMenu = React.createClass({
    getDefaultProps: function () {
        return {
            visible: false
        }
    },
    getInitialState: function () {
        return {
            subVisible: this.props.visible,
            subClass: this.props.className
        }
    },
    componentDidMount: function () {
        var self = this;

        var node = ReactDOM.findDOMNode(this);
        if (this.props.mode == 'horizontal' || this.props.mode == 'vertical') {
            node.onmouseenter = function (e) {
                self.setState({
                    subVisible: true
                })
            };
            node.onmouseleave = function (e) {
                self.setState({
                    subVisible: false
                })
            };
        } else if (this.props.mode == 'inline') {
            node.onclick = function (e) {
                self.setState({
                    subVisible: !self.state.subVisible
                })
            }
        }

    },
    render: function () {
        var submenuClass = setClass(
            'sub-menu',
            'sub-menu-' + this.props.mode
        );
        var dropdown = setClass('ucs-dropdown', {'down': this.state.subVisible}, this.state.subClass);
        return (
            <li className={dropdown}>
                <div className="menu-title">{ this.props.title }</div>
                <ul className={ submenuClass }>
                    { this.props.children }
                </ul>
            </li>
        )
    }
});

module.exports = Menu;