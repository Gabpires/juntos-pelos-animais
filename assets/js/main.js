(function () {
  'use strict';

  var data = window.SITE_DATA;

  if (!data) {
    console.error('Não foi possível carregar os dados do protótipo.');
    return;
  }

  var currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  function query(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function queryAll(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function makeElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (typeof text === 'string') element.textContent = text;
    return element;
  }

  function setText(selector, value) {
    var element = query(selector);
    if (element) element.textContent = value;
  }

  function setLogoFallback() {
    queryAll('[data-brand-image]').forEach(function (image) {
      var fallback = image.parentElement.querySelector('[data-brand-fallback]');

      function showFallback() {
        image.hidden = true;
        if (fallback) fallback.hidden = false;
      }

      image.addEventListener('error', showFallback);
      if (image.complete && image.naturalWidth === 0) showFallback();
    });
  }

  function setupMobileMenu() {
    var toggle = query('#menuToggle');
    var menu = query('#mobileMenu');
    if (!toggle || !menu) return;

    function setMenu(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      menu.hidden = !open;
    }

    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    queryAll('a', menu).forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1120) setMenu(false);
    });
  }

  function setupScrollSpy() {
    var links = queryAll('.nav-link');
    var sections = ['inicio', 'quem-somos', 'como-ajudar', 'transparencia', 'adocao', 'contato']
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

    function markActive(id) {
      links.forEach(function (link) {
        var isActive = link.getAttribute('href') === '#' + id;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    var visibleSections = new Map();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          visibleSections.set(entry.target.id, entry.intersectionRatio);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      if (!visibleSections.size) return;
      var active = Array.from(visibleSections.entries()).sort(function (a, b) { return b[1] - a[1]; })[0];
      markActive(active[0]);
    }, {
      rootMargin: '-28% 0px -58% 0px',
      threshold: [0.02, 0.2, 0.5]
    });

    sections.forEach(function (section) { observer.observe(section); });
  }

  function renderHelpOptions() {
    var container = query('#helpOptions');
    if (!container) return;

    data.helpOptions.forEach(function (option) {
      var link = makeElement('a', 'action-item');
      link.href = option.href;

      var iconWrap = makeElement('span', 'action-item__icon');
      var icon = makeElement('i', 'fa-solid ' + option.icon);
      icon.setAttribute('aria-hidden', 'true');
      iconWrap.appendChild(icon);

      var copy = makeElement('span', 'action-item__copy');
      var title = makeElement('strong', '', option.title);
      var description = makeElement('span', '', option.description);
      copy.appendChild(title);
      copy.appendChild(description);

      var arrow = makeElement('i', 'fa-solid fa-arrow-right');
      arrow.setAttribute('aria-hidden', 'true');

      link.appendChild(iconWrap);
      link.appendChild(copy);
      link.appendChild(arrow);
      container.appendChild(link);
    });
  }

  function renderNeeds() {
    var list = query('#needsList');
    if (!list) return;

    data.needs.forEach(function (need) {
      var item = makeElement('li');
      var icon = makeElement('i', 'fa-solid ' + need.icon);
      icon.setAttribute('aria-hidden', 'true');
      item.appendChild(icon);
      item.appendChild(makeElement('span', '', need.label));
      list.appendChild(item);
    });
  }

  function setupPix() {
    var input = query('#pixKey');
    var button = query('#copyPixButton');
    var feedback = query('#copyFeedback');
    var qrImage = query('#pixQrImage');
    if (!input || !button || !feedback) return;

    input.value = data.pix.key;
    setText('#pixBeneficiary', data.pix.beneficiary);
    setText('#pixBank', data.pix.bank);
    if (qrImage) qrImage.src = data.pix.qrImage;

    function showFeedback(message, state) {
      feedback.textContent = message;
      feedback.className = 'copy-feedback ' + state;
    }

    function fallbackCopy() {
      input.focus();
      input.select();
      input.setSelectionRange(0, input.value.length);
      return document.execCommand('copy');
    }

    button.addEventListener('click', async function () {
      var label = query('span', button);
      button.disabled = true;

      try {
        var copied = false;
        if (navigator.clipboard && window.isSecureContext) {
          try {
            await navigator.clipboard.writeText(data.pix.key);
            copied = true;
          } catch (clipboardError) {
            copied = fallbackCopy();
          }
        } else {
          copied = fallbackCopy();
        }

        if (!copied) throw new Error('copy-command-failed');

        showFeedback('Chave demonstrativa copiada. Nenhuma cobrança foi iniciada.', 'is-success');
        if (label) label.textContent = 'Chave copiada';
      } catch (error) {
        input.focus();
        input.select();
        showFeedback('Não foi possível copiar automaticamente. A chave foi selecionada para cópia manual.', 'is-error');
        if (label) label.textContent = 'Copiar manualmente';
      } finally {
        window.setTimeout(function () {
          button.disabled = false;
          if (label) label.textContent = 'Copiar chave Pix';
        }, 2600);
      }
    });
  }

  function renderCampaign() {
    var campaignElement = query('#campaign');
    var campaign = data.campaign;
    if (!campaignElement) return;

    if (!campaign.active) {
      campaignElement.hidden = true;
      return;
    }

    var percentage = Math.min(100, Math.max(0, Math.round((campaign.raised / campaign.goal) * 100)));
    setText('#campaignTitle', campaign.title);
    setText('#campaignRaised', currency.format(campaign.raised));
    setText('#campaignGoal', currency.format(campaign.goal));
    setText('#campaignUpdated', 'Atualizada em ' + campaign.updatedAt);
    setText('#campaignPercent', percentage + '% da meta');

    var progress = query('#campaignProgress');
    var track = progress ? progress.parentElement : null;
    if (progress) progress.style.width = percentage + '%';
    if (track) track.setAttribute('aria-valuenow', String(percentage));
  }

  function setupCollectionPoint() {
    var point = data.collectionPoint;
    setText('#collectionName', point.name);
    setText('#collectionAddress', point.address);
    setText('#collectionAddressNote', point.addressNote);
    setText('#collectionHours', point.hours);
    setText('#collectionMaterials', point.materials);

    var directions = query('#directionsLink');
    var map = query('#collectionMap');
    if (directions) directions.href = point.directionsUrl;
    if (map) map.src = point.mapUrl;
  }

  function makeRecordCard(record, index) {
    var article = makeElement('article', 'record-card');
    article.dataset.recordId = record.id;
    if (index >= 3) {
      article.dataset.additional = 'true';
      article.hidden = true;
    }

    var figure = makeElement('figure', 'record-card__media');
    var image = document.createElement('img');
    image.src = record.image;
    image.alt = record.alt;
    image.width = 1536;
    image.height = 1024;
    image.loading = 'lazy';
    image.decoding = 'async';
    figure.appendChild(image);

    var body = makeElement('div', 'record-card__body');
    var meta = makeElement('div', 'record-card__meta');
    meta.appendChild(makeElement('span', '', record.category));
    meta.appendChild(makeElement('time', '', record.date));

    var title = makeElement('h3', '', record.title);
    var summary = makeElement('p', 'record-card__summary', record.summary);

    var valueWrap = makeElement('div', 'record-card__value');
    var valueCopy = makeElement('div');
    valueCopy.appendChild(makeElement('span', '', 'Valor utilizado'));
    valueCopy.appendChild(makeElement('strong', '', currency.format(record.value)));
    valueWrap.appendChild(valueCopy);

    var result = makeElement('p', 'record-card__result');
    result.appendChild(makeElement('span', '', 'Resultado'));
    result.appendChild(document.createTextNode(record.result));

    var button = makeElement('button', 'button button--outline', 'Ver detalhes');
    button.type = 'button';
    button.dataset.openRecord = record.id;
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-label', 'Ver detalhes de ' + record.title);

    body.appendChild(meta);
    body.appendChild(title);
    body.appendChild(summary);
    body.appendChild(valueWrap);
    body.appendChild(result);
    body.appendChild(button);
    article.appendChild(figure);
    article.appendChild(body);
    return article;
  }

  function renderRecords() {
    var grid = query('#recordsGrid');
    var toggle = query('#toggleRecordsButton');
    if (!grid) return;

    data.accountabilityRecords.forEach(function (record, index) {
      grid.appendChild(makeRecordCard(record, index));
    });

    if (toggle && data.accountabilityRecords.length <= 3) toggle.hidden = true;
  }

  function setupRecordsToggle() {
    var button = query('#toggleRecordsButton');
    if (!button) return;

    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      var nextState = !expanded;
      var label = query('span', button);

      queryAll('[data-additional="true"]', query('#recordsGrid')).forEach(function (card) {
        card.hidden = !nextState;
      });

      button.setAttribute('aria-expanded', String(nextState));
      if (label) label.textContent = nextState ? 'Recolher registros adicionais' : 'Ver mais prestações de contas';
    });
  }

  function setupRecordDialog() {
    var dialog = query('#recordDialog');
    var closeButton = query('#dialogClose');
    var receiptButton = query('#receiptToggle');
    var receiptPreview = query('#receiptPreview');
    var lastFocused = null;

    if (!dialog || !closeButton || !receiptButton || !receiptPreview) return;

    function closeDialog() {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }

    function fillGallery(images) {
      var gallery = query('#dialogGallery');
      gallery.innerHTML = '';
      images.forEach(function (item) {
        var figure = makeElement('figure');
        var image = document.createElement('img');
        image.src = item.src;
        image.alt = item.alt;
        image.width = 1536;
        image.height = 1024;
        image.loading = 'lazy';
        image.decoding = 'async';
        figure.appendChild(image);
        gallery.appendChild(figure);
      });
    }

    function openDialog(record, opener) {
      lastFocused = opener;
      setText('#dialogMeta', record.category + ' · ' + record.date);
      setText('#dialogTitle', record.title);
      setText('#dialogValue', currency.format(record.value));
      setText('#dialogResult', record.result);
      setText('#dialogDescription', record.description);
      setText('#receiptText', record.receipt);
      fillGallery(record.gallery);

      receiptPreview.hidden = true;
      receiptButton.setAttribute('aria-expanded', 'false');
      receiptButton.textContent = 'Visualizar comprovante';

      document.body.classList.add('dialog-open');
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      closeButton.focus();
    }

    query('#recordsGrid').addEventListener('click', function (event) {
      var button = event.target.closest('[data-open-record]');
      if (!button) return;
      var record = data.accountabilityRecords.find(function (item) { return item.id === button.dataset.openRecord; });
      if (record) openDialog(record, button);
    });

    closeButton.addEventListener('click', closeDialog);

    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) closeDialog();
    });

    dialog.addEventListener('close', function () {
      document.body.classList.remove('dialog-open');
      if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
    });

    dialog.addEventListener('cancel', function () {
      document.body.classList.remove('dialog-open');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && dialog.hasAttribute('open') && typeof dialog.close !== 'function') {
        closeDialog();
      }
    });

    receiptButton.addEventListener('click', function () {
      var expanded = receiptButton.getAttribute('aria-expanded') === 'true';
      receiptPreview.hidden = expanded;
      receiptButton.setAttribute('aria-expanded', String(!expanded));
      receiptButton.textContent = expanded ? 'Visualizar comprovante' : 'Ocultar comprovante';
    });
  }

  function setupAnimal() {
    var animal = data.animal;
    setText('#animalName', animal.name);
    setText('#animalTraits', animal.traits.join(' · '));
  }

  function renderFaq() {
    var list = query('#faqList');
    if (!list) return;

    data.faq.forEach(function (item, index) {
      var wrapper = makeElement('div', 'faq-item');
      var button = makeElement('button', 'faq-question');
      var answerId = 'faq-answer-' + index;
      button.type = 'button';
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', answerId);
      button.appendChild(makeElement('span', '', item.question));
      var icon = makeElement('i', 'fa-solid fa-plus');
      icon.setAttribute('aria-hidden', 'true');
      button.appendChild(icon);

      var answer = makeElement('div', 'faq-answer');
      answer.id = answerId;
      answer.setAttribute('role', 'region');
      answer.setAttribute('aria-label', item.question);
      var inner = makeElement('div');
      inner.appendChild(makeElement('p', '', item.answer));
      answer.appendChild(inner);

      wrapper.appendChild(button);
      wrapper.appendChild(answer);
      list.appendChild(wrapper);
    });

    list.addEventListener('click', function (event) {
      var button = event.target.closest('.faq-question');
      if (!button) return;
      var opening = button.getAttribute('aria-expanded') !== 'true';

      queryAll('.faq-question', list).forEach(function (item) {
        item.setAttribute('aria-expanded', 'false');
      });
      button.setAttribute('aria-expanded', String(opening));
    });
  }

  function setupContact() {
    var contact = data.contact;
    var instagram = query('#instagramLink');
    var facebook = query('#facebookLink');

    if (instagram) instagram.href = contact.instagramUrl;
    if (facebook) facebook.href = contact.facebookUrl;
    setText('#instagramLabel', contact.instagramLabel);
    setText('#facebookLabel', contact.facebookLabel);
    setText('#contactLocation', contact.location);
    setText('#serviceNote', contact.serviceNote);
  }

  function setupWhatsappLinks() {
    queryAll('[data-whatsapp-link]').forEach(function (link) {
      var message = link.dataset.message || 'Olá! Gostaria de saber mais sobre o projeto demonstrativo.';
      link.href = 'https://wa.me/' + data.contact.whatsappNumber + '?text=' + encodeURIComponent(message);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  }

  function setCurrentYear() {
    setText('#currentYear', String(new Date().getFullYear()));
  }

  function initialize() {
    setLogoFallback();
    setupMobileMenu();
    setupScrollSpy();
    renderHelpOptions();
    renderNeeds();
    setupPix();
    renderCampaign();
    setupCollectionPoint();
    renderRecords();
    setupRecordsToggle();
    setupRecordDialog();
    setupAnimal();
    renderFaq();
    setupContact();
    setupWhatsappLinks();
    setCurrentYear();
  }

  initialize();
}());

