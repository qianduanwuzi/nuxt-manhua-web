# mangariver-web
``` bash
》 My online Nuxt.js project

》 online website:https://mangadrawer.com 
```

# brief
``` bash
> 已成功上线，具体效果见上面网站，目测流量不错
> 页面init时异步数据seo的友好，axios服务端及B端的统一封装，（说白了，进页面时看不到接口，也就是所谓的服务端跑了接口）
> axios拦截器封装
> 适配了移动端
> 由于完全暴露源码，故方便大家开箱即用，看下整体思路
```

# thinking
  > 很多人对于asyncData钩子里使用axios时request header如何带token有疑问，我这边主要是针对axios拦截器做了处理，登录时将token放在cookie里，同时放vuex里，通过process.client区分用户端还是服务端加上token

# tips
> 由于源码暴露，实属不易，放个打赏码~，有问题随时call我
 ![image](https://github.com/qianduanwuzi/img/blob/master/static/wx-ds.jpg)



## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
