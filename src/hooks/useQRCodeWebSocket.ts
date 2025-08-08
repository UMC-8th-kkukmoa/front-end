import { useEffect, useRef } from 'react';
import * as Keychain from 'react-native-keychain';

interface CouponWebSocketMessage {
  is_success: boolean;
  discount_amount: number;
  qr_info: string;
  qr_type: string;
  redirect_uri: string;
  [key: string]: any;
}

const useQRCodeWebSocket = (onScanResult: (qrInfo: string) => void) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const connectWebSocket = async () => {
      try {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL || 'https://kkukmoa.shop';

        const credentials = await Keychain.getGenericPassword({
          service: 'com.kkukmoa.accessToken',
        });
        const token = credentials ? credentials.password : null;

        // React Native WebSocket API는 커스텀 헤더를 지원하지 않아 토큰을 받아야 하면 URL 쿼리에 노출하는 수밖에 없음
        const wsUrl = `${baseUrl.replace(/^https?/, 'ws')}/ws${token ? `?token=${token}` : ''}`;

        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
          if (!isMounted.current) return;
          console.log('WebSocket connected');
        };

        ws.current.onmessage = (event: MessageEvent) => {
          try {
            const data: CouponWebSocketMessage = JSON.parse(event.data);
            console.log('WebSocket data:', data);

            if (data.is_success && data.qr_type === 'COUPON' && data.qr_info) {
              onScanResult(data.qr_info);
            }
          } catch (error) {
            if (!__DEV__ && error instanceof Error) {
              // TODO: 에러 리포팅 서비스 호출 (ex. Sentry.captureException(error))
            }
            console.error('Failed to parse WebSocket message:', error);
          }
        };

        ws.current.onerror = (error) => {
          if (!isMounted.current) return;
          console.error('WebSocket error:', error);
        };

        ws.current.onclose = () => {
          if (!isMounted.current) return;
          console.log('WebSocket disconnected');

          reconnectTimeout.current = setTimeout(() => {
            if (isMounted.current) {
              connectWebSocket();
            }
          }, 3000);
        };
      } catch (e) {
        console.error('WebSocket connection failed:', e);

        if (isMounted.current) {
          reconnectTimeout.current = setTimeout(() => {
            connectWebSocket();
          }, 3000);
        }
      }
    };

    connectWebSocket();

    return () => {
      isMounted.current = false;
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      ws.current?.close();
    };
  }, [onScanResult]);
};

export default useQRCodeWebSocket;
