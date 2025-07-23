import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './ReviewCard.style';

interface ReviewCardProps {
  review: {
    id: string;
    name?: string;
    content: string;
    image?: string;
  };
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <View style={styles.card}>
      {review.image && <Image source={{ uri: review.image }} style={styles.image} />}

      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 1)']}
        style={styles.gradient}
      />

      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {review.name}
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          {review.content}
        </Text>
      </View>
    </View>
  );
}

export default ReviewCard;
