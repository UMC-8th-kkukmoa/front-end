import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  mapArea: {
    flex: 1,
    backgroundColor: colors.light.white,
  },

  headerArea: {
    position: 'absolute',
    top: 2,
  },
});

export default styles;
