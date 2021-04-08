import { AppState } from 'react-native';

export const createAppStateChangeWatcher = ({ onChangeAppState }) => {
  return {
    handler: (nextAppState) => {
      if (nextAppState === 'active') {
        onChangeAppState();
      }
    },

    addOnChangeListener: function () {
      AppState.addEventListener('change', this.handler);
    },
    removeOnChangeListener: function () {
      AppState.removeEventListener('change', this.handler);
    },
  };
};
