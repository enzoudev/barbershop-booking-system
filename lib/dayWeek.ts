import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function generateDays () {
  const dias = [];
  for (let i = 0; i < 7; i++) {
    const data = addDays(new Date(), i);
    dias.push({
      dataISO: format(data, 'yyyy-MM-dd'), 
      diaSemana: format(data, 'EEE', { locale: ptBR }), 
      diaMes: format(data, 'dd'), 
    });
  }
  return dias;
};