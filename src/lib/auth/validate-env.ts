// Environment validation for NextAuth
export function validateAuthEnvironment() {
    const requiredVars = [
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'NEXTAUTH_SECRET',
        'NEXTAUTH_URL'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);

    if (missing.length > 0) {
        console.error('Missing required environment variables:', missing);
        return false;
    }

    // Check for common formatting issues
    if (process.env.GOOGLE_CLIENT_ID?.includes(' ')) {
        console.error('GOOGLE_CLIENT_ID contains spaces - check .env.local formatting');
        return false;
    }

    if (process.env.GOOGLE_CLIENT_SECRET?.includes(' ')) {
        console.error('GOOGLE_CLIENT_SECRET contains spaces - check .env.local formatting');
        return false;
    }

    console.log('✅ All auth environment variables are properly configured');
    return true;
}