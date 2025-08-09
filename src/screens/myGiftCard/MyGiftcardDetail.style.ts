import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
  },
  scroll: {
    backgroundColor: colors.light.white,
  },
  inner: {
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: 11,
  },
  daysLeft: {
    fontSize: 14,
    color: colors.light.gray2,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: colors.light.gray1,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 16,
    elevation: 4,
  },
  statusText: {
    color: colors.light.gray2,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  used: {
    backgroundColor: colors.light.sub,
  },
  usedText: {
    color: colors.light.white,
  },
  cardImage: {
    width: 282,
    height: 172,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 26,
    alignSelf: 'center',
  },
  description: {
    alignItems: 'center',
    marginBottom: 10,
  },
  brand: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.light.gray2,
    marginBottom: 7,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  barcode: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 29,
  },
  infoBox: {
    backgroundColor: colors.light.gray1_35,
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.light.black,
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.light.main,
  },
  bottomRow: {
    paddingHorizontal: 15,
    paddingVertical: 18,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.light.gray2,
  },
  subValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.light.gray2,
  },
});
