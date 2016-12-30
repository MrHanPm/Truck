/**
 * 匹配图片中文信息
 */

const Pna = {
guiseFront: '正面45度',
guiseBack: '后面45度',
front: '正前',
back: '正后',
frontTyre: '前轮胎',
backTyre: '后轮胎',
cabEntirety: '驾驶室整体',
cabSeat: '驾驶室座椅',
console: '中控台',
nameplate: '车辆铭牌',
engineFront: '发动机正面',
carframe: '车架',
tops: '上装',
frontPlate: '前板簧',
backPlate: '后板簧',
saddle: '鞍座',
fuelTank: '油箱',
driveLic: '行驶证',
serviceLic: '营运证',
trafficIns: '交强险',
businessIns: '商业险'
}


const Typ = {
    '1': '车况很好',
    '2': '保养的不错',
    '3': '动力强劲',
    '4': '外观有轻微损伤',
    '5': '有严重撞伤',
    '6': '磨损严重'
}

export const getTYP = (name) => {
    return Typ[name]
}

export const getPNA = (name) => {
    return Pna[name]
}
