import { LayoutAnimation, Platform } from 'react-native';

const DURATION = 750;

export default function configureTransition(onConfigured = () => {}) {
  const animation = LayoutAnimation.create(
    DURATION,
    LayoutAnimation.Types.easeInEaseOut,
    LayoutAnimation.Properties.opacity,
  );

  const promise = new Promise(resolve => {
    // Workaround for missing LayoutAnimation callback support on Android
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext(animation);
      setTimeout(resolve, DURATION);
    } else {
      LayoutAnimation.configureNext(animation, resolve);
    }
  });

  onConfigured();

  return promise;
}
