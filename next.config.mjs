import withPWAInit from "@ducanh2912/next-pwa"
/** @type {import('next').NextConfig} */

const withPWA = withPWAInit({
  dest: "public"
})

export default withPWA({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
      },
    ],
  },
});
