const axios = require('axios')
const fs = require("fs")
const path = require('path')

let accessToken = ''


const getAccessToken = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx8c9cc8582d153543&secret=75cc6a38c1bb8af1a90f2ea3ca795c8e`
// const params = {
//     deviceNum:'bui21',
//     location:'dsdad',
//     status:'online'
// }
let params = 'gi2g1'
axios.get(getAccessToken)
        .then(res=>{
            // console.log(res)
            accessToken = res.data.access_token
            axios.post(`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken}`,
            {
                "page":"pages/index/index",
                "scene":params,
                "env_version":'trial',
                "check_path": false,
            },{responseType: 'arraybuffer'})
            .then(res => {
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