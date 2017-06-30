/**
 * Tooltip组件
 * @param container 插入的位置，默认是document.body
 * @param position 位置 top:上面; left:左边; right:右边; bottom: 下面;
 * @param fixed 是否固定，true 固定 false 随鼠标移动;
 * @param space 距离
 *
 * @constructs
 *
 * 示例:
 *
 *     @example
 *     <Tooltip title="确定删除" fixed = {false}>删除</Tooltip>
 *
 */
var Tooltip = React.createClass({
    _addEventListener:function(obj,ev,fn){
		obj.addEventListener ? obj.addEventListener(ev,fn,false) : obj.attachEvent("on" + ev,fn)
    },
    _removeEventListener: function (obj, ev, fn) {
        obj.removeEventListener ? obj.removeEventListener(ev, fn, false) : obj.detachEvent("on" + ev, fn)
    },
	getDefaultProps: function() {
		return {
			container: document.body,
			position: 'top',
			fixed: true,
			space: 5
		}
	},
	componentDidMount: function() {
		this.container = this.props.container || document.body;
		this.componentEl = ReactDOM.findDOMNode(this);
		this.tooltipEl = document.createElement('div');

		var tooltipArrowEl = document.createElement('div');
		tooltipArrowEl.className = 'ucs-tooltip-arrow';

		var tooltipContentEl = document.createElement('div');
		tooltipContentEl.className = 'ucs-tooltip-inner';
		tooltipContentEl.textContent = this.props.title;

		this.tooltipEl.appendChild(tooltipArrowEl);
		this.tooltipEl.appendChild(tooltipContentEl);
		this.tooltipEl.className = 'ucs-tooltip ' + this.props.position;
		this.container.appendChild(this.tooltipEl);
		this.resetTooltip();
		var _componentEl =  this.componentEl;
		this._addEventListener(_componentEl, this.props.fixed ? 'mouseenter' : 'mousemove', this.handleMouseMove);
		this._addEventListener(_componentEl, 'mouseleave', this.handleMouseOut);
	},

	componentDidUpdate: function() {
		this.tooltipEl.className = 'ucs-tooltip ' + this.props.position;
		this.tooltipEl.childNodes[1].textContent = this.props.title;
	},

	componentWillUnmount: function() {
    	var _componentEl = this.componentEl;
		this._removeEventListener(_componentEl, this.props.fixed ? 'mouseenter' : 'mousemove', this.handleMouseMove);
		this._removeEventListener(_componentEl, 'mouseleave', this.handleMouseOut);
		this.container.removeChild(this.tooltipEl);
	},

	resetTooltip: function() {
		this.tooltipEl.style.transition = 'opacity 0.4s';
		this.tooltipEl.style.left = '-500px';
		this.tooltipEl.style.top = '-500px';
		this.tooltipEl.style.opacity = 0;
	},

	handleMouseMove: function(e) {
		if(this.props.title === '') {
			return;
		}

		var tooltipPosition = this.getTooltipPosition(e);
		var tooltipOffset = this.getTooltipOffset();

		this.tooltipEl.style.left = tooltipPosition.x + tooltipOffset.x + 'px';
		this.tooltipEl.style.top = tooltipPosition.y + tooltipOffset.y + 'px';
		this.tooltipEl.style.opacity = 1;
	},

	handleMouseOut: function() {
		this.resetTooltip();
	},
	//定位到标签的位置
	getTooltipPosition: function(e) {
		var pointX;
		var pointY;
		var bodyRect = document.body.getBoundingClientRect();
		var containerRect = this.container.getBoundingClientRect();
		var containerOffsetX = containerRect.left - bodyRect.left;
		var containerOffsetY = containerRect.top - bodyRect.top;
		if(this.props.fixed) {
			var componentRect = this.componentEl.getBoundingClientRect();
			var componentOffsetX = componentRect.left - containerOffsetX;
			var componentOffsetY = componentRect.top - containerOffsetY;
			var componentWidth = this.componentEl.offsetWidth;
			var componentHeight = this.componentEl.offsetHeight;
			var cOffsetX = 0;
			var cOffsetY = 0;
			switch(this.props.position) {
				case 'top':
					cOffsetX = componentWidth / 2;
					cOffsetY = 0;
					break;
				case 'right':
					cOffsetX = componentWidth;
					cOffsetY = componentHeight / 2;
					break;
				case 'bottom':
					cOffsetX = componentWidth / 2;
					cOffsetY = componentHeight;
					break;
				case 'left':
					cOffsetX = 0;
					cOffsetY = componentHeight / 2;
					break;
			}
			pointX = componentOffsetX + cOffsetX + (window.scrollX || window.pageXOffset);
			pointY = componentOffsetY + cOffsetY + (window.scrollY || window.pageYOffset);
		} else {
			var clientX = e.clientX;
			var clientY = e.clientY;
			pointX = clientX - containerOffsetX + (window.scrollX || window.pageXOffset);
			pointY = clientY - containerOffsetY + (window.scrollY || window.pageYOffset);
		}
		return {
			x: pointX,
			y: pointY
		};
	},
	//获取偏移量
	getTooltipOffset: function() {
		var tooltipW = this.tooltipEl.offsetWidth;
		var tooltipH = this.tooltipEl.offsetHeight;
		var offsetX = 0;
		var offsetY = 0;
		switch(this.props.position) {
			case 'top':
				offsetX = -(tooltipW / 2);
				offsetY = -(tooltipH + Number(this.props.space));
				break;
			case 'right':
				offsetX = Number(this.props.space);
				offsetY = -(tooltipH / 2);
				break;
			case 'bottom':
				offsetX = -(tooltipW / 2);
				offsetY = Number(this.props.space);
				break;
			case 'left':
				offsetX = -(tooltipW + Number(this.props.space));
				offsetY = -(tooltipH / 2);
				break;
		}
		return {
			x: offsetX,
			y: offsetY
		};
	},
	render: function() {
		return (
		    <div>{this.props.children}</div>
        )
	}
});

module.exports = Tooltip;