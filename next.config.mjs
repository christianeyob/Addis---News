/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.addisinsight.net',
                port: '',
                pathname: '/**', // Allow any path under this hostname
            },
            {
                protocol: 'https',
                hostname: 'about.fb.com',
                port: '',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**', // Allow any path under this hostname
            },
            {
                protocol: 'https',
                hostname: 'media.istockphoto.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
                port: '',
                pathname: '/**',
              },
            {
                protocol: 'https',
                hostname: 'i0.wp.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'thereporterethiopia.com',
                port: '',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.thereporterethiopia.com',
                port: '',
                pathname: '/**', // Allow any path under this hostname
            },
        ],
    }
};

export default nextConfig;
