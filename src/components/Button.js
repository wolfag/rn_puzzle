import React from 'react';
import {
  ColorPropType,
  StyleSheet,
  TouchableWithoutFeedback,
  Easing,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';

const getValue = (pressed, disabled) => {
  const [base, delta] = disabled ? [0.5, 0.1] : [1, 0.3];

  return pressed ? base - delta : base;
};

const BaseColor = 'white';

export default class Button extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    height: PropTypes.number,
    color: ColorPropType,
    fontSize: PropTypes.number,
    borderRadius: PropTypes.number,
  };

  static defaultProps = {
    onPress: () => {},
    disabled: false,
    height: null,
    color: '#0ce1c2',
    fontSize: 24,
    borderRadius: 100,
  };

  constructor(props) {
    super(props);

    const { disabled } = props;

    this.state = { pressed: false };
    this.value = new Animated.Value(getValue(false, disabled));
  }

  componentWillUpdate(nextProps, nextState) {
    this.updateValue(nextProps, nextState);
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.updateValue(nextProps, nextState);
  }

  updateValue(nextProps, nextState) {
    if (
      this.props.disabled !== nextProps.disabled
      || this.state.pressed !== nextState.pressed
    ) {
      Animated.timing(this.value, {
        duration: 200,
        toValue: getValue(nextState.pressed, nextProps.disabled),
        easing: Easing.out(Easing.quad),
      }).start();
    }
  }

  handlePressIn = () => {
    this.setState({ pressed: true });
  };

  handlePressOut = () => {
    this.setState({ pressed: false });
  };

  render() {
    const {
      title,
      height,
      onPress,
      color,
      borderRadius,
      fontSize,
    } = this.props;

    const animatedButtonColor = this.value.interpolate({
      inputRange: [0, 1],
      outputRange: [BaseColor, color],
    });

    const animatedTitleColor = this.value.interpolate({
      inputRange: [0, 1],
      outputRange: [color, BaseColor],
    });

    const animatedScale = this.value.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    });

    const containerStyle = {
      borderColor: animatedButtonColor,
      borderRadius,
      height,
      transform: [{ scale: animatedScale }],
    };

    const titleStyle = {
      color: animatedTitleColor,
      fontSize,
    };

    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Animated.View style={[styles.container, containerStyle]}>
          <Animated.Text style={[styles.title, titleStyle]}>
            {title}
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f1e2a',
    borderWidth: 2,
  },
  title: {
    backgroundColor: 'transparent',
    fontSize: 24,
  },
});
