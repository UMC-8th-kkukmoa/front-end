import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 10,
  },
  backArrow: {
    fontSize: 24,
  },
  storeInfo: {
    marginTop: 40,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  heartIcon: {
    fontSize: 20,
  },
  reviewCount: {
    marginTop: 4,
    marginBottom: 12,
    color: '#f90',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  reviewSection: {
    marginTop: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAllButton: {
    backgroundColor: '#ffe0cc',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    color: '#f90',
    fontWeight: '600',
  },
});
