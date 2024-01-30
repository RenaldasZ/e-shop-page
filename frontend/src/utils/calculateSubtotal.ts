export default function calculateSubtotal(value: number, selectedQuantity: number) {
  const result = (value / 100) * selectedQuantity;

  return result;
}
