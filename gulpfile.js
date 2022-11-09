let gulp = require('gulp') //加载gulp模块
let pro = require('child_process') //运行子进程库
const sftp = require('gulp-sftp-up4'); //sftp上传程序
let username = 'root';
let password = 'y2pe2NF7y2pe2NF7'
let project_name = 'appointmobile'


let assets = process.cwd() + `/build`,
    remoteServer1Prep = {
        host: '47.108.78.245',
        port: 22444,
        remotePath: `/server/html/${project_name}`,
        user: username,
        pass: password
    }


const build = () => {
    return new Promise((resolve, reject) => {
        pro.exec('yarn build', (error, stdout, stderr) => {
            if (error !== null) {
                console.log('exec error: ' + error)
            }
            resolve()
            console.log('build codeing finished')
        })
    })
}

//先执行build命令打包。在把程序上传至服务器
gulp.task('prep', () => build().then(() => {
    console.error(assets)
    gulp.src(assets + '/**').pipe(sftp(remoteServer1Prep))
}))
