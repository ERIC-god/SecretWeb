import request from '@/utils/request.js'

/**
 * 获取分类列表
 */

export const getVipPayList = () => {
  return request({
    url: '/user/vip/pay/list',
  })
}
