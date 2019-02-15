const proxy = require("http-proxy-middleware");

module.exports=(app)=>{
    app.use("/api",proxy({
        target:"http://www.feifeis.cn",
        changeOrigin:true,
        pathRewrite:{
            "^/api":""
        }
    }))
}