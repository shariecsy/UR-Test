 /**
  *
  * 自动补全
  *
  * @param [className] class名
  *
  * @param [placeholder] 提示文字
  *
  * @param [value] 文本值
  *
  * @constructs
  * @author huangdebin
  * Autocomplete
  *
  * 示例:
  *
  *     @example
  *     <Autocomplete ref="autocomplete1" value="" onChange={this.handleChange} onSelect={this.handleSelect} classNames={classNames} placeholder="请输入" />
  */
import React from 'react';

var Autocomplete = React.createClass({
    getDefaultProps:function(){
        return {
            value: '',
            placeholder: '',
            classNames: {}
        }
    },
    getInitialState:function(){
        return {
            value: this.props.value,
            autocompleteItems: [],
            itemsActiveIndex:'-1'
        }
    },
     /**
      * 设置value
      * @param {string} value
      *
      * */
    setValue: function(value){
        this.setState({
            value: value
        });
    },
     /**
      * 获取值
      * @return {string}
      * */
    getValue: function(){
        return this.state.value;
    },
     /**
      * value改变时执行的事件
      * @param event
      *
      * */
    handleInputChange:function(event) {
        var rootThis = this;
        var value = event.target.value;
        if (!value) {
            this.clearAutocomplete();
        }
        this.setState({
            value: value
        })
        this.props.onChange && this.props.onChange(value,function(items){
            rootThis.setState({
                autocompleteItems: items
            });
        })
    },
    //确认选择
    handleInputSelect:function(value) {
        this.setState({
            value: value
        }, function(){
            this.props.onSelect && this.props.onSelect(value);
            this.clearAutocomplete();
        });

    },
     /**
      * 输入框focus触发的事件
      * @param event
      *
      * */
    handleInputFocus:function(event) {
        this.handleInputChange(event);
    },
     /**
      * 输入框blur触发的事件
      * @param event
      *
      * */
    handleInputBlur:function(event) {
        setTimeout(function(){
            this.clearAutocomplete();
        }.bind(this),200);
    },
     /**
      * 键盘点击触发的事件
      * @param event
      *
      * */
    handleInputKeyDown:function(event) {
        var ARROW_UP = 38;
        var ARROW_DOWN = 40;
        var ENTER_KEY = 13;
        var ESC_KEY = 27;
        switch (event.keyCode) {
            case ENTER_KEY:
                event.preventDefault();
                this.handleEnterKey();
                break;
            case ARROW_DOWN:
                event.preventDefault();
                this.handleDownKey();
                break;
            case ARROW_UP:
                event.preventDefault();
                this.handleUpKey();
                break;
            case ESC_KEY:
                this.clearAutocomplete();
                break;
        }
    },
    //向上键
    handleUpKey:function(){
        if(this.refs.refAutocompleteItems === undefined) return;
        var activeItem = this.getActiveItem();
        var prevIndex;
        if (activeItem === undefined) {
            prevIndex = this.state.autocompleteItems.length - 1;
        } else {
            if(activeItem.activeItemIndex == 0){
                prevIndex = this.state.autocompleteItems.length - 1;
            }else{
                prevIndex = (activeItem.activeItemIndex - 1) % this.state.autocompleteItems.length;
            }
        }
        this.selectActiveItemAtIndex(prevIndex);
    },
    //向下键
    handleDownKey:function(){
        if(this.refs.refAutocompleteItems === undefined) return;
        var activeItem = this.getActiveItem();
        if (activeItem === undefined) {
            this.selectActiveItemAtIndex(0);
        } else {
            var nextIndex = (activeItem.activeItemIndex + 1) % this.state.autocompleteItems.length;
            this.selectActiveItemAtIndex(nextIndex);
        }
    },
    //enter键
    handleEnterKey:function() {
        var activeItem = this.getActiveItem();
        this.clearAutocomplete();
        if (activeItem !== undefined) {
            var text;
            if(this.refs.refAutocompleteItems !== undefined) {
                var itemsArr = this.refs.refAutocompleteItems.getElementsByTagName('a');
                for(var i = 0; i < itemsArr.length; i++){
                    if(activeItem.activeItemIndex == i){
                        text = itemsArr[i].innerHTML;
                    }
                }
            }
            this.handleInputSelect(text);
        }
    },
    //获取当前active的索引
    getActiveItem:function() {
        if(this.refs.refAutocompleteItems !== undefined){
            var a = this.state.itemsActiveIndex;
        }
        if(a === '-1'){
            return undefined;
        }else{
            return {
                activeItemIndex: a
            }
        }
    },
    //改变当前active的索引
    selectActiveItemAtIndex:function(index){
        if(this.refs.refAutocompleteItems !== undefined) {
            var itemsArr = this.refs.refAutocompleteItems.getElementsByTagName('a');
        }
        for(var i = 0; i < itemsArr.length; i++){
            if(index == i){
                itemsArr[i].setAttribute('class', 'active');
                this.setState({
                    itemsActiveIndex: index
                });
            }
        }
    },
    //隐藏下拉项
    clearAutocomplete:function() {
        this.setState({ autocompleteItems: [] });
    },
    renderInput:function() {
        var classNames = this.props.classNames;
        var placeholder = this.props.placeholder;
        var value = this.state.value;
        return (
            <div className="ucs-autocomplete-input-wrap">
                <input
                    type="text"
                    placeholder={placeholder}
                    className={'ucs-autocomplete-input' + ( classNames.input ? (' '+ classNames.input) : '')}
                    value={value}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeyDown}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                />
            </div>
        )
    },
    renderAutocomplete:function() {
        var rootThis = this;
        var addActiveClass = function(t, e, idx){
            rootThis.setState({
                itemsActiveIndex: idx
            });
        }
        var removeActiveClass = function(e, idx){
            rootThis.setState({
                itemsActiveIndex: idx
            });
        }
        var autocompleteItems = this.state.autocompleteItems;
        if (autocompleteItems.length === 0) { return null }
        return (
            <div
                ref="refAutocompleteItems"
                className={'ucs-autocomplete-items-wrap' + ( this.props.classNames.autocompleteContainer ? (' '+ this.props.classNames.autocompleteContainer) : '')}>

                <ul>
                    {autocompleteItems.map(function(p, idx) {
                        return (
                            <li>
                                <a href="javascript:;"
                                   className={rootThis.state.itemsActiveIndex == idx ? 'active' : ''}
                                   onClick={rootThis.handleInputSelect.bind(this, p)}
                                   onMouseEnter={addActiveClass.bind(this, this, event, idx)}
                                   onMouseLeave={removeActiveClass.bind(this, event, idx)}
                                >{p}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    },
    render:function() {
        var classNames = this.props.classNames;
        return (
            <div 
                className={'ucs-autocomplete' +  ( classNames.root ? (' '+ classNames.root) : '')}>
                {this.renderInput()}
                {this.renderAutocomplete()}
            </div>
        )
    }
})

module.exports = Autocomplete;


