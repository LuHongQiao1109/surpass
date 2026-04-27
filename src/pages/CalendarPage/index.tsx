import React from 'react';
import { useState, useEffect } from 'react'


import { CalendarPageProps } from './type'


import { Badge, Calendar } from 'antd';
import type { BadgeProps, CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = []; // Specify the type of listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: '测试1' },
        { type: 'success', content: '测试2' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: '测试1' },
        { type: 'success', content: '测试2' },
        { type: 'error', content: '测试3-1' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: '测试1' },
        { type: 'success', content: 'This is very long usual event......' },
        { type: 'error', content: '测试3-2' },
        { type: 'error', content: '测试3-3' },
        { type: 'error', content: '测试3-4' },
        { type: 'error', content: '测试3-6' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

function CalendarPage () {


  // const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log('%c 🇨🇳嘿嘿68🇨🇳:', 'color: Yellow; background: DeepPink; font-size: 20px;', )
  },[])

  return (
    <div className='h-full'>
    <div>111</div>
  </div>
  )
}

export default CalendarPage
