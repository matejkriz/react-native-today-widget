// @flow
import * as React from 'react';
import {
  TouchableOpacity,
  NativeModules,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TextButton from './TextButton';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type DevMenuProps = {
  children?: React.Node,
  style?: StyleObj,
  title?: string,
};

type DevMenuState = {
  isDebuggingRemotely: boolean,
  isOpen: boolean,
};

const isDebuggingRemotelyActive = () => typeof importScripts === 'function';

class DevMenu extends React.Component<DevMenuProps, DevMenuState> {
  constructor(props: DevMenuProps) {
    super(props);

    this.state = {
      isDebuggingRemotely: isDebuggingRemotelyActive(),
      isOpen: false,
    };
  }

  componentDidUpdate(prevProps: DevMenuProps, prevState: DevMenuState) {
    const { isDebuggingRemotely } = this.state;
    if (isDebuggingRemotely !== prevState.isDebuggingRemotely) {
      NativeModules.DevSettings.setIsDebuggingRemotely(isDebuggingRemotely);
    }
  }

  render() {
    const { children, style, title } = this.props;
    const { isDebuggingRemotely, isOpen } = this.state;
    const { DevSettings } = NativeModules;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={style || styles.button}
          onPress={() => this.setState({ isOpen: !isOpen })}
        >
          {children || <Text style={styles.buttonText}>{title || 'DM'}</Text>}
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.containerInner}>
            <TextButton title="Reload!" onPress={() => DevSettings.reload()} />
            <TextButton
              title={`Debug JS ${isDebuggingRemotely ? 'stop' : 'start'}`}
              onPress={() =>
                this.setState({ isDebuggingRemotely: !isDebuggingRemotely })
              }
            />
            <TextButton
              title="Live reload start"
              onPress={() => DevSettings.setLiveReloadEnabled(true)}
            />
            <TextButton
              title="Live reload stop"
              onPress={() => DevSettings.setLiveReloadEnabled(false)}
            />
            <TextButton
              title="HMR start"
              onPress={() => DevSettings.setHotLoadingEnabled(true)}
            />
            <TextButton
              title="HMR stop"
              onPress={() => DevSettings.setHotLoadingEnabled(false)}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 2,
  },
  buttonText: {
    opacity: 0.5,
  },
  container: {
    flex: 1,
    left: 0,
    position: 'absolute',
    top: 0,
  },
  containerInner: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    left: 30,
    position: 'absolute',
    top: 0,
    width: 300,
  },
});

export default DevMenu;
