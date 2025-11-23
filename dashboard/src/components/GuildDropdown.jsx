//내부 내용 넣기

import Dropdown from './Dropdown';

export default function GuildDropdown({serverList, selectedGuild, setSelectedGuild}) {
  return (
    <div>
      <Dropdown
        options={serverList || []}
        value={selectedGuild}
        onChange={setSelectedGuild}
      />
    </div>
  );
}
