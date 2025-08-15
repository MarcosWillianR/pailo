export const normalizePhoneNumber = (value: string | undefined, withCountryCode = false) => {
  if (!value) return '';

  const cleaned = value.replace(/\D/g, '');

  if (withCountryCode) {
    return cleaned
      .replace(/(\d{2})(\d{2})(\d)/, '+$1 ($2) $3')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})(\d+?)/, '$1');
  }

  return cleaned
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1');
};

export const normalizeCnpjNumber = (value: string | undefined) => {
  if (!value) return '';

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const normalizeCpfNumber = (value: string | undefined) => {
  if (!value) return '';

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{2})$/, '$1-$2');
};

export const normalizeCurrency = (value: string | undefined) => {
  if (!value) return '';

  return value
    .replace(/\D/g, '')
    .replace(/(\d{1,2})$/, ',$1')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const normalizeDate = (value: string | undefined) => {
  if (!value) return '';

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d+?$/, '$1');
};

export const normalizeCepNumber = (value: string | undefined) => {
  if (!value) return '';
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d{3})+?$/, '$1-$2')
    .replace(/(-\d{3})(\d+?)/, '$1');
};

export const removeNonNumeric = (value: string | undefined) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};

export const formatPriceForBackend = (price: string) => {
  return parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.'));
};

export const formatBackendDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};
