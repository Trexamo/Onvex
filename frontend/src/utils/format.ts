export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const formatPhone = (phone: string): string => {
  return phone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '() -');
};

export const formatCPF = (cpf: string): string => {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '..-');
};
