# React Native Today Widget
> Add iOS Today Widget App Extension to your React Native app


What is [Today Widget](https://developer.apple.com/ios/human-interface-guidelines/extensions/widgets/)?

More about: [iOS App Extensions](https://developer.apple.com/app-extensions/)

## Getting started

This library help you to add iOS Today Widget App Extension without need to open XCode.

### Setup

1. Install it:
```bash
yarn add react-native-today-widget
```
You could use `$ npm i react-native-today-widget --save` as well, but don't forget to save it in `package.json` dependencies. Otherwise it will not link in next step.

2. Link it:
```bash
react-native link
```

3. Register your component for key `TodayWidgetExtension` in your `index.ios.js`
```jsx
AppRegistry.registerComponent('TodayWidgetExtension', () => TodayWidget);
```
In place of `TodayWidget` component, you could use any JSX component. See [HelloToday example](https://github.com/matejkriz/react-native-today-widget/blob/master/Examples/HelloToday/index.ios.js#L30).

4. Run it:
```bash
react-native run-ios
```

5. Display new widget on Search screen or by force touch on your app icon.


### Notes
- Look at the [Examples/HelloToday](https://github.com/matejkriz/react-native-today-widget/tree/master/Examples/HelloToday). Only changes from output of `react-native init` are in `package.json` and `index.ios.js` files.
- For recomended transparent background simply don't set any `backgroundColor` for your Today Widget component.
- [Human Interface Guidelines](https://developer.apple.com/ios/human-interface-guidelines/extensions/widgets/)
- Today Widget content will reload when you leave search screen and go back.

### TODO
- [x] Set Bundle Identifier by the main app in postinstall.

- [x] Embed Extensions binary to the main app in postlink.

- [ ] Enhance documentation.
  - [ ] Add screenshots.
  - [ ] Describe manual linking.
  - [ ] Describe usage of provided scripts.


- [ ] Enable to set Display Name for the extension.

- [ ] Implement Show More/Less button.

- [ ] Implement link to main app.

- [ ] Implement conditional displaying of the widget.

- [ ] Enable splitting the code for main app and the widget.

- [ ] Describe how to share data between the widget and the app.

- [ ] Describe error handling and debugging.

- [ ] Provide component to fake search screen in main app during widget development.
