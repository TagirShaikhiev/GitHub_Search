import { DateCell, LangCell, OwnerCell, RepoCell } from './commons';
import type { RepositoryTableProps } from './RepositoryTable/types';
import type { Col, SortBy } from './types';

export const nf = new Intl.NumberFormat();

export const formatDate = (iso?: string | null) => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
};

export const fromNow = (iso?: string | null) => {
  if (!iso) return '';
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return '';
  const diffMs = Date.now() - t;
  const minutes = Math.round(diffMs / 60000);
  const hours = Math.round(diffMs / 3600000);
  const days = Math.round(diffMs / 86400000);
  if (Math.abs(minutes) < 60) return `${minutes} min ago`;
  if (Math.abs(hours) < 48) return `${hours} h ago`;
  return `${days} d ago`;
};

export const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch { /* empty */ }
};

export const optionName = (option: SortBy) => option.replace(/-/g, ' ').charAt(0).toUpperCase() + option.slice(1);

export const yesNo = (v?: boolean) => (v ? 'yes' : 'no');
export const fmtDate = (d?: string) => (d ? `${formatDate(d)} • ${fromNow(d)}` : '—');

export const buildColumns = (onLinkClick?: React.MouseEventHandler) => {
  const columns: Col<RepositoryTableProps['repositories'][number]>[] = [
    {
      id: 'repo',
      header: 'Repository',
      width: '36%',
      render: (r) => (
        <RepoCell
          name={r.name}
          fullName={r.full_name}
          url={r.html_url}
          onLinkClick={onLinkClick}
        />
      ),
    },
    {
      id: 'owner',
      header: 'Owner',
      width: '22%',
      render: (r) => (
        <OwnerCell
          login={r.owner?.login}
          avatar={r.owner?.avatar_url as string | undefined}
          url={r.owner?.html_url as string | undefined}
          onLinkClick={onLinkClick}
        />
      ),
    },
    {
      id: 'lang',
      header: 'Language',
      width: '12%',
      render: (r) => <LangCell language={r.language} />,
    },
    {
      id: 'created',
      header: 'Created',
      width: '15%',
      render: (r) => <DateCell value={r.created_at} />,
    },
    {
      id: 'updated',
      header: 'Updated',
      width: '15%',
      render: (r) => <DateCell value={r.updated_at} />,
    },
  ];
  return columns;
};