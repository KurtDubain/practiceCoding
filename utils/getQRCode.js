const axios = require('axios')
const fs = require("fs")
const path = require('path')

let accessToken = ''

// 第一个URL，参数不用动
const getAccessToken = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx8c9cc8582d153543&secret=75cc6a38c1bb8af1a90f2ea3ca795c8e`
// params表示编号
let params = '0x1145141919810'

// 拿到accessToken
axios.get(getAccessToken)
        .then(res=>{
            
            accessToken = res.data.access_token
            // 拿到accessToken之后，发送请求获取图片数据
            axios.post(`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken}`,
            {
                "page":"pages/index/index",
                "scene":params,//编号参数
                "env_version":'trial',//表示跳转到体验版，release表示正式版，目前是体验版
                "check_path": false,
            },{responseType: 'arraybuffer'})
            .then(res => {
                // 我是将图片存到了服务端本地，如果响应成功的话，res.data是二进制数据，需要转成图片
                const outpath = path.join(__dirname, `picture(${params}).jpg`);
                // const imageBase64 = Buffer.from(res.data, 'binary').toString('base64');
                // fs.writeFileSync(outpath, imageBase64, 'base64');
                // const imageBase64 = Buffer.from(res.data, 'binary');
                // fs.writeFileSync(outpath, imageBase64);
                fs.writeFileSync(outpath,res.data,'binary')
                console.log('二维码图片已保存:', outpath);
            })
            .catch(err => {
                console.error(err); 
            })
        })
        .catch(error=>{
            console.error('token获取失败',error)
        })