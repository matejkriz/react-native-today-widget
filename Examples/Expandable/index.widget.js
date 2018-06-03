import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

import { setExpandable } from "react-native-today-widget";

class ExpandableTodayWidget extends Component {
  constructor() {
    super();
    const isExpandable = true;
    const maxHeight = 500;
    setExpandable(isExpandable, maxHeight);
    this.onLayout = event => {
      const height = event.nativeEvent.layout.height;
      if (height <= 110) {
        console.log("widget is in compact mode");
      } else if (height > 110) {
        console.log("widget is in expanded mode");
      }
    };
  }

  render() {
    return (
      <View onLayout={this.onLayout} style={styles.widget}>
        <Text style={styles.welcome}>
          Hello expandable world!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  widget: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

AppRegistry.registerComponent(
  "TodayWidgetExtension",
  () => ExpandableTodayWidget
);
