const _initializeEnv = () => {
  return window.location.hostname === 'localhost' ? 'LOCAL' : window.location.host.indexOf('stage') > -1 ? 'STAGE' : window.location.host.indexOf('-pp') > -1 ? 'PREPROD' : 'PROD';
};

const _isLocalHost = () => window.location.hostname === 'localhost';

export default {
  CURR_ENV: _initializeEnv(),
  isLocalHost: _isLocalHost()
};
