import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL || 'https://kkukmoa.shop';
    const wsUrl = `${baseUrl.replace(/^https?/, 'wss')}/ws`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      // eslint-disable-next-line no-console
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const data: CouponWebSocketMessage = JSON.parse(event.data);
        // eslint-disable-next-line no-console
        console.log('WebSocket data:', data);

        if (data.is_success && data.qr_type === 'COUPON' && data.qr_info) {
          onScanResult(data.qr_info);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.current.onerror = (error) => {
      // eslint-disable-next-line no-console
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      // eslint-disable-next-line no-console
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.current?.close();
    };
  }, [onScanResult]);
};

export default useQRCodeWebSocket;
