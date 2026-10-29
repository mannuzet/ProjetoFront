
export const CADASTROS = {
  safras: {
    titulo: 'Safras',
    campos: [
      {
        nome: 'NomeSafra',
        rotulo: 'Nome da safra',
        tipo: 'text',
        obrigatorio: true,
      },
      {
        nome: 'DataInicio',
        rotulo: 'Data de início',
        tipo: 'date',
        obrigatorio: true,
      },
      {
        nome: 'DataFim',
        rotulo: 'Data de fim',
        tipo: 'date',
        obrigatorio: true,
      },
    ],
  },

  unidades: {
    titulo: 'Unidades',
    campos: [
      {
        nome: 'Nome',
        rotulo: 'Nome',
        tipo: 'text',
        obrigatorio: true,
      },
    ],
  },

  unidadesMedida: {
    titulo: 'Unidades de medida',
    campos: [
      {
        nome: 'Nome',
        rotulo: 'Nome',
        tipo: 'text',
        obrigatorio: true,
      },
      {
        nome: 'Simbolo',
        rotulo: 'Símbolo',
        tipo: 'text',
        obrigatorio: true,
      },
    ],
  },

  equipamentos: {
    titulo: 'Equipamentos',
    campos: [
      {
        nome: 'Nome',
        rotulo: 'Nome',
        tipo: 'text',
        obrigatorio: true,
      },
      {
        nome: 'UnidadeId',
        rotulo: 'Unidade',
        tipo: 'select',
        origem: 'unidades',
        obrigatorio: true,
      },
    ],
  },

  tiposInformacao: {
    titulo: 'Tipos de informação',
    campos: [
      {
        nome: 'Nome',
        rotulo: 'Nome',
        tipo: 'text',
        obrigatorio: true,
      },
      {
        nome: 'UnidadeMedidaId',
        rotulo: 'Unidade de medida',
        tipo: 'select',
        origem: 'unidadesMedida',
        obrigatorio: true,
      },
    ],
  },

  medicoes: {
    titulo: 'Medições',
    campos: [
      {
        nome: 'SafraId',
        rotulo: 'Safra',
        tipo: 'select',
        origem: 'safras',
        obrigatorio: true,
      },
      {
        nome: 'EquipamentoId',
        rotulo: 'Equipamento',
        tipo: 'select',
        origem: 'equipamentos',
        obrigatorio: true,
      },
      {
        nome: 'TipoInformacaoId',
        rotulo: 'Tipo de informação',
        tipo: 'select',
        origem: 'tiposInformacao',
        obrigatorio: true,
      },
      {
        nome: 'Valor',
        rotulo: 'Valor',
        tipo: 'number',
        obrigatorio: true,
      },
      {
        nome: 'Data',
        rotulo: 'Data e hora',
        tipo: 'datetime-local',
        obrigatorio: true,
      },
    ],
  },
}
