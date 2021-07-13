export default function shortAddress(address) {
  return `${address.slice(0, 3)}..${address.slice(-3)}`
}
