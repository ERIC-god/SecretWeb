/**
 * 从 itemElement 中抽离出所有的 imgElements
 */
export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach((item) => {
    imgElements.push(...item.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 * 生成所有的图片链接数组
 */
export const getAllImg = (imgElements) => {
  return imgElements.map((item) => {
    return item.src
  })
}

/**
 *  监听图片数组加载完成(promise+)
 */
export const onCompleteImgs = (imgs) => {
  const promiseAll = []
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((reslove, reject) => {
      const imageObj = new Image()
      imageObj.src = img
      imageObj.onload = () => {
        reslove({ img, index })
      }
    })
  })
  return Promise.all(promiseAll)
}

/**
 *  返回列高中最小的高度
 */
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

/**
 *  返回列高中最大的高度
 */
export const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}

/**
 *  返回 列高对象 中 最小高度的列
 */
export const getMinHeightColumn = (columnHeightObj) => {
  // 拿到最小的高度
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}
