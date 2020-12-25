import React from 'react';
import styles from './toast.less';
import { LoadingOutlined } from '@ant-design/icons';
import ReactDOM from "react-dom";

function ToastComponent({content}) {
  return (
    <div className={styles.toast}>
      <div className={styles.mask} />
      <div className={styles.content}>
        <div className={styles.ico}>
          <LoadingOutlined />
        </div>
        <div className={styles.text}>
          {content}
        </div>
      </div>
    </div>
  );
}

class Toast {
  constructor() {
    this.dom = null;
  }

  loading(content='加载中...') {
    if(!this.dom) {
      this.dom = document.createElement('div');
      document.body.appendChild(this.dom);
      ReactDOM.render(<ToastComponent content={content}/>, this.dom);
    }
  }

  destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(this.dom);
    if (unmountResult && this.dom.parentNode) {
      this.dom.parentNode.removeChild(this.dom);
    }
    this.dom = null;
  }
}

export default new Toast();
