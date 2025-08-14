import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    overflow: 'hidden',
  },

  cardContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 5,
  },
  card: {
    backgroundColor: '#DCDCDC59',
    borderRadius: 12,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 11,
    marginTop: 15,
    gap: 15,
  },
  daysLeft: {
    fontSize: 14,
    color: colors.light.gray2,
    fontFamily: 'Pretendard-SemiBold',
  },
  statusBadge: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 16,
    elevation: 4,
  },
  unused: {
    backgroundColor: colors.light.gray1,
  },
  used: {
    backgroundColor: colors.light.sub,
  },
  completed: {
    backgroundColor: colors.light.gray2,
  },
  expired: {
    backgroundColor: colors.light.gray2,
  },
  statusTextCompleted: {
    color: colors.light.white,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
  statusTextExpired: {
    color: colors.light.white,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    width: '50%',
    marginHorizontal: 30,
    marginTop: 19,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.light.gray2,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.light.main,
  },
  activeTabText: {
    color: colors.light.black,
    fontFamily: 'Pretendard-SemiBold',
  },
  statusTextUnused: {
    color: colors.light.gray2,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
  statusTextUsed: {
    color: colors.light.white,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
  image: {
    width: 282,
    height: 172,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
    alignSelf: 'center',
  },
});
