//내부 내용 넣기

import { useState } from 'react';
import Dropdown from './Dropdown';

export default function GuildDropdown() {
  const [selectedGuild, setSelectedGuild] = useState(null);

  const guilds = [
    { id: '1', name: 'Server A' },
    { id: '2', name: 'Server B' },
  ];

  return (
    <div>
      <Dropdown
        options={guilds}
        value={selectedGuild}
        onChange={setSelectedGuild}
      />
    </div>
  );
}
