import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAuthStore } from '../store/authStore';
import { BASE_URL } from '../constants';

export const useOrderSocket = (callback) => {
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    if (!token) return;

    // Use common WS endpoint from WebSocketConfig.java
    const socketUrl = BASE_URL.replace('/api', '/ws');
    const socket = new SockJS(socketUrl);
    const stompClient = Stomp.over(socket);
    
    // Disable logging for cleaner console
    stompClient.debug = null;

    const connectCallback = () => {
      // Subscribe to order updates
      stompClient.subscribe('/topic/orders', (message) => {
        if (message.body) {
          const orderUpdate = JSON.parse(message.body);
          callback(orderUpdate);
        }
      });
    };

    const errorCallback = (error) => {
      console.error('WebSocket connection error:', error);
    };

    stompClient.connect({ Authorization: `Bearer ${token}` }, connectCallback, errorCallback);

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, [token, callback]);
};
