import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import BannerImage1 from '../../assets/images/bannerex.svg';
import colors from '../../design/colors';

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    position: 'relative',
    height: 121,
    marginBottom: 27,
    overflow: 'hidden',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.light.white,
    opacity: 0.5,
  },
  activeDot: {
    borderRadius: 4,
    backgroundColor: colors.light.white,
    opacity: 1,
  },
});

const banners = [{ id: 'banner1', component: BannerImage1 }];

function MainBanner() {
  const [index, setIndex] = useState(0);
  const hasMultiple = banners.length > 1;

  return (
    <View style={styles.container}>
      <Swiper
        autoplay={hasMultiple}
        autoplayTimeout={4}
        loop={hasMultiple}
        showsPagination={false}
        onIndexChanged={setIndex}
        scrollEnabled={hasMultiple}
      >
        {banners.map(({ id, component: BannerComponent }) => (
          <BannerComponent key={id} width="100%" height={121} />
        ))}
      </Swiper>

      {/* 커스텀 dot */}
      <View style={styles.pagination} pointerEvents="none">
        {banners.map(({ id }, idx) => (
          <View key={id} style={[styles.dot, idx === index ? styles.activeDot : null]} />
        ))}
      </View>
    </View>
  );
}

export default MainBanner;
