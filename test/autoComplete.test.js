import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Autocomplete from '../src/libs/Autocomplete/index.js';

function shallowRender(Component, props) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component {...props}/>);
  return renderer.getRenderOutput();
}

describe('AutoComplete 组件测试', function () {
  it('classNames测试', function () {
  	const autoComplete = shallowRender(Autocomplete, {classNames: {root:'666'}});
    expect(autoComplete.props.className.indexOf('666')).to.be.not.equal(-1);
  });
});