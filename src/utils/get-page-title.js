import { SITE_TITLE } from '@/config/config';

// 生成页面标题
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${SITE_TITLE}`;
  }
  return `${SITE_TITLE}`;
}
