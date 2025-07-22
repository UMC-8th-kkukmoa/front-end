import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    width: 160,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android 그림자
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  text: {
    paddingHorizontal: 8,
    paddingTop: 8,
    fontSize: 14,
    color: '#333',
  },
});
