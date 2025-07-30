import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    marginBottom: 24,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
    marginBottom: 12,
  },
  productBox: {
    backgroundColor: `${colors.light.gray1}59`,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 13,
    marginVertical: 10,
    alignItems: 'center',
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
  },
  productTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.main,
    marginBottom: 4,
  },
  productQty: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
  },
  paySectionOuter: {
    borderTopWidth: 5,
    borderTopColor: colors.light.gray1,
  },
  paySection: {
    marginTop: 13,
    marginBottom: 24,
    marginHorizontal: 20,
  },
  payMethodTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
    marginTop: 15,
    marginBottom: 20,
  },
  tosspayButton: {
    borderWidth: 1,
    borderColor: colors.light.gray2,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  footer: {
    paddingTop: 16,
    paddingBottom: 35,
    paddingHorizontal: 30,
    backgroundColor: colors.light.white,
    elevation: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agreementText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.gray2,
  },
  buyButton: {
    backgroundColor: colors.light.main,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.white,
  },
});

export default styles;
