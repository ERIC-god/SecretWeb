import OSS from 'ali-oss'
import { getSts } from '../api/sys'

export const getOSSClient = async () => {
  const res = await getSts()
  return new OSS({
    // bucket所在区域
    region: 'oss-cn-beijing',
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: res.Credentials.AccessKeyId,
    accessKeySecret: res.Credentials.AccessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: res.Credentials.SecurityToken,
    // 填写Bucket名称。
    bucket: 'imooc-front',
    // 刷新 token，在 token 过期后自动调用（但是并不生效，可能会在后续的版本中修复）
    refreshSTSToken: async () => {
      // 向您搭建的STS服务获取临时访问凭证。
      const res = await getSts()
      return {
        accessKeyId: res.Credentials.AccessKeyId,
        accessKeySecret: res.Credentials.AccessKeySecret,
        stsToken: res.Credentials.SecurityToken,
      }
    },
    // 刷新临时访问凭证的时间间隔，单位为毫秒。
    refreshSTSTokenInterval: 5 * 1000,
  })
}
