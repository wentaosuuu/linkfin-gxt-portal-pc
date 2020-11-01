import React from 'react';
import BreadCrumps from '@src/components/breadCrumps';
import Layout from '@src/components/layout/index';
import './styles/detail.scss';

export default props => {
  const { type, title, headerData, getContactInfo, infoDetailData, productList } = props;
  headerData.contactInfo = getContactInfo;
  const breadCrumps = [
    {
      href: `/info?type=${type}`,
      name: title
    },
    {
      href: '#',
      name: '信息详情'
    }
  ]
  return <Layout footerData={getContactInfo} headerData={headerData} title={title} menuData={productList}>
    <div styleName="detail-container">
      <div styleName="container">
        <BreadCrumps hrefs={breadCrumps} />
        <div styleName="body">
          <div styleName="header">
            <h1>{infoDetailData.title}</h1>
            <p>
              <span>{infoDetailData.sourceUrl}</span>
              <span>{infoDetailData.issueTime ? infoDetailData.issueTime.substring(0, 10) : ''}</span>
            </p>
          </div>
          <div styleName="content" dangerouslySetInnerHTML={{ __html: infoDetailData.infoContent }}></div>
        </div>
      </div>
    </div>
  </Layout>
}