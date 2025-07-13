import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../colors';

type Stamp = {
  id: number;
  isStamped: boolean;
};

type StampBoardProps = {
  shopName: string;
  stamps: Stamp[];
};

const stampImg = require('../../assets/images/stamp.png');

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: colors.light.main,
    borderRadius: 18,
    padding: 20,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  shopName: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.white,
  },
  stampCount: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.light.white,
  },
  board: {
    gap: 9,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 11,
    justifyContent: 'center',
  },
  stampCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filled: {
    backgroundColor: colors.light.white,
    borderColor: colors.light.sub,
    elevation: 6,
  },
  empty: {
    backgroundColor: colors.light.sub,
    borderColor: colors.light.white,
    borderStyle: 'dashed',
  },
  stampText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.white,
  },
  stampImage: {
    width: 33,
    height: 33,
    resizeMode: 'contain',
  },
});

export default function StampBoard({ shopName, stamps }: StampBoardProps) {
  const rows = [stamps.slice(0, 5), stamps.slice(5, 10)];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.shopName}>{shopName}</Text>
        <Text style={styles.stampCount}>
          {stamps.filter((stamp) => stamp.isStamped).length} / {stamps.length}
        </Text>
      </View>

      <View style={styles.board}>
        {rows.map((row, rowIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <View key={rowIndex} style={styles.row}>
            {row.map((stamp) => (
              <View
                key={stamp.id}
                style={[styles.stampCircle, stamp.isStamped ? styles.filled : styles.empty]}
              >
                {stamp.isStamped ? (
                  <Image source={stampImg} style={styles.stampImage} />
                ) : (
                  <Text style={styles.stampText}>{stamp.id}</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
