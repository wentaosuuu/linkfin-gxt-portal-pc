import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Cookie from 'js-cookie';
import './index.scss';

export default props => {
	const { showMenu, menuData } = props;
	const [activeMenuIndex, setActiveMenuIndex] = useState();
	const [menuShow, setMenuShow] = useState(showMenu);
	const [subMenuShow, setSubMenuShow] = useState(false);
	const [activeSubMenuIndex, setActiveSubMenuIndex] = useState(null);

	const onTitleMouseEnter = () => {
		if (props.showMenu) return;
		setMenuShow(true);
	}

	const onTitleMouseLeave = () => {
		if (props.showMenu) return;
		setMenuShow(false);
	}

	const onMenuWrapMouseEnter = () => {
		if (props.showMenu) return;
		setMenuShow(true);
	}

	const onMenuWrapMouseLeave = () => {
		setActiveSubMenuIndex(null);
		if (props.showMenu) return;
		setMenuShow(false);
	}

	const onMenuMouseEnter = (i) => {
		setActiveSubMenuIndex(i);
	}

	const onMenuMouseLeave = () => { }

	const onSubMenuMouseEnter = (i) => {
		setActiveSubMenuIndex(i);
		if (props.showMenu) return;
		setMenuShow(true);
	}

	const onSubMenuMouseLeave = () => {
		setActiveSubMenuIndex(null);
		if (props.showMenu) return;
		setMenuShow(false);
	}

	const onRapidFinanceSubMenuClick = (id) => {
		const info = localStorage.getItem("userInfo");
		if (info) { // 已登录
			const userInfo = JSON.parse(info);
			if (userInfo.type == 2) { // 企业用户
				Axios
					.post('/financial/enterprise/account/basic/info', { key: userInfo.phone }, {
						headers: {
							'loginUserId': userInfo.id
						}
					})
					.then(d => {
						if (d.data && d.data.attestationState === 1) { // 已认证
							location.href = `/products/application/${id}`;
						} else { // 未认证
							Cookie.set('toastMsg', '您的企业账户未认证，请认证后再重试');
							location.href = `/admin/#/business/index?url=${encodeURI(`/products/application/${id}`)}`;
						}
					});
			} else { // 其他用户
				location.href = `/products/details/${id}`;
			}
		} else { // 未登录
			location.href = `/admin/#/login?notLogin=true&id=${id}`;
		}
	}

	return <div styleName="menu-wrap">
		<div styleName="title" onMouseEnter={onTitleMouseEnter} onMouseLeave={onTitleMouseLeave}>
			<i></i>
			<h3>全部服务</h3>
		</div>
		<ul styleName="menu-list" onMouseEnter={onMenuWrapMouseEnter} onMouseLeave={onMenuWrapMouseLeave} style={{ display: menuShow ? 'block' : 'none' }}>
			{
				menuData && menuData.navList && menuData.navList.map((d, i) => {
					return <li key={i} onMouseEnter={() => onMenuMouseEnter(i)} onMouseLeave={onMenuMouseLeave}>
						<div styleName="header">
							{(function () {
								if (d.name === '快速融资') {
									return <a href="/products">{d.name}</a>;
								} else if (d.name === '热门产品') {
									return <a href="/products">{d.name}</a>;
								} else if (d.name === '金融机构') {
									return <a href="/finance">{d.name}</a>;
								} else if (d.name === '特色服务') {
									return <a style={{ cursor: 'default' }}>{d.name}</a>;
								}
							})()}
							<i></i>
						</div>
						<div styleName="content">
							{
								d.childList.slice(0, 2).map((k, b) => {
									if (d.name === '快速融资') {
										return <a key={b} onClick={() => onRapidFinanceSubMenuClick(k.id)}>{k.name}</a>;
									} else if (d.name === '热门产品') {
										return <a key={b} href={`/products/details/${k.id}`}>{k.name}</a>;
									} else if (d.name === '金融机构') {
										return <a key={b} href={`/finance/details/${k.id}`}>{k.name}</a>;
									} else if (d.name === '特色服务') {
										return <a key={b} href={k.url} target="_blank">{k.name}</a>;
									}
								})
							}
						</div>
					</li>;
				})
			}
		</ul>
		<ul styleName="sub-menu-list">
			{
				menuData && menuData.navList && menuData.navList.map((d, i) => {
					return <li key={i} onMouseEnter={() => onSubMenuMouseEnter(i)} onMouseLeave={onSubMenuMouseLeave} style={{ display: activeSubMenuIndex === i ? 'block' : 'none' }}>
						<div styleName="header">
							<h4>{d.name}</h4>
						</div>
						<div styleName="content">
							{
								d.childList.slice(0, 10).map((k, b) => {
									if (d.name === '快速融资') {
										return <a key={b} onClick={() => onRapidFinanceSubMenuClick(k.id)}>{k.name}</a>;
									} else if (d.name === '热门产品') {
										return <a key={b} href={`/products/details/${k.id}`}>{k.name}</a>;
									} else if (d.name === '金融机构') {
										return <a key={b} href={`/finance/details/${k.id}`}>{k.name}</a>;
									} else if (d.name === '特色服务') {
										return <a key={b} href={k.url} target="_blank">{k.name}</a>;
									}
								})
							}
						</div>
					</li>;
				})
			}
		</ul>
	</div>
};
