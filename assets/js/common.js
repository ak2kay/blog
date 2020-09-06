/* iconfont */
import iconfont from '../svg/iconfont';

iconfont(window);

/* theme system */
import ThemeManager from './components/theme';

const themeManager = new ThemeManager();
document.getElementById('ctrl-adjust').addEventListener('click', () => {
  themeManager.switchTheme();
});

/* toc control */
const tocNode = document.getElementById('table-of-contents');
if (tocNode) {
  document.getElementById('ctrl-toc').addEventListener('click', () => {
    const classes = Array.from(tocNode.classList);
    if (classes.includes('hidden')) {
      tocNode.classList.remove('hidden');
    } else {
      tocNode.classList.add('hidden');
    }
  });
}

/* feature detection */
import initModernizr from './plugins/modernizr';
import { setLS, getLS } from './plugins/storage';
import {
  NOTIFICATION_FEATURE_SUPPORTED,
  NOTIFICATION_FEATURE_DISMISSED,
} from './plugins/constants';

if (!getLS(NOTIFICATION_FEATURE_SUPPORTED) && !getLS(NOTIFICATION_FEATURE_DISMISSED)) {
  initModernizr(window, document);
  const unsupportedFeatures = [];
  window.Modernizr.on('webp', (result) => {
    if (!result.lossless) {
      unsupportedFeatures.push('无损压缩模式 WebP 格式图片');
    }
    if (!result.alpha) {
      unsupportedFeatures.push('WebP 格式图片 alpha 通道');
    }
    if (!result.animation) {
      unsupportedFeatures.push('WebP 格式动态图片');
    }
    if (unsupportedFeatures.length > 0) {
      const listNode = document.getElementById('feature-list');
      unsupportedFeatures.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        listNode.appendChild(li);
      });
      const cardNode = document.querySelector('.notification.markdown.content');
      cardNode.setAttribute('style', 'display: flex;');
      document.getElementById('feature-close').addEventListener('click', () => {
        cardNode.setAttribute('style', 'display: none;');
        setLS(NOTIFICATION_FEATURE_DISMISSED, true);
      });
    } else {
      setLS(NOTIFICATION_FEATURE_SUPPORTED, true);
    }
  });
}
