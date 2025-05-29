/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/app/Login',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 