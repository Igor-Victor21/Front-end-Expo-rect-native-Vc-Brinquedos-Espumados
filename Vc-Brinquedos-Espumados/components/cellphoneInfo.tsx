import * as Battery from 'expo-battery';
import * as Network from 'expo-network';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ErrorScreen() {
  const [time, setTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // atualiza a cada minuto

    (async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level);
      const network = await Network.getNetworkStateAsync();
      setIsConnected(network.isConnected ?? false);
    })();

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      {/* STATUS BAR CUSTOMIZADA */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>{time}</Text>
        <View style={styles.statusIcons}>
          <Image 
            source={isConnected ? require('../assets/image/Wifi.png') : '❌'}
            style={styles.img}
          />
          <View style={styles.batteryContainer}>
            <Image source={require('../assets/image/Battery.png')} style={styles.img}/>
            <Text>
              {batteryLevel !== null ? `${Math.round(batteryLevel * 100)}%` : '...'}
            </Text>
          </View>
          {/* <Text>{isConnected ? '📶' : '❌'}</Text>
          <Text>🔋{batteryLevel !== null ? `${Math.round(batteryLevel * 100)}%` : '...'}</Text> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: 40,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  img: {
    height: 10,
    width: 10
  },
  batteryContainer: {
     flexDirection: 'row',
    alignItems: 'center'
  }
})