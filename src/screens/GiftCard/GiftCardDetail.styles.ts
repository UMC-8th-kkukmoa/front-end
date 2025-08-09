import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    paddingBottom: 100,
  },
  headerContainer: {
    backgroundColor: colors.light.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.gray1_35,
    zIndex: 10,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 80,
  },
  contentContainer: {
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
    paddingHorizontal: 20,
  },
  textBox: {
    flexShrink: 1,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: colors.light.black,
    marginBottom: 3,
  },
  price: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.light.main,
  },
  shareIcon: {
    padding: 8,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.light.gray1,
    marginVertical: 24,
  },
  detailBox: {
    width: '90%',
  },
  detailRow: {
    flexDirection: 'row',
    gap: 17,
    marginBottom: 12,
  },
  detailTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: colors.light.gray2,
  },
  detailText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: colors.light.gray2,
    maxWidth: '60%',
    textAlign: 'left',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    marginTop: 50,
    textAlign: 'center',
  },
  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    paddingVertical: 35,
    backgroundColor: colors.light.white,
  },
  purchaseButton: {
    backgroundColor: colors.light.main,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purchaseButtonText: {
    color: colors.light.white,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
});

export default styles;
