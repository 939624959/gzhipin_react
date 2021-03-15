/*包含n个工具函数*/

/*
用户类型
  dashen/laoban
用户信息完善
  dasheninfo/laobaninfo
*/

export function getRedirectTo(type, header) {
  let path
  if (type === 'dashen') {
    path = '/dashen'
  } else {
    path = '/laoban'
  }

  if (!header) {
    path += 'info'
  }

  return path
}
