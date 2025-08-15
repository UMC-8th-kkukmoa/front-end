import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import colors from '../colors';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  paymentUrl: string;
  paymentToken: string;
  onPaymentSuccess: () => void;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: { position: 'absolute', top: Platform.OS === 'ios' ? 40 : 20, right: 20, zIndex: 1 },
  closeButtonText: { fontSize: 18, color: colors.light.black, fontFamily: 'Prentendard-Bold' },
  title: { textAlign: 'center', fontSize: 18, fontFamily: 'Prentendard-Bold' },
  webview: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default function PaymentModal({
  visible,
  onClose,
  paymentUrl,
  paymentToken,
  onPaymentSuccess,
}: PaymentModalProps) {
  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;

    if (url.startsWith('kkukmoa://app/myGiftCard/MyGiftCardScreen')) {
      onPaymentSuccess();
      onClose();
    } else if (url.includes('fail=true')) {
      Alert.alert('결제 실패');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>결제하기</Text>
        </View>
        {paymentUrl ? (
          <WebView
            source={{
              uri: paymentUrl,
              headers: {
                Authorization: `Bearer ${paymentToken}`, // token 넣기
              },
            }}
            style={styles.webview}
            onNavigationStateChange={handleNavigationStateChange}
            startInLoadingState
            renderLoading={() => (
              <ActivityIndicator
                size="large"
                color="#3182f6"
                style={{ flex: 1, justifyContent: 'center' }}
              />
            )}
          />
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3182f6" />
          </View>
        )}
      </View>
    </Modal>
  );
}
