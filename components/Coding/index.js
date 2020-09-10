import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';

import CodeMirror from '../react-codemirror-fe/src';

import './index.less';
// import LocaleProvider from 'antd/lib/locale-provider';

const supportLang = CodeMirror.supportLang;

export default () => {

  // mode
  const [value, setValue] = useState('');
  const [langIndex, setLangIndex] = useState(0);
  const handleSwithMode = (index) => {
    setLangIndex(index);
  };

  const langMenu = (
    <Menu>
      {
        supportLang.map((langItem, index) => <Menu.Item key={langItem.mode}>
          <a href="javascript:;" onClick={() => {handleSwithMode(index);}}>
            {langItem.showName}
          </a>
        </Menu.Item>)
      }
    </Menu>
  );

  /* event */
  // onChange
  const editorOnChange = (editor, changeObj) => {
    console.log('changeObj ->', changeObj);
  }

  return (
    <div className="coding-container">
      <div className="coding-header">
        <Dropdown overlay={langMenu} trigger={['click']}>
          <button 
            type="button"
            className="default-btn"
          >
            当前语言：{supportLang[langIndex].showName}
          </button>
        </Dropdown>
      </div>
      <div className="coding-area">
        <CodeMirror
          mode={supportLang[langIndex].mode}
          // width="300px"
          // height="300px"
          value={value}
          onChange={editorOnChange}
          getEditorInstance={editorIns => {
            window.editor = editorIns;
          }}
        />
      </div>
    </div>
  )
}