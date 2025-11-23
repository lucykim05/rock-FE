import Calendar from 'react-calendar';
import Badge from './badge';
import { formatStudyTime } from '../database/studyTime.js';
import { formatDate } from '../database/studyTime.js';

export default function CalendarView({ attendanceDates, studyTimes }) {
  return (
    <Calendar
      formatDay={(locale, date) => date.getDate()}
      tileClassName="relative h-20"
      tileContent={({ date, view }) => {
        if (view !== 'month') return null;

        const dateString = formatDate(date);
        const time = studyTimes[dateString];
        const isAttended = attendanceDates.includes(dateString);

        return (
          <>          
            {/* 출석 배지 */}
            <div className="absolute bottom-1 w-full flex justify-center">
              {isAttended && <Badge text="출석" />}
              </div>
            
             {/* 공부 시간 (데이터가 있을 때만 표시) */}
            {time > 0 && (
              <div className="absolute top-8 left-0 text-[10px] text-gray-500 font-medium">                
              {formatStudyTime(time)}
              </div>
            )}
          </>
        );
      }
    }
    />
  );
}
