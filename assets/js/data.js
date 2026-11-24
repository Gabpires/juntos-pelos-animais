window.SITE_DATA = Object.freeze({
  prototype: {
    label: 'Protótipo demonstrativo',
    note: 'Conteúdo, valores, contatos e registros apresentados exclusivamente para validação do projeto.'
  },
  contact: {
    whatsappNumber: '5500000000000',
    whatsappDisplay: '(00) 00000-0000',
    email: 'prototipo@exemplo.org',
    instagramUrl: 'https://www.instagram.com/',
    instagramLabel: '@juntospelosanimais.demo',
    facebookUrl: 'https://www.facebook.com/',
    facebookLabel: 'Juntos pelos Animais — demonstração',
    location: 'Araçariguama/SP',
    serviceNote: 'Atendimento realizado por voluntários. O retorno pode acontecer em até dois dias úteis.'
  },
  pix: {
    key: 'pix.demo@exemplo.org',
    beneficiary: 'Juntos pelos Animais — demonstração',
    bank: 'Instituição fictícia',
    qrImage: 'assets/images/qr-demo.svg'
  },
  helpOptions: [
    {
      icon: 'fa-calendar-check',
      title: 'Seja um apoiador mensal',
      description: 'Ajude a manter alimentação e cuidados recorrentes.',
      href: '#contato'
    },
    {
      icon: 'fa-box-open',
      title: 'Doe ração e materiais',
      description: 'Entregue itens essenciais em nosso ponto parceiro.',
      href: '#ponto-coleta'
    },
    {
      icon: 'fa-people-group',
      title: 'Seja voluntário ou parceiro',
      description: 'Compartilhe tempo, serviço ou estrutura com a iniciativa.',
      href: '#contato'
    }
  ],
  needs: [
    { icon: 'fa-bowl-food', label: 'Ração para cães e gatos' },
    { icon: 'fa-prescription-bottle-medical', label: 'Medicamentos veterinários' },
    { icon: 'fa-rug', label: 'Cobertores' },
    { icon: 'fa-pump-soap', label: 'Produtos de higiene' }
  ],
  campaign: {
    active: true,
    title: 'Ração e cuidados veterinários',
    raised: 3250,
    goal: 5000,
    updatedAt: '22 de novembro de 2026'
  },
  collectionPoint: {
    name: 'Vidraçaria Portal — Ponto Parceiro',
    address: 'Rua das Acácias, 120 — Centro, Araçariguama/SP',
    addressNote: 'Endereço demonstrativo',
    hours: 'Segunda a sexta, das 8h às 17h; sábado, das 9h às 12h',
    materials: 'Rações lacradas, cobertores, produtos de higiene e materiais de limpeza.',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Ara%C3%A7ariguama%2C%20SP',
    mapUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-47.095%2C-23.457%2C-47.035%2C-23.407&layer=mapnik&marker=-23.432%2C-47.065'
  },
  accountabilityRecords: [
    {
      id: 'alimentacao',
      category: 'Alimentação',
      date: '18 de novembro de 2026',
      title: 'Compra e distribuição de ração',
      summary: 'Reposição do estoque e distribuição para lares temporários e animais acompanhados pelo grupo.',
      value: 850,
      result: '100 kg de ração adquiridos',
      image: 'assets/images/accountability-food.png',
      alt: 'Voluntária distribuindo ração para cães resgatados em espaço comunitário',
      description: 'A contribuição foi utilizada na compra de ração seca para cães adultos e filhotes. Os pacotes foram separados e distribuídos entre lares temporários e pontos de alimentação acompanhados pelos voluntários.',
      gallery: [
        { src: 'assets/images/accountability-food.png', alt: 'Distribuição de ração para cães resgatados' },
        { src: 'assets/images/community-action.png', alt: 'Voluntários organizando sacos de ração doada' },
        { src: 'assets/images/accountability-comfort.png', alt: 'Animais acolhidos após a entrega de itens essenciais' }
      ],
      receipt: 'Cupom demonstrativo nº 0187 — 10 sacos de ração — R$ 850,00'
    },
    {
      id: 'saude',
      category: 'Saúde animal',
      date: '10 de novembro de 2026',
      title: 'Medicamentos e tratamentos veterinários',
      summary: 'Aquisição de medicamentos e apoio a consultas para animais em acompanhamento.',
      value: 620,
      result: '4 animais beneficiados',
      image: 'assets/images/accountability-vet.png',
      alt: 'Cão resgatado recebendo medicação com acompanhamento veterinário',
      description: 'O valor cobriu medicamentos prescritos, uma consulta de retorno e exames básicos. A ação priorizou quatro animais que já estavam sob acompanhamento de lares temporários.',
      gallery: [
        { src: 'assets/images/accountability-vet.png', alt: 'Atendimento veterinário de um cão resgatado' },
        { src: 'assets/images/accountability-vaccine.png', alt: 'Ação comunitária de cuidado preventivo para um gato' }
      ],
      receipt: 'Recibo demonstrativo nº 0241 — consultas e medicamentos — R$ 620,00'
    },
    {
      id: 'bem-estar',
      category: 'Bem-estar',
      date: '29 de outubro de 2026',
      title: 'Materiais de higiene e conforto',
      summary: 'Compra de itens para deixar os espaços de acolhimento mais seguros, limpos e confortáveis.',
      value: 380,
      result: 'Cobertores, caminhas e produtos de limpeza',
      image: 'assets/images/accountability-comfort.png',
      alt: 'Cães e gato acomodados em cobertores e caminhas doados',
      description: 'Foram adquiridos cobertores laváveis, caminhas, desinfetante de uso veterinário e materiais de limpeza para dois espaços de acolhimento temporário.',
      gallery: [
        { src: 'assets/images/accountability-comfort.png', alt: 'Animais usando cobertores e caminhas novas' },
        { src: 'assets/images/accountability-shelter.png', alt: 'Voluntários organizando um espaço de acolhimento' }
      ],
      receipt: 'Nota demonstrativa nº 0318 — itens de higiene e conforto — R$ 380,00'
    },
    {
      id: 'prevencao',
      category: 'Prevenção',
      date: '20 de outubro de 2026',
      title: 'Ação de vacinação e prevenção',
      summary: 'Atendimento preventivo e atualização de cuidados básicos para animais acolhidos.',
      value: 540,
      result: '8 animais atendidos',
      image: 'assets/images/accountability-vaccine.png',
      alt: 'Veterinária e voluntária atendendo gato em ação preventiva',
      description: 'A ação reuniu avaliação clínica simples, orientação aos lares temporários e aplicação de cuidados preventivos conforme indicação profissional.',
      gallery: [
        { src: 'assets/images/accountability-vaccine.png', alt: 'Gato sendo avaliado em ação comunitária' },
        { src: 'assets/images/accountability-vet.png', alt: 'Cão recebendo cuidado veterinário' }
      ],
      receipt: 'Recibo demonstrativo nº 0196 — cuidados preventivos — R$ 540,00'
    },
    {
      id: 'abrigo',
      category: 'Estrutura',
      date: '8 de outubro de 2026',
      title: 'Melhorias no acolhimento temporário',
      summary: 'Organização e manutenção de uma área segura para cães em recuperação.',
      value: 470,
      result: '2 espaços reorganizados',
      image: 'assets/images/accountability-shelter.png',
      alt: 'Voluntários limpando e organizando espaço de acolhimento para cães',
      description: 'Os recursos apoiaram a compra de utensílios de limpeza, recipientes de água e pequenos reparos em dois espaços cedidos temporariamente por apoiadores.',
      gallery: [
        { src: 'assets/images/accountability-shelter.png', alt: 'Organização de área de acolhimento para cães' },
        { src: 'assets/images/community-action.png', alt: 'Equipe voluntária em atividade comunitária' }
      ],
      receipt: 'Nota demonstrativa nº 0142 — manutenção e utensílios — R$ 470,00'
    }
  ],
  animal: {
    name: 'Pipoca',
    traits: ['Porte médio', 'Adulta', 'Vacinada', 'Castrada'],
    status: 'Disponível para adoção',
    image: 'assets/images/adoption-pipoca.png',
    alt: 'Pipoca, cadela caramelo e branca de porte médio, ao lado de uma voluntária'
  },
  faq: [
    {
      question: 'Como posso adotar um animal?',
      answer: 'Entre em contato pelo canal demonstrativo de WhatsApp. A equipe explica o processo, apresenta os animais e combina uma conversa de adoção responsável.'
    },
    {
      question: 'Como posso fazer uma doação?',
      answer: 'Neste protótipo, você pode simular a cópia da chave Pix ou consultar as opções de doação de materiais. Nenhuma transação real é realizada.'
    },
    {
      question: 'Quais materiais posso doar?',
      answer: 'Rações lacradas, medicamentos dentro da validade e com orientação, cobertores limpos, caminhas e produtos de higiene estão entre os itens mais úteis.'
    },
    {
      question: 'Onde posso entregar minhas doações?',
      answer: 'O ponto parceiro demonstrativo fica no Centro de Araçariguama. Confirme sempre o horário e a necessidade atual antes da entrega.'
    },
    {
      question: 'Como posso ser voluntário?',
      answer: 'Você pode apoiar em campanhas, transporte, comunicação, organização de doações ou oferecer um serviço profissional. Fale com a equipe para combinar a melhor forma.'
    },
    {
      question: 'Como informar uma situação de abandono ou maus-tratos?',
      answer: 'Em uma situação real, registre evidências com segurança e acione os canais públicos competentes. Este site é demonstrativo e não recebe denúncias.'
    },
    {
      question: 'Como acompanho a utilização das doações?',
      answer: 'A seção Sua ajuda em ação reúne registros demonstrativos com data, valor utilizado, resultado e comprovante ilustrativo.'
    }
  ]
});

