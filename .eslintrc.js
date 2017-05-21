module.exports = {
    extends: ['airbnb'],
    parser: 'babel-eslint',
    plugins: [
      'react',
      'react-native'
    ],
    rules: {
      'import/no-unresolved': [2, { ignore: ['^react(-native)?$'] }],
      'import/extensions': [2, { js: 'never', json: 'always' }],
      'react/jsx-filename-extension': 0,
    },
};
