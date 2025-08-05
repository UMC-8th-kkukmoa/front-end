import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 15,
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
    color: '#888',
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
  statusTextUnused: {
    color: colors.light.gray2,
    fontSize: 12,
    lineHeight: 16,
  },
  statusTextUsed: {
    color: colors.light.white,
    fontSize: 12,
    lineHeight: 16,
  },
  image: {
    width: 282,
    height: 172,
    borderRadius: 8,
    marginTop: 14,
    marginBottom: 15,
    alignSelf: 'center',
  },
});
