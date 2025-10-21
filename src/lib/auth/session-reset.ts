export function resetSession() {
  if (typeof window === 'undefined') return;
  
  // Clear all auth-related storage
  const keysToRemove: string[] = [];
  
  // Local Storage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.includes('next-auth') || key.includes('session') || key.includes('auth'))) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  // Session Storage
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && (key.includes('next-auth') || key.includes('session') || key.includes('auth'))) {
      sessionStorage.removeItem(key);
    }
  }
  
  // Clear cookies (for NextAuth)
  document.cookie.split(';').forEach(cookie => {
    const [name] = cookie.trim().split('=');
    if (name.includes('next-auth') || name.includes('session')) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });
  
  console.log('🧹 Session storage cleared');
}