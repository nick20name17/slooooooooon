/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'teashopfrankfurt.s3.amazonaws.com',
                port: '',
                pathname: '/static/products/**'
            }
        ]
    }
}

export default nextConfig
