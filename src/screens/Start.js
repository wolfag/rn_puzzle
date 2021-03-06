import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import PropTypes from 'prop-types';

import Button from '../components/Button';
import Toggle from '../components/Toggle';
import Logo from '../components/Logo';

import sleep from '../utils/sleep';
import configureTransition from '../utils/configureTransition';

const BOARD_SIZES = [3, 4, 5, 6, 7, 8];

const State = {
  Launching: 'Launching',
  WillTransitionIn: 'WillTransitionIn',
  WillTransitionOut: 'WillTransitionOut',
};

export default class Start extends React.Component {
  static propTypes = {
    onChangeSize: PropTypes.func.isRequired,
    onStartGame: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
  };

  state = {
    transitionState: State.Launching,
  };

  toggleOpacity = new Animated.Value(0);

  buttonOpacity = new Animated.Value(0);

  async componentDidMount() {
    await sleep(500);

    await configureTransition(() => {
      this.setState({ transitionState: State.WillTransitionIn });
    });

    Animated.timing(this.toggleOpacity, {
      toValue: 1,
      duration: 500,
      delay: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(this.buttonOpacity, {
      toValue: 1,
      duration: 500,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  }

  handlePressStart = async () => {
    const { onStartGame } = this.props;

    await configureTransition(() => {
      this.setState({ transitionState: State.WillTransitionOut });
    });

    onStartGame();
  };

  render() {
    const { size, onChangeSize } = this.props;
    const { transitionState } = this.state;

    const toggleStyle = { opacity: this.toggleOpacity };
    const buttonStyle = { opacity: this.buttonOpacity };

    return (
      transitionState !== State.WillTransitionOut && (
        <View style={styles.container}>
          <View style={styles.logo}>
            <Logo />
          </View>
          {transitionState !== State.Launching && (
            <Animated.View style={toggleStyle}>
              <Toggle
                options={BOARD_SIZES}
                value={size}
                onChange={onChangeSize}
              />
            </Animated.View>
          )}
          {transitionState !== State.Launching && (
            <Animated.View style={buttonStyle}>
              <Button title="Start Game" onPress={this.handlePressStart} />
            </Animated.View>
          )}
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    alignSelf: 'stretch',
    paddingHorizontal: 40,
  },
});
