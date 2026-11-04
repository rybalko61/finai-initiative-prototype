import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import {
  Badge, Button, Checkbox, Dropdown, IconButton, Modal, Notification, PopupProvider,
  Select, Spinner, Switch, TabItem, Tabs, TextArea, TextField, BodyM, BodyS, H1, H2,
} from '@salutejs/sdds-finai';

const HeaderIcon = ({ name, size = 22 }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2.2" /><path d="M7.5 3v4M16.5 3v4M4 9h16" /><rect x="8" y="12" width="3" height="3" rx=".5" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.7 9a2.4 2.4 0 1 1 4.2 1.6c-1.2 1.2-1.9 1.4-1.9 3M12 17.3h.01" /></>,
    chat: <><path d="M20 11.2a7.7 7.7 0 0 1-8 7.2 8.6 8.6 0 0 1-3.1-.6L4 19l1.2-3.8A6.8 6.8 0 0 1 4 11.2 7.7 7.7 0 0 1 12 4a7.7 7.7 0 0 1 8 7.2Z" /><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" /></>,
    bell: <><path d="M18 9.8a6 6 0 0 0-12 0c0 7-2.5 7-2.5 8.5h17C20.5 16.8 18 16.8 18 9.8ZM10 21h4" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    back: <path d="m14.5 5-7 7 7 7" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    filter: <><path d="M3 6h18M3 12h18M3 18h18" /><circle cx="8" cy="6" r="2" fill="currentColor" /><circle cx="16" cy="12" r="2" fill="currentColor" /><circle cx="10" cy="18" r="2" fill="currentColor" /></>,
    alert: <><path d="M10.3 4.7 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.7a2 2 0 0 0-3.4 0Z" /><path d="M12 9v5M12 17h.01" /></>,
    upload: <><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" /><path d="M4 14v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5" /></>,
    download: <><path d="M12 4v12m0 0 4.5-4.5M12 16l-4.5-4.5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></>,
    cube: <><path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Z" /><path d="m3.7 7.7 8.3 4.5 8.3-4.5M12 12.2V21" /></>,
    settings: <><path d="M12 3.5l1 .2.5 1.8 1.2.7 1.7-.6 1.2 1.2-.6 1.7.7 1.2 1.8.5v1.7l-1.8.5-.7 1.2.6 1.7-1.2 1.2-1.7-.6-1.2.7-.5 1.8h-1.7l-.5-1.8-1.2-.7-1.7.6-1.2-1.2.6-1.7-.7-1.2-1.8-.5v-1.7l1.8-.5.7-1.2-.6-1.7 1.2-1.2 1.7.6 1.2-.7.5-1.8H12Z" /><circle cx="12" cy="12" r="3.2" /></>,
    apps: <>{[5, 12, 19].flatMap(x => [5, 12, 19].map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />))}</>,
  };
  return <svg {...common}>{paths[name]}</svg>;
};
import { sdds_finai__light } from '@salutejs/sdds-themes';
import './style.css';

const FinAiTheme = createGlobalStyle`${sdds_finai__light}`;
const initiativeNames = [
  'Автоматизация обработки заявок', 'Развитие цифрового профиля клиента', 'Модернизация платформы данных',
  'Оптимизация платежного контура', 'Единое окно для корпоративных клиентов', 'Обновление CRM для менеджеров',
  'Перевод отчетности на новую платформу', 'Автоматическая сверка операций', 'Развитие мобильного банка',
  'Управление лимитами онлайн', 'Интеграция с системой документооборота', 'Обновление аналитической витрины',
  'Сокращение времени открытия счета', 'Новый процесс валютного контроля', 'Расширение API для партнеров',
  'Миграция архивных данных', 'Единый каталог продуктов', 'Улучшение маршрутизации обращений',
];
const initiativeVersions = ['БП', 'ПГК', 'ПГК', 'БП', 'ПГК', 'БП', 'ПГК', 'БП', 'БП', 'ПГК', 'БП', 'ПГК', 'БП', 'ПГК', 'БП', 'ПГК', 'ПГК', 'БП'];
const metricKeys = ['headcount', 'rot', 'business', 'q4', 'q1', 'q2', 'q3'];
const formatMetric = value => Number(value).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const metricValue = value => Number(String(value ?? '0').replace(',', '.')) || 0;
const initialRows = Array.from({ length: 18 }, (_, i) => ({
  id: `initiative-${i + 1}`,
  grouping: initiativeNames[i],
  version: initiativeVersions[i],
  score: 0.6,
  year: '2016',
  status: 'В работе',
  headcount: formatMetric(2.4 + (i % 6) * 1.35),
  rot: formatMetric(1.8 + (i % 5) * 2.15),
  business: formatMetric(1.2 + (i % 7) * 0.85),
  q4: formatMetric(0.4 + (i % 4) * 0.7), q1: formatMetric(0.6 + (i % 5) * 0.55),
  q2: formatMetric(0.8 + (i % 6) * 0.45), q3: formatMetric(1.1 + (i % 3) * 0.9),
}));

function App() {
  const [rows, setRows] = useState(initialRows);
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState('');
  const [showBP, setShowBP] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [actionReady, setActionReady] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMenuKey, setActionMenuKey] = useState(0);
  const [notice, setNotice] = useState(null);
  const [toast, setToast] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [mergeOpen, setMergeOpen] = useState(false);
  const [mergeName, setMergeName] = useState('');
  const [viewingId, setViewingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [detailTab, setDetailTab] = useState('Общее');
  const emptyCreateForm = { name:'', description:'', version:'', direction:'', analytics:'', digitalization:'', block:'', tribe:'', tribe1:'', product:'', team:'', keyResult:'', q1:'', q2:'', q3:'', q4:'', year:'', blockDirection:'', tribeDirection:'', stream:'', analyst:'', inactive:false };
  const [createForm, setCreateForm] = useState(emptyCreateForm);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiText, setAiText] = useState('');
  const [messages, setMessages] = useState(['Привет! Я AI-помощник FinAI. Могу помочь разобраться с инициативами и данными таблицы.']);
  const [filterOpen, setFilterOpen] = useState(false);
  const toastTimeout = useRef(null);

  const selectedCount = Object.values(selected).filter(Boolean).length;
  const viewingInitiative = rows.find(row => row.id === viewingId);
  const isDetailPage = createOpen || Boolean(viewingInitiative);
  const detailData = viewingInitiative?.details || {};
  const detailValue = (key, fallback = 'Не заполнено') => detailData[key] || fallback;
  const openInitiative = row => { setViewingId(row.id); setDetailTab('Общее'); };
  const editInitiative = row => {
    const defaults = { direction:'Финансы', analytics:'Прочее', digitalization:'Без AI', block:'Финансы', tribe:'GAK Digital Finance', tribe1:'Бюджетирование расходов', product:'Бюджетирование расходов' };
    setCreateForm({ ...emptyCreateForm, ...defaults, ...(row.details || {}), name:row.grouping, version:`${row.version} ${row.year}` });
    setEditingId(row.id); setCreateOpen(true);
  };
  const closeCreateForm = () => { setCreateOpen(false); if (editingId) setViewingId(editingId); setEditingId(null); };
  const updateCreateForm = (key, value) => setCreateForm(current => ({ ...current, [key]: value }));
  const renderSelect = (key, placeholder, values = []) => <Select size="s" target="textfield-like" items={values.map(value => ({ value, label: value }))} value={createForm[key]} onChange={value => updateCreateForm(key, value)} placeholder={placeholder} aria-label={placeholder} />;
  const visibleRows = useMemo(() => rows.filter(row => row.grouping.toLowerCase().includes(search.toLowerCase()) && (!showBP || row.version === 'БП')), [rows, search, showBP]);
  const tableColumns = [
    { id: 'select', title: '', width: 56 }, { id: 'grouping', title: 'Группировка', width: 300 },
    { id: 'version', title: 'Версия', width: 100 }, { id: 'score', title: 'Оценка', width: 150 }, { id: 'year', title: 'Плановый год', width: 150 },
    { id: 'status', title: 'Статус', width: 150 }, { id: 'headcount', title: 'Численность, ПШЕ', width: 150 },
    { id: 'rot', title: 'РОТ, млн ₽', width: 150 }, { id: 'business', title: 'Бизнес, ПШЕ', width: 150 },
    { id: 'q4', title: 'Q4 на 01.01.26, ПШЕ', sub: 'Бизнес', width: 170 },
    { id: 'q1', title: 'Q1 на 01.04.26, ПШЕ', sub: 'Бизнес', width: 170 },
    { id: 'q2', title: 'Q2 на 01.07.26, ПШЕ', sub: 'Бизнес', width: 170 },
    { id: 'q3', title: 'Q3 на 01.10.26, ПШЕ', sub: 'Бизнес', width: 170 },
  ];
  const allVisibleSelected = visibleRows.length > 0 && visibleRows.every(row => selected[row.id]);
  const someVisibleSelected = visibleRows.some(row => selected[row.id]);
  const toggleAll = () => setSelected(current => allVisibleSelected ? {} : Object.fromEntries(visibleRows.map(row => [row.id, true])));

  const showToast = (title, view = 'positive') => {
    setToast({ title, view });
    window.clearTimeout(toastTimeout.current);
    toastTimeout.current = window.setTimeout(() => setToast(null), 5000);
  };

  const openActionMenu = () => {
    if (actionLoading || actionReady) return;
    setActionLoading(true);
    window.setTimeout(() => {
      setActionLoading(false);
      setActionMenuKey(value => value + 1);
      setActionReady(true);
    }, 1350);
  };

  const finishStatusAction = (status) => {
    const count = selectedCount;
    setActionReady(false);
    setNotice({ title: 'Действие выполняется…', detail: `Статус меняется у ${count} инициатив` });
    window.setTimeout(() => {
      setRows(current => current.map(row => selected[row.id] ? { ...row, status } : row));
      setNotice(null);
      showToast('Статус успешно изменен');
    }, 1700);
  };

  const actionItems = [
    { label: 'Сменить статус', value: 'status', items: [
      { label: 'Отправить на согласование', value: 'Отправлено на согласование' },
      { label: 'Согласовать', value: 'Согласовано' },
      { label: 'Отозвать', value: 'Отозвано' },
      { label: 'Приостановить', value: 'Приостановлено' },
      { label: 'Вернуть в работу', value: 'В работе' },
      { label: 'Отправить на доработку', value: 'На доработке', items: [
        { label: 'Лидеру продукта', value: 'На доработке у лидера продукта' },
        { label: 'Лидеру Трайба', value: 'На доработке у лидера Трайба' },
        { label: 'ИТ Лидеру Трайба', value: 'На доработке у ИТ Лидера Трайба' },
      ] },
    ] },
    { label: 'Отметить как неактуальную', value: 'stale' },
    { label: 'Объединить инициативы', value: 'merge' },
    { label: 'Удалить', value: 'delete' },
  ];

  const onActionSelect = (item) => {
    if (item.value === 'status') return;
    if (item.value === 'stale') { setActionReady(false); showToast('Выберите причину неактуальности', 'warning'); return; }
    if (item.value === 'merge') { setActionReady(false); setMergeName(''); setMergeOpen(true); return; }
    if (item.value === 'delete') {
      setRows(current => current.filter(row => !selected[row.id]));
      setSelected({}); setActionReady(false); showToast('Инициативы удалены'); return;
    }
    finishStatusAction(item.value);
  };

  const mergeSelectedInitiatives = () => {
    const name = mergeName.trim();
    if (!name) { showToast('Введите название объединенной инициативы', 'warning'); return; }
    const selectedRows = rows.filter(row => selected[row.id]);
    if (selectedRows.length < 2) { showToast('Выберите минимум две инициативы для объединения', 'warning'); return; }
    const merged = { ...selectedRows[0], id: `initiative-${Date.now()}`, grouping: name,
      details: { ...(selectedRows[0].details || {}), name, mergedFrom: selectedRows.map(row => row.id) } };
    metricKeys.forEach(key => { merged[key] = formatMetric(selectedRows.reduce((sum, row) => sum + metricValue(row[key]), 0)); });
    setRows(current => [merged, ...current.filter(row => !selected[row.id])]);
    setSelected({}); setMergeOpen(false); setMergeName('');
    showToast(`Инициативы объединены. Показатели суммированы (${selectedRows.length})`);
  };

  const tableMetricTotals = metricKeys.map(key => formatMetric(visibleRows.reduce((sum, row) => sum + metricValue(row[key]), 0)));

  const addInitiative = () => {
    const name = createForm.name.trim();
    if (!name) { showToast('Введите название инициативы', 'warning'); return; }
    const requiredFields = ['version','direction','analytics','digitalization','block','tribe','tribe1','product'];
    if (requiredFields.some(key => !createForm[key])) { showToast('Заполните обязательные поля', 'warning'); return; }
    const versionYear = createForm.version.match(/\d{4}/)?.[0] || '2026';
    const version = createForm.version.startsWith('БП') ? 'БП' : 'ПГК';
    if (editingId) {
      setRows(current => current.map(row => row.id === editingId ? { ...row, grouping:name, version, year:versionYear, details:{ ...createForm } } : row));
      setCreateOpen(false); setViewingId(editingId); setEditingId(null); showToast('Изменения сохранены'); return;
    }
    setRows(current => [{ ...initialRows[0], id: `initiative-${Date.now()}`, grouping: name, version, year: versionYear, details: { ...createForm } }, ...current]);
    setCreateForm(emptyCreateForm); setCreateOpen(false); showToast('Инициатива создана');
  };

  const sendMessage = () => {
    const value = aiText.trim();
    if (!value) return;
    setMessages(current => [...current, `Вы: ${value}`, 'Принято. Я учту это в контексте выбранных инициатив.']);
    setAiText('');
  };

  return <>
    <FinAiTheme />
    <header className={`topbar ${isDetailPage ? 'form-topbar' : ''}`}>
      <div className="brand"><span className="brandmark">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</span><strong>FinAI</strong></div>
      {isDetailPage ? <IconButton view="secondary" size="s" className="apps-button" aria-label="Все сервисы"><HeaderIcon name="apps" size={22} /></IconButton> : <Button view="secondary" size="s" className="service-button"><HeaderIcon name="menu" size={20} />Все сервисы</Button>}
      <nav className="topnav">
        {!isDetailPage && <IconButton view="secondary" size="s" aria-label="Поиск"><HeaderIcon name="search" /></IconButton>}
        <Button view="secondary" size="s">База знаний</Button>
        <Button view="secondary" size="s">Мои задачи 8</Button>
        <IconButton view="secondary" size="s" aria-label="Календарь"><HeaderIcon name="calendar" /></IconButton>
      </nav>
      <div className="account">
        {isDetailPage && <Button view="accent" size="s" className="ai-header-button"><HeaderIcon name="help" size={18} />AI-чат</Button>}
        <IconButton view="secondary" size="s" aria-label="Помощь"><HeaderIcon name="help" /></IconButton>
        <IconButton view="secondary" size="s" aria-label="Сообщения"><HeaderIcon name="chat" /></IconButton>
        <IconButton view="secondary" size="s" aria-label="Уведомления"><HeaderIcon name="bell" /></IconButton>
        <button className="profile-button" aria-label="Профиль АА"><Badge view="light" size="m" text="АА" /><HeaderIcon name="chevron" size={16} /></button>
      </div>
    </header>

    <main className={createOpen ? 'page creation-mode' : viewingInitiative ? 'page detail-mode' : 'page'}>
      {createOpen ? <>
        <div className="creation-title"><IconButton className="back-button" view="secondary" size="s" aria-label="Назад к инициативам" onClick={closeCreateForm}><HeaderIcon name="back" size={18} /></IconButton><div><h1>{editingId ? 'Редактирование инициативы' : 'Создание инициативы'}</h1><p>Инициатива CHANGE</p></div></div>
        <section className="initiative-form-card">
          <div className="form-section-head"><h2>Общее</h2><label className="inactive-toggle"><span>Неактуальная инициатива</span><Switch size="s" checked={createForm.inactive} onChange={event => updateCreateForm('inactive', event.currentTarget.checked)} /></label></div>
          <div className="form-field form-field-wide counted-field"><div className="form-label">Название инициативы <i>*</i></div><TextArea size="s" className="initiative-textarea title-textarea" value={createForm.name} onChange={event => updateCreateForm('name', event.target.value.slice(0,250))} maxLength={250} resize="none" aria-label="Название инициативы" /><span className="char-count">{createForm.name.length}/250</span></div>
          <div className="form-field form-field-wide counted-field"><div className="form-label">Описание инициативы</div><TextArea size="s" className="initiative-textarea description-textarea" value={createForm.description} onChange={event => updateCreateForm('description', event.target.value.slice(0,2000))} maxLength={2000} resize="none" aria-label="Описание инициативы" /><span className="char-count">{createForm.description.length}/2000</span></div>
          <div className="form-field version-field"><div className="form-label">Версия <i>*</i></div>{renderSelect('version','Выберите версию',['БП 2026','БП 2027','ПГК 2026','ПГК 2027'])}</div>
          <div className="form-grid form-grid-three">
            <div className="form-field"><div className="form-label">Направление ПАО <i>*</i></div>{renderSelect('direction','Выберите направление',['Строительство','Финансы','Розничный бизнес'])}</div>
            <div className="form-field"><div className="form-label">Аналитика ПАО <i>*</i></div>{renderSelect('analytics','Выберите аналитику',['Прочее','Доходы','Расходы'])}</div>
            <div className="form-field"><div className="form-label">Степень цифровизации <i>*</i></div>{renderSelect('digitalization','Выберите степень',['Без AI','С AI','Автоматизация'])}</div>
            <div className="form-field"><div className="form-label">Блок <i>*</i></div>{renderSelect('block','Выберите блок',['Финансы','Технологии','Операции'])}</div>
            <div className="form-field"><div className="form-label">Трайб <i>*</i></div>{renderSelect('tribe','Выберите трайб',['GAK Digital Finance','Digital Business','Data Platform'])}</div>
            <div className="form-field"><div className="form-label">Трайб-1 <i>*</i></div>{renderSelect('tribe1','Выберите трайб-1',['Бюджетирование расходов','Платежи','Аналитика'])}</div>
            <div className="form-field"><div className="form-label">Продукт <i>*</i></div>{renderSelect('product','Выберите продукт',['Бюджетирование расходов','Платежи','Отчетность'])}</div>
            <div className="form-field"><div className="form-label">Команда</div>{renderSelect('team','Выберите команду',['Команда инициатив','Какая-то команда'])}</div>
          </div>
          <section className="key-result-panel">
            <div className="form-label">Ключевой результат</div>
            {renderSelect('keyResult','Выберите ключевой результат',['Индивидуальная метрика финансовой эффективности','Снижение операционных затрат','Увеличение дохода'])}
            <div className="quarter-grid">{[['Q1','q1'],['Q2','q2'],['Q3','q3'],['Q4','q4'],['Год','year']].map(([label,key])=><label className="quarter-field" key={key}><span>{label}</span><TextField size="s" value={createForm[key]} onChange={event=>updateCreateForm(key,event.target.value)} placeholder="%" aria-label={label} /></label>)}</div>
          </section>
          <section className="analytics-panel">
            <h3><span>▾</span> Структура аналитик блока</h3>
            <div className="form-grid analytics-grid">
              <div className="form-field"><div className="form-label">Направление блока</div>{renderSelect('blockDirection','Выберите направление блока',['Финансы','Технологии','Операции'])}</div>
              <div className="form-field"><div className="form-label">Направление трайба</div>{renderSelect('tribeDirection','Выберите направление трайба',['Digital Finance','Payments','Data'])}</div>
              <div className="form-field"><div className="form-label">Стрим</div>{renderSelect('stream','Выберите стрим',['Планирование','Автоматизация','Аналитика'])}</div>
              <div className="form-field"><div className="form-label">Аналитика</div>{renderSelect('analyst','Выберите аналитику',['Бюджетирование','Платежи','Отчетность'])}</div>
            </div>
          </section>
          <div className="form-footer"><Button view="secondary" size="s" onClick={closeCreateForm}>Закрыть</Button><Button view="accent" size="s" onClick={addInitiative}>{editingId ? 'Сохранить' : 'Создать'}</Button></div>
        </section>
      </> : viewingInitiative ? <>
        <div className="detail-titlebar">
          <div className="detail-heading"><IconButton className="back-button" view="secondary" size="s" aria-label="Назад к инициативам" onClick={() => setViewingId(null)}><HeaderIcon name="back" size={18} /></IconButton><div className="detail-heading-copy"><div className="detail-heading-line"><h1>{viewingInitiative.grouping}</h1><span className="detail-chip change-chip">CHANGE</span><span className="detail-chip status-chip">{viewingInitiative.status}</span></div><p>ID {viewingInitiative.id}</p></div></div>
          <div className="detail-actions"><IconButton view="secondary" size="s" aria-label="Дополнительные действия">⋮</IconButton><Button view="secondary" size="s" onClick={() => editInitiative(viewingInitiative)}>Редактировать</Button><Button view="accent" size="s" onClick={() => { setRows(current => current.map(row => row.id === viewingInitiative.id ? { ...row, status:'Согласовано' } : row)); showToast('Инициатива согласована'); }}>Согласовать</Button></div>
        </div>
        <div className="detail-tabs">{['Общее','Затраты','Эффекты'].map(tab => <button type="button" className={detailTab === tab ? 'active' : ''} onClick={() => setDetailTab(tab)} key={tab}>{tab}</button>)}</div>
        <div className="detail-layout">
          <div className="detail-main">
            {detailTab === 'Общее' ? <>
              <div className="summary-grid">
                <section className="detail-card overview-card"><div className="overview-line"><span><HeaderIcon name="calendar" size={17} />Период</span><b>Q1 {viewingInitiative.year} — Q4 {viewingInitiative.year}</b></div><div className="overview-line"><span>▣　Версия</span><b>{viewingInitiative.version} {viewingInitiative.year}</b></div><div className="overview-line"><span>★　Оценка</span><b><i className="score-label">3,2 ♙</i><i className="score-label">0,6 ✣</i></b></div><div className="overview-line"><span>♟　Автор</span><b>{detailValue('author','Иванова О.В.')}</b></div></section>
                <section className="detail-card indicators-card"><h2>Показатели</h2><div className="indicator-grid"><div><span>Затраты, млн ₽</span><b>39,93</b></div><div><span>Эффекты, млн ₽</span><b>180,00</b></div><div><span>C/V, %</span><b>27,21 ⓘ</b></div><div><span>Ставка дисконт, %</span><b>24,68</b></div></div><div className="indicator-art" aria-hidden="true"><i className="art-orb"/><i className="art-orb second"/><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="34" fill="#53d3ed"/><path d="M50 50V16a34 34 0 0 1 29 16Z" fill="#65e5f6"/><path d="M50 50 79 32a34 34 0 0 1-5 42Z" fill="#19bde0"/><path d="M50 50 74 74a34 34 0 0 1-48 2Z" fill="#29c9dc"/><path d="M50 50 26 76a34 34 0 0 1 5-52Z" fill="#50d8ea"/><path d="m50 50 29-18" stroke="#fff" strokeWidth="3"/></svg></div></section>
                <section className="detail-card key-result-view"><h2>Ключевой результат</h2><p>{detailValue('keyResult','Индивидуальная метрика финансовой эффективности: Объем категорий адресных расходов, участвующих в приоритизации инициатив')}</p><div className="result-values">{[['Q1',detailValue('q1','0')],['Q2',detailValue('q2','0')],['Q3',detailValue('q3','0')],['Q4',detailValue('q4','0')],['Год, %',detailValue('year','100')]].map(([label,value])=><div key={label}><span>{label}</span><b>{value}</b></div>)}</div></section>
              </div>
              <div className="detail-lower-grid">
                <section className="detail-card information-card"><h2>Подробная информация</h2><div className="detail-property full"><span>Название инициативы</span><b>{viewingInitiative.grouping}</b></div><div className="detail-property full"><span>Описание</span><b className="description-preview">{detailValue('description','Инициатива направлена на повышение эффективности работы сотрудников через внедрение системы целеполагания и регулярной обратной связи. Проект предусматривает создание четких целей на год, квартал и месяц, обеспечивающих согласованность работы.')}</b><button type="button" className="show-more" onClick={event => event.currentTarget.previousElementSibling.classList.toggle('expanded')}>Показать ещё</button></div><div className="property-grid"><div><span>Блок</span><b>{detailValue('block','Финансы')}</b></div><div><span>Трайб</span><b>{detailValue('tribe','GAK Digital Finance')}</b></div><div><span>Трайб-1</span><b>{detailValue('tribe1','Бюджетирование расходов')}</b></div><div><span>Продукт</span><b>{detailValue('product','Бюджетирование расходов')}</b></div><div><span>Команда</span><b>{detailValue('team','Команда №3 МВЗ 9900KL0311')}</b></div></div></section>
                <div className="detail-secondary-column"><section className="detail-card additional-card"><h2>Дополнительно</h2><div className="property-grid"><div><span>Направление ПАО</span><b>{detailValue('direction','Повышение прибыли')}</b></div><div><span>Аналитика ПАО</span><b>{detailValue('analytics','Прочее')}</b></div><div><span>Степень цифровизации</span><b>{detailValue('digitalization','Gen AI')}</b></div><div><span>Направление блока</span><b className="muted-value">{detailValue('blockDirection')}</b></div><div><span>Направление трайба</span><b className="muted-value">{detailValue('tribeDirection')}</b></div><div><span>Стрим</span><b className="muted-value">{detailValue('stream')}</b></div><div><span>Аналитика</span><b className="muted-value">{detailValue('analyst')}</b></div></div></section><section className="detail-card relations-card"><h2>Связи инициативы</h2><div className="relation-grid">{[['◇','Объединенные (4)'],['▦','Квартальные (2)'],['☷','Кросс-заказы (2)'],['♧','Каскад']].map(([icon,label])=><button type="button" key={label}><span>{icon}</span>{label}</button>)}</div></section></div>
              </div>
            </> : <section className="detail-card metric-detail-panel"><h2>{detailTab}</h2><div className="property-grid"><div><span>План</span><b>{detailTab === 'Затраты' ? '39,93 млн ₽' : '180,00 млн ₽'}</b></div><div><span>Q1 {viewingInitiative.year}</span><b>{detailTab === 'Затраты' ? '9,80 млн ₽' : '42,00 млн ₽'}</b></div><div><span>Q2 {viewingInitiative.year}</span><b>{detailTab === 'Затраты' ? '10,20 млн ₽' : '46,00 млн ₽'}</b></div><div><span>Q3 {viewingInitiative.year}</span><b>{detailTab === 'Затраты' ? '9,50 млн ₽' : '44,00 млн ₽'}</b></div><div><span>Q4 {viewingInitiative.year}</span><b>{detailTab === 'Затраты' ? '10,43 млн ₽' : '48,00 млн ₽'}</b></div></div></section>}
          </div>
          <aside className="approval-timeline"><div className="timeline-current"><span className="timeline-dot done" /><div><b>Черновик</b><p>Заявитель</p><strong>{detailValue('author','Иванова Анна Александровна')}</strong><small>Отправлена на согласование: 01.01.2024 12:00</small></div></div><div className="timeline-stage active"><span className="timeline-dot pending" /><div><b>На согласовании</b></div></div>{['Владелец продукта','Лидер продукта','ИТ Лидер Трайба','Лидер Трайба','Руководитель ДИТ','Штаб блока','Владелец программы','Финансовый контролер'].map((role,index)=><div className="timeline-role" key={role}><span className={`role-state ${index<3?'complete':''}`}>{index<3?'✓':'•'}</span><span>{role}</span><button type="button">{index<1?'−':'+'}</button></div>)}<div className="timeline-end">Готово в бюджет</div></aside>
        </div>
      </> : <>
      <div className="title-row"><IconButton className="back-button" view="secondary" size="s" aria-label="Назад"><HeaderIcon name="back" size={18} /></IconButton><H1>Модуль инициатив</H1></div>
      <div className="toolbar">
        <Tabs index={activeTab} size="s" view="filled" hasDivider={false} onChange={setActiveTab}>
          <TabItem onClick={() => setActiveTab(0)}>Инициативы</TabItem>
          <TabItem onClick={() => setActiveTab(1)}>Режим правки</TabItem>
          <TabItem onClick={() => setActiveTab(2)}>Каскады / кросс-заказы</TabItem>
        </Tabs>
        <label className="bp-toggle"><BodyS>Показать БП</BodyS><Switch size="s" checked={showBP} onChange={event => setShowBP(event.currentTarget.checked)} /></label>
        <div className="filter-wrap">
        <Button view="secondary" size="s" onClick={() => setFilterOpen(value => !value)}><HeaderIcon name="filter" size={20} />Фильтр<span className="filter-dot" /></Button>
          {filterOpen && <div className="filter-panel"><BodyM bold>Фильтр инициатив</BodyM><Checkbox size="s" label="В работе" /><Checkbox size="s" label="Приостановлены" /><Button view="accent" size="xs" onClick={() => { setFilterOpen(false); showToast('Фильтр применён'); }}>Применить</Button></div>}
        </div>
        <Button view="clear" size="s" onClick={() => { setSearch(''); showToast('Фильтры сброшены'); }}><HeaderIcon name="close" size={18} />Сбросить фильтры</Button>
        <span className="spacer" />
        <IconButton view="secondary" size="s" aria-label="Предупреждения" onClick={() => showToast('Критических предупреждений нет', 'info')}><HeaderIcon name="alert" size={21} /></IconButton>
        <Button view="secondary" size="s">Отчет по инициативам</Button>
        <Button view="accent" size="s" onClick={() => setCreateOpen(true)}>Создать инициативу</Button>
      </div>

      <section className="metrics">
        <BodyS color="secondary">Численность, ПШЕ</BodyS><BodyS>Всего <b className="red">90</b>/88</BodyS><BodyS>Бизнес <b className="red">80</b>/70</BodyS><BodyS>ИТ <b className="red">10</b>/8</BodyS>
        <span className="metric-divider" /><BodyS color="secondary">Вендоры, млн ₽</BodyS><BodyS>Всего <b className="red">90</b>/88</BodyS><BodyS>CAPEX <b className="red">80</b>/70</BodyS><BodyS>OPEX <b className="red">10</b>/8</BodyS><span className="info">i</span>
      </section>

      <section className="tablebox">
        <div className="table-actions">
          <TextField size="s" value={search} onChange={event => setSearch(event.target.value)} contentLeft={<HeaderIcon name="search" size={20} />} placeholder="Поиск" aria-label="Поиск инициатив" />
          <span className="spacer" />
          <Button view="clear" size="s" onClick={() => showToast('Выберите файл для загрузки')}><HeaderIcon name="upload" size={22} />Загрузить</Button>
          <Button view="clear" size="s" onClick={() => showToast('Таблица подготовлена к скачиванию')}><HeaderIcon name="download" size={22} />Скачать</Button>
          <Button view="clear" size="s" onClick={() => showToast('Группировка по инициативам')}><HeaderIcon name="cube" size={22} />Группировать</Button>
        </div>
        <div className="table-scroll">
          <div className="table-grid" role="table" aria-label="Инициативы">
            <div className="table-head table-grid-row" role="row" style={{ '--table-cols': tableColumns.map(column => `${column.width}px`).join(' ') }}>
              {tableColumns.map((column, index) => <div className={`table-cell head-cell ${index > 1 ? 'with-left-border' : ''}`} role="columnheader" key={column.id}>
                {index === 0 ? <Checkbox size="m" checked={allVisibleSelected} indeterminate={someVisibleSelected && !allVisibleSelected} onChange={toggleAll} aria-label="Выбрать все инициативы" /> : <span>{column.title}{column.sub && <small>{column.sub}</small>}</span>}
              </div>)}
            </div>
            {visibleRows.map(row => <div className="table-grid-row data-row" role="row" key={row.id} style={{ '--table-cols': tableColumns.map(column => `${column.width}px`).join(' ') }}>
              <div className="table-cell select-cell" role="cell"><Checkbox size="m" checked={Boolean(selected[row.id])} onChange={() => setSelected(current => ({ ...current, [row.id]: !current[row.id] }))} aria-label={`Выбрать: ${row.grouping}`} /></div>
              {tableColumns.slice(1).map((column, index) => {
                const cell = {
                  grouping: <button type="button" className="grouping-cell initiative-link" onClick={() => openInitiative(row)}>{row.grouping}</button>,
                  version: <span className="version-label">{row.version}</span>,
                  score: <span className="score-pill">0,6 <span aria-hidden="true">✣</span></span>,
                  year: row.year,
                  status: <span className="status-pill">{row.status}</span>,
                  headcount: row.headcount, rot: row.rot, business: row.business, q4: row.q4, q1: row.q1, q2: row.q2, q3: row.q3,
                }[column.id];
                return <div className={`table-cell ${['headcount','rot','business','q4','q1','q2','q3'].includes(column.id) ? 'numeric-cell' : ''}`} role="cell" key={`${row.id}-${column.id}`}>{cell}</div>;
              })}
            </div>)}
            <div className="table-total table-grid-row" role="row" style={{ '--table-cols': tableColumns.map(column => `${column.width}px`).join(' ') }}>
              <div className="table-cell" role="cell" /><div className="table-cell total-label" role="cell">Итого</div>
              {tableMetricTotals.map((value, index) => <div className="table-cell numeric-cell" role="cell" key={metricKeys[index]}>{value}</div>)}
            </div>
          </div>
        </div>
        <IconButton className="gear" size="s" view="clear" aria-label="Настройки таблицы"><HeaderIcon name="settings" size={22} /></IconButton>
      </section>

      {selectedCount > 0 && <div className="bulk-island">
        <BodyS>Выбрано <Badge view="accent" size="xs" text={String(selectedCount)} /></BodyS>
        <Button view="clear" size="s" onClick={() => setSelected({})}>Сбросить всё</Button>
        <span className="island-divider" />
        <Button view="secondary" size="s" onClick={() => showToast(`Выгружено инициатив: ${selectedCount}`)}>Выгрузить</Button>
        {!actionReady ? <Button view="secondary" size="s" disabled={actionLoading} isLoading={actionLoading} onClick={openActionMenu}>{actionLoading ? 'Загрузка…' : 'Выбрать действие'}</Button> :
          <Dropdown key={actionMenuKey} items={actionItems} trigger="click" placement="top-end" offset={[0, 0]} listMaxHeight="360px" listWidth="336px" alwaysOpened closeOnSelect onToggle={isOpen => { if (!isOpen) setActionReady(false); }} onItemSelect={onActionSelect}>
            <Button view="secondary" size="s">Выбрать действие</Button>
          </Dropdown>}
        <IconButton view="clear" size="s" aria-label="Закрыть панель" onClick={() => setSelected({})}>⌄</IconButton>
      </div>}
      </>}
    </main>

    <IconButton className="ai-launch" view="accent" size="s" aria-label="Открыть AI-чат" aria-expanded={aiOpen} onClick={() => setAiOpen(true)}>✦</IconButton>
    <Modal isOpen={aiOpen} hasBody closeOnOverlayClick onClose={() => setAiOpen(false)} className="ai-modal">
      <div className="ai-heading"><H2>✦ AI-Chat FinAI</H2><IconButton view="clear" size="s" aria-label="Закрыть чат" onClick={() => setAiOpen(false)}>×</IconButton></div>
      <div className="ai-messages">{messages.map((message, i) => <div className={message.startsWith('Вы:') ? 'ai-message user' : 'ai-message'} key={`${i}-${message}`}><BodyM>{message}</BodyM></div>)}</div>
      <div className="ai-compose"><TextField size="s" value={aiText} onChange={event => setAiText(event.target.value)} placeholder="Спросите что-нибудь" onKeyDown={event => event.key === 'Enter' && sendMessage()} /><Button view="accent" size="s" onClick={sendMessage}>↑</Button></div>
    </Modal>

    <Modal isOpen={mergeOpen} hasBody closeOnOverlayClick onClose={() => setMergeOpen(false)} className="merge-modal">
      <div className="merge-modal-content">
        <div className="merge-modal-heading"><H2>Объединение инициатив</H2><IconButton view="clear" size="s" aria-label="Закрыть" onClick={() => setMergeOpen(false)}><HeaderIcon name="close" size={18} /></IconButton></div>
        <label className="form-field"><span className="form-label">Введите название объединенной инициативы</span><TextField size="s" value={mergeName} onChange={event => setMergeName(event.target.value)} placeholder="Введите название объединенной инициативы" aria-label="Введите название объединенной инициативы" /></label>
        <div className="merge-modal-actions"><Button view="secondary" size="s" onClick={() => setMergeOpen(false)}>Отмена</Button><Button view="accent" size="s" onClick={mergeSelectedInitiatives}>Объединить</Button></div>
      </div>
    </Modal>

    {(notice || toast) && <div className="notification-slot" key={notice ? 'pending' : 'toast'}>
      <Notification view={notice ? 'info' : toast?.view || 'positive'} size="xs" layout="horizontal" title={notice?.title || toast?.title} showCloseIcon={!notice} onCloseButtonClick={() => notice ? null : setToast(null)}>
        {notice ? <BodyM>{notice.detail}</BodyM> : null}
      </Notification>
      {notice && <span className="notification-spinner"><Spinner size="s" view="info" /></span>}
    </div>}
  </>;
}

createRoot(document.getElementById('root')).render(<PopupProvider><App /></PopupProvider>);
