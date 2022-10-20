import { FC } from 'react';
import clsx from 'clsx';
import { invoke } from '@tauri-apps/api/tauri';

import waIcon from '@/assets/logo.svg';
import './index.scss';

export interface AppData {
  name: string;
  icon: string;
  url: string;
}

interface AppItemProps {
  type: string;
  app: AppData;
  size?: 'lg' | 'sm';
}

const AppItem: FC<AppItemProps> = ({ type, app, size = 'lg' }) => {
  const isSvg = /<\s*svg[^>]*>(.*?)<\/\s*svg>/g.test(app?.icon);
  const handleClick = async () => {
    if (!app.url) return;
    await invoke('new_wa', {
      label: Date.now().toString(16),
      title: `${type} / ${app.name}`,
      url: app.url,
    });
  };

  return (
    <div className={clsx('wa-app-item', size)} onClick={handleClick} title={app.name}>
      {isSvg
        ? <i className="app-icon" dangerouslySetInnerHTML={{ __html: app.icon }} />
        : <img className="app-icon" src={app.icon ? app.icon : waIcon} /> }
      <div className="app-name">{app.name}</div>
    </div>
  )
}

export default AppItem;
