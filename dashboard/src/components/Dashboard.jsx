  import GuildDropdown from './GuildDropdown.jsx';
  import DashboardContent from './DashboardContent.jsx'
  import { useEffect, useRef, useState } from 'react';
  import { getGuildInfo  } from '../api/guilds.js';
import { getUserInfo } from '../api/user.js';

  export default function Dashboard (){
    const [serverList, setServerList] = useState([]);
    const [selectedGuild, setSelectedGuild] = useState(null);
    const [userDisplayName, setUserDisplayName] = useState('');
    const [userId, setUserId] = useState(null);
    
    //한 번만 실행되게 useRef 사용
      const hasFetchedGuild = useRef(false);
      const hasFetchedUser = useRef(false);
      useEffect(()=>{
        const guildInfo = async() =>{
          //사용자의 서버 중 돌쇠가 포함된 서버의 목록만을 가져옴
          const userGuildsData = await getGuildInfo(hasFetchedGuild); //data || undefined
          //값이 있다면 통째로 저장
          if(userGuildsData && userGuildsData.length > 0){ 
            setServerList(userGuildsData);
            setSelectedGuild(userGuildsData[0])
          }
        }

        const userInfo = async() =>{
          const userData = await getUserInfo(hasFetchedUser);
          if(userData){
            setUserDisplayName(userData.global_name);
            setUserId(userData.id);
          }
        }

        guildInfo();
        userInfo();
      }, [])

      return (
          <main className="px-4 pt-[120px] pb-6 md:px-8 lg:px-40">
          {/* 유저네임 + 드롭다운 */}
          <div className="flex justify-between items-center mb-4">
            {/* 왼쪽: 유저네임 */}
            <span className="text-black text-xl font-semibold">
              {userDisplayName}님의 Dashboard
            </span>

            {/* 오른쪽: Guild Dropdown */}
            <GuildDropdown serverList = {serverList} selectedGuild = {selectedGuild} setSelectedGuild ={setSelectedGuild}/>
          </div>

          {/* dashboard 내용 */}
          { selectedGuild && <DashboardContent userId = { userId } selectedGuild ={ selectedGuild } />}
        </main>
      )
  }