export default function shortAddress(address) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}
