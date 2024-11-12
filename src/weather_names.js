import { cloneElement } from 'react';
import { MdSunny, MdCloud, MdFoggy } from 'react-icons/md';
import { IoRainy, IoSnowSharp } from 'react-icons/io5';
import { AiFillThunderbolt } from 'react-icons/ai';

// 気象名のリスト { 気象コード: [気象名, 気象カテゴリ], ... }
const weatherNames = {
  0: ['快晴', 'sunny'],
  1: ['晴れ', 'sunny'],
  2: ['薄曇り', 'cloudy'],
  3: ['曇り', 'cloudy'],
  45: ['霧', 'foggy'],
  48: ['氷霧','foggy'],
  51: ['薄い霧雨', 'rainy'],
  53: ['霧雨', 'rainy'],
  55: ['濃い霧雨', 'rainy'],
  56: ['薄い着氷性の霧雨', 'rainy'],
  57: ['濃い着氷性の霧雨', 'rainy'],
  61: ['小雨', 'rainy'],
  63: ['雨', 'rainy'],
  65: ['大雨', 'rainy'],
  66: ['弱い氷雨', 'rainy'],
  67: ['強い氷雨', 'rainy'],
  71: ['小雪', 'snowy'],
  73: ['雪', 'snowy'],
  75: ['大雪', 'snowy'],
  77: ['霧雪', 'snowy'],
  80: ['にわか雨', 'rainy'],
  81: ['通り雨', 'rainy'],
  82: ['集中豪雨', 'rainy'],
  85: ['弱いにわか雪', 'snowy'],
  86: ['強いにわか雪', 'snowy'],
  95: ['雷雨', 'thunderstorm'],
  96: ['霰を伴う雷雨', 'thunderstorm'],
  99: ['雹を伴う雷雨', 'thunderstorm'],
}

// 天気アイコンの設定 { 気象カテゴリ: アイコン, ... }
const weatherIcons = {
  sunny: <MdSunny color='orange' />,
  cloudy: <MdCloud color='darkgray' />,
  rainy: <IoRainy color='royalblue' />,
  snowy: <IoSnowSharp color='skyblue' />,
  foggy: <MdFoggy color='lightgray' />,
  thunderstorm: <AiFillThunderbolt color='gold' />
}

// 気象名&アイコン表示コンポーネント
// export : 別ファイルから呼び出すための指定
export const WeatherNameWithIcon = ({ weatherCode }) => {
  const [wName, wCategory] = weatherNames[weatherCode];
  const wIcon = cloneElement(weatherIcons[wCategory], {
    size: 25,
    style: {
      marginRight: '0.5em'
    }
  });

  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {wIcon} {wName}
    </span>
  )
}
