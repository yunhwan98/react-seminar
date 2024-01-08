const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/udemy',
		createProxyMiddleware({
			target: 'https://www.udemy.com',
			changeOrigin: true,
			pathRewrite: {
				'^/udemy': '',
			},
		})
	);
	app.use(
		'/inflearn',
		//proxy가 필요한 path parameter
		createProxyMiddleware({
			target: 'https://www.inflearn.com', //타겟이 되는 api url,
			changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정,
			pathRewrite: {
				'^/inflearn': '',
			},
		})
	);
	app.use(
		'/fastcampus',
		//proxy가 필요한 path parameter
		createProxyMiddleware({
			target: 'https://fastcampus.co.kr/', //타겟이 되는 api url,
			changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정,
			pathRewrite: {
				'^/fastcampus': '',
			},
		})
	);
	app.use(
		'/codeit',
		//proxy가 필요한 path parameter
		createProxyMiddleware({
			target: 'https://www.codeit.kr/', //타겟이 되는 api url,
			changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정,
			pathRewrite: {
				'^/codeit': '',
			},
		})
	);
	app.use(
		'/nomad',
		//proxy가 필요한 path parameter
		createProxyMiddleware({
			target: 'https://nomadcoders.co', //타겟이 되는 api url,
			changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정,
			pathRewrite: {
				'^/nomad': '',
			},
		})
	);
	app.use(
		'/goorm',
		//proxy가 필요한 path parameter
		createProxyMiddleware({
			target: 'https://edu.goorm.io/', //타겟이 되는 api url,
			changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정,
			pathRewrite: {
				'^/goorm': '',
			},
		})
	);
};
