import router from './routers'
import { getCookie } from './utils/auth'

// 通过beforeEach钩子来判断用户是否登陆过 有无token
const whiteList = ['/login'] // 不重定向白名单
// const userInfo = getUserInfo()

router.beforeEach((to, from, next) => {
    console.log(to.matched)
    // 判断是否有登录过
    if (getCookie('userId_dev')) {
        // 如果包含userId_dev 从登录页面跳转 直接跳转到首页 /
        if (to.path === '/login') {
            next()
        } else {
            if (to.matched.length === 0) {
                next('/404') // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
            }
            next() // 如果匹配到正确跳转
        }
        // 没有登录
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            // 还没有登录过 则跳转到登录界面
            // next('/login')
            if (to.path.slice(1) !== '') {
                if (to.matched.length === 0) {
                    router.push({
                        path: '/login'
                    })
                } else {
                    router.push({
                        path: '/login',
                        query: {
                            redirect: to.path.slice(1)
                        }
                    })
                }
            } else {
                router.push({
                    path: '/login'
                })
            }
        }
    }
})