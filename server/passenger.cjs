// Passenger/cPanel safe bootstrap for ESM server entry.
// Some Passenger setups still load startup files through CommonJS require().
import('./index.js').catch((error) => {
  console.error('Failed to boot ESM server entry:', error)
  process.exit(1)
})
