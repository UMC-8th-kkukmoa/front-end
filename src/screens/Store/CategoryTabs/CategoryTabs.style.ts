import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    gap: 7,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 55,
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 1.12, height: 3.37 },
    shadowRadius: 3,
    elevation: 7,
    alignSelf: 'flex-start',
    paddingHorizontal: 9.9,
    paddingVertical: 3.3,
    height: 33,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  label: {
    marginBottom: 2.3,
    marginLeft: 5,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.8,
  },
});
