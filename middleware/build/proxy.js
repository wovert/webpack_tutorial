module.exports = {
  '/.+': {
    target: 'https://m.weibo.cn',
    changeOrigin: true,
    logLevel: 'debug', // 查看接口信息
    pathRewrite: {
      '^/list': '/api/config/list'
    },
    // /msg/index接口提示登录；需要cookie
    headers: {
      'Cookie': '_T_WM=38eac7ad57aa8e1a09f31d501361ba81; WEIBOCN_FROM=1110006030; SUB=_2A25xU8KMDeRhGeBN7FYS8S_Owz2IHXVSv-7ErDV6PUJbkdAKLXP4kW1NRC6B-R19Vyec-ZtFvf4uiRTGO_bIZmvT; SUHB=0tKqRAVnkzFzq7; MLOGIN=1; XSRF-TOKEN=8aaf35; M_WEIBOCN_PARAMS=lfid%3D102803%26luicode%3D20000174%26uicode%3D20000174'
    }
  } 
}