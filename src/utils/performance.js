import { onCLS,onINP, onLCP, onTTFB, onFCP } from 'web-vitals';

export function initWebVitals(onPerfEntry){
    if (onPerfEntry && onPerfEntry instanceof Function) {
        // 测量 CLS (Cumulative Layout Shift), 量化了页面加载过程中元素意外移动的程度
        onCLS(onPerfEntry);
        // 测量 INP(Interaction to Next Paint), (替代 FID)
        // 需要用户与页面进行交互后才能开始测量 , 如果用户没有交互，这个指标不会被记录
        onINP(onPerfEntry);
        // 测量 LCP(Largest Contentful Paint) , 主要内容加载完成
        onLCP(onPerfEntry);
        // 测量 TTFB(Time To First Byte), 开始接收服务器响应
        onTTFB(onPerfEntry);
        // 测量 FCP(First Contentful Paint) , 首次显示内容
        onFCP(onPerfEntry);     
      }
}