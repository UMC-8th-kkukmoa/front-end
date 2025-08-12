import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  usePaymentWidget,
  PaymentMethodWidget,
  AgreementWidget,
} from '@tosspayments/widget-sdk-react-native';
import type {
  PaymentMethodWidgetControl,
  AgreementWidgetControl,
} from '@tosspayments/widget-sdk-react-native';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  paymentData: {
    orderId: string;
    orderName: string;
    amount: number;
  };
  onPaymentSuccess: (result: any) => void;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 10 : 20,
    right: 20,
    zIndex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
  },
  closeButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    marginBottom: 8,
    paddingTop: 5,
  },
  orderInfo: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  amountInfo: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#3182f6',
    textAlign: 'center',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },

  paymentMethodSection: {
    marginBottom: 25,
  },
  paymentMethodWidget: {
    minHeight: 200,
    maxHeight: 600,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },

  agreementSection: {
    marginBottom: 20,
  },
  agreementWidget: {
    minHeight: 80,
    maxHeight: 120,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },

  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 25 : 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
    minHeight: 80,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 50,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#666',
  },
  payButton: {
    flex: 2,
    backgroundColor: '#3182f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    minHeight: 50,
    shadowColor: '#3182f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  payButtonText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: 'white',
  },
});

export default function PaymentModal({
  visible,
  onClose,
  paymentData,
  onPaymentSuccess,
}: PaymentModalProps) {
  const paymentWidgetControl = usePaymentWidget();
  const [paymentMethodWidgetControl, setPaymentMethodWidgetControl] =
    useState<PaymentMethodWidgetControl | null>(null);
  const [agreementWidgetControl, setAgreementWidgetControl] =
    useState<AgreementWidgetControl | null>(null);
  const [widgetKey, setWidgetKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isWidgetReady, setIsWidgetReady] = useState(false);

  const handleClose = () => {
    setPaymentMethodWidgetControl(null);
    setAgreementWidgetControl(null);
    setIsLoading(false);
    onClose();
  };

  React.useEffect(() => {
    if (!visible) {
      setPaymentMethodWidgetControl(null);
      setAgreementWidgetControl(null);
      setIsLoading(false);
    }
  }, [visible]);

  React.useEffect(() => {
    if (visible) {
      setWidgetKey((prev) => prev + 1);
    }
  }, [visible]);

  useEffect(() => {
    if (paymentMethodWidgetControl && agreementWidgetControl) {
      setIsWidgetReady(true);
    } else {
      setIsWidgetReady(false);
    }
  }, [paymentMethodWidgetControl, agreementWidgetControl]);

  const handlePayment = async () => {
    if (!isWidgetReady) {
      Alert.alert('알림', '결제 위젯이 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    if (!paymentMethodWidgetControl || paymentWidgetControl == null) {
      Alert.alert('오류', '결제위젯이 초기화되지 않았습니다.');
      return;
    }

    if (agreementWidgetControl) {
      try {
        const agreement = await agreementWidgetControl.getAgreementStatus();
        if (agreement.agreedRequiredTerms !== true) {
          Alert.alert('약관 동의', '필수 약관에 동의해주세요.');
          return;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('약관 확인 중 오류:', error);
      }
    }

    setIsLoading(true);

    try {
      const result = await paymentWidgetControl.requestPayment?.({
        orderId: paymentData.orderId,
        orderName: paymentData.orderName,
        appScheme: 'kkukmoa://',
      });

      if (result?.success) {
        onPaymentSuccess(result.success);
      } else if (result?.fail) {
        Alert.alert('결제 실패', result.fail.message);
      }
    } catch (error) {
      Alert.alert('결제 오류', error.message || '결제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = (() => {
    if (isLoading) return '결제 진행 중...';
    if (!isWidgetReady) return '위젯 로딩 중...';
    return '결제하기';
  })();

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.title}>결제하기</Text>
            <Text style={styles.orderInfo}>주문명: {paymentData.orderName}</Text>
            <Text style={styles.amountInfo}>결제금액: {paymentData.amount.toLocaleString()}원</Text>
          </View>

          <View style={styles.content}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator
              keyboardShouldPersistTaps="handled"
            >
              {/* 결제수단 섹션 */}
              <View style={styles.paymentMethodSection}>
                <PaymentMethodWidget
                  key={widgetKey}
                  selector="payment-methods"
                  onLoadEnd={() => {
                    paymentWidgetControl
                      .renderPaymentMethods(
                        'payment-methods',
                        { value: paymentData.amount },
                        {
                          variantKey: 'DEFAULT',
                        },
                      )
                      .then((control) => {
                        setPaymentMethodWidgetControl(control);
                      })
                      .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.error('결제 위젯 렌더링 실패', error);
                      });
                  }}
                  style={[styles.paymentMethodWidget, { height: 400 }]}
                />
              </View>

              {/* 약관 섹션 */}
              <View style={styles.agreementSection}>
                <AgreementWidget
                  key={widgetKey}
                  selector="agreement"
                  onLoadEnd={() => {
                    paymentWidgetControl
                      ?.renderAgreement('agreement', { variantKey: 'DEFAULT' })
                      .then((control) => {
                        setAgreementWidgetControl(control);
                      })
                      .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.error('AgreementWidget 렌더링 실패:', error);
                      });
                  }}
                  style={styles.agreementWidget}
                />
              </View>
            </ScrollView>
          </View>

          {/* 3. 하단 버튼 (고정) */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.payButton, (isLoading || !isWidgetReady) && styles.payButtonDisabled]}
              onPress={handlePayment}
              disabled={isLoading || !isWidgetReady}
            >
              <Text style={styles.payButtonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
