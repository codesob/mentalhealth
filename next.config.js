module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'], // Replace with your image domain if needed
  },
  env: {
    API_URL: process.env.API_URL, // Example of setting environment variables
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react/jsx-runtime': require.resolve('react/jsx-runtime'),
      'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime'),
    };
    return config;
  },
};