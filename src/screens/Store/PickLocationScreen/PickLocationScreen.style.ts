// PickLocationScreen.style.ts
import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
  },
  zoomControls: {
    position: 'absolute',
    right: 22,
  },

  pinWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonWrapper: {
    position: 'absolute',
    left: 16,
  },
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.light.main,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 1.12, height: 3.37 },
    shadowRadius: 3,
    elevation: 4,
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.light.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  tipHeader: {
    backgroundColor: colors.light.gray1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tipText: {
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.light.black,
  },

  actions: {
    paddingVertical: 18,
    paddingHorizontal: 29,
  },

  confirmButton: {
    width: '100%',
    paddingVertical: 17,
    paddingHorizontal: 153,
    borderRadius: 30,
    backgroundColor: colors.light.main,
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmText: {
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.light.white,
  },
});
