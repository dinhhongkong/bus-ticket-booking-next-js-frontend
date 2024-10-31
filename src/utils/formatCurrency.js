export function formatCurrency(amount, currency = 'đ', locale = 'vi-VN') {
  // Kiểm tra nếu amount không phải là số
  if (typeof amount !== 'number') {
    console.warn('formatCurrency: amount is not a number');
    return '0đ';
  }

  // Làm tròn số đến 2 chữ số thập phân
  const roundedAmount = Math.round(amount * 100) / 100;

  // Sử dụng Intl.NumberFormat để định dạng số
  const formatter = new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Định dạng số và thêm đơn vị tiền tệ
  return `${formatter.format(roundedAmount)}${currency}`;
}