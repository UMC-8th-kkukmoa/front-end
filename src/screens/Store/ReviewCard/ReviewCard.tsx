import React from 'react';
import { View, Text } from 'react-native'; // , Image 추가 필요
import styles from './ReviewCard.style';

interface ReviewCardProps {
  review: {
    id: string;
    content: string;
    image?: string;
  };
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <View style={styles.card}>
      {/* <Image
        source={
          review.image ? { uri: review.image } : require('../../assets/images/placeholder.png')
        }
        style={styles.image}
      /> */}
      <Text style={styles.text} numberOfLines={2}>
        {review.content}
      </Text>
    </View>
  );
}

export default ReviewCard;
