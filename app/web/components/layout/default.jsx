import React, { Component } from 'react';
import "@babel/polyfill";
import '../../styles/normalize.css';
import '../../styles/global.scss';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title
    };
  }
  componentWillReceiveProps(props, prevProps) {
    this.setState({
      title: props.title
    });
  }
  render() {
    if (EASY_ENV_IS_NODE) {
      return <html>
        <head>
          <title>{`${this.state.title} - 桂信通-广西中小企业融资信用服务平台`}</title>
          <meta charSet="utf-8"></meta>
          <meta name="renderer" content="webkit"></meta>
          <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"></meta>
          <meta name="keywords" content="桂信通,中小企业融资信用服务平台,广西中小企业融资,信用服务平台,联合征信,中国东信,企业征信,复工贷,小微融资,信用服务,征信,东盟,复工不等贷,金融服务超市,大数据,融资难融资贵"></meta>
          <meta name="description" content="平台由广西联合征信有限公司建设运营，隶属于中国—东盟信息港股份有限公司，致力于应用大数据、物联网和区块链等新技术，助力解决小微企业融资难融资贵问题。"></meta>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
          <div dangerouslySetInnerHTML={{
            __html: `<script>
            (function(){
                var bp = document.createElement('script');
                var curProtocol = window.location.protocol.split(':')[0];
                if (curProtocol === 'https') {
                    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
                }
                else {
                    bp.src = 'http://push.zhanzhang.baidu.com/push.js';
                }
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(bp, s);
            })();
          </script>`}}></div>
        </head>
        <body>
          <h1 style={{ display: "none" }}>{`${this.state.title} - 桂信通-广西中小企业融资信用服务平台`}</h1>
          <div id="app" className={this.props.className}>{this.props.children}</div>
          <div id="model"></div>
        </body>
      </html>;
    }
    return this.props.children;
  }
}
