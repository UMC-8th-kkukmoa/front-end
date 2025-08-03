import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.light.white,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 35,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 42,
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
    marginBottom: 4,
  },
  modalPrice: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
    marginBottom: 14,
  },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  qtyLabel: {
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.light.gray1,
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },

  qtyButton: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.gray2,
  },
  qtyText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
  },
  totalPrice: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.main,
  },
  modalBuyButton: {
    backgroundColor: colors.light.main,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  modalBuyText: {
    color: colors.light.white,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
});

export default styles;
