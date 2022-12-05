const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@shared': 'src/components/Shared',
    '@atoms': 'src/components/Recoil/Atoms',
    '@modals': 'src/components/Shared/Modals',
    '@helpers': 'src/components/helpers',
    '@pages': 'src/components/Pages',
    '@api': 'src/components/api/requests',
    '@core': 'src/components/Core',
    '@data': 'src/components/data',
  })(config);

  return config;
};