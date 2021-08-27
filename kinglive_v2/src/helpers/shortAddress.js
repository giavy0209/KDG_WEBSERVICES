export default function shortAddress(address) {
  if (!address) return '0x0\u2026000'
  return `${address.slice(0, 3)}\u2026${address.slice(-3)}`
}
