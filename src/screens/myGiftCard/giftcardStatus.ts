import styles from './MyGiftCardScreen.style';
import type { MyGiftcard } from '../../types/voucher';

const getGiftcardStatus = (tab: 'available' | 'completed', item: MyGiftcard) => {
  if (tab === 'available') {
    if (item.status === '미사용') {
      return { text: '사용 전', style: styles.unused, textStyle: styles.statusTextUnused };
    }
    if (item.status === '사용중') {
      return { text: '사용 중', style: styles.used, textStyle: styles.statusTextUsed };
    }
  } else {
    if (item.status === '사용됨') {
      return { text: '사용 완료', style: styles.completed, textStyle: styles.statusTextCompleted };
    }
    if (item.daysLeft < 0) {
      return { text: '기간 만료', style: styles.expired, textStyle: styles.statusTextExpired };
    }
  }
  return { text: '', style: {}, textStyle: {} };
};

export default getGiftcardStatus;
