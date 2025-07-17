import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ArrowBackIcon from '../../assets/images/arrow_back.svg';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    shadowColor: '#00000014',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 62,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
  },
});

export default function AppBar({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <ArrowBackIcon />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
