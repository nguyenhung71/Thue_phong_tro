import React, { memo, useState } from 'react'
import icons from '../ultils/icons'

const { GrLinkPrevious } = icons

const getRangeLabel = (name, min, max) => {
  const unit = name === 'price' ? 'triệu' : 'm2'
  if ((max === null || max === undefined) && min !== null && min !== undefined) return `Từ ${min} ${unit} trở lên`
  if ((min === 0 || min === null || min === undefined) && max !== null && max !== undefined) return `Dưới ${max} ${unit}`
  return `Từ ${min} - ${max} ${unit}`
}

const Modal = ({ setIsShowModal, content, name, handleSubmit, queries, arrMinMax, defaultText }) => {
  const [percent1, setPercent1] = useState(name === 'price' && arrMinMax?.priceArr ? arrMinMax.priceArr[0] : name === 'area' && arrMinMax?.areaArr ? arrMinMax.areaArr[0] : 0)
  const [percent2, setPercent2] = useState(name === 'price' && arrMinMax?.priceArr ? arrMinMax.priceArr[1] : name === 'area' && arrMinMax?.areaArr ? arrMinMax.areaArr[1] : 100)
  const [activeEl, setActiveEl] = useState('')

  const convert100toTarget = (percent) => {
    if (name === 'price') return Number((((percent / 100) * 15)).toFixed(1))
    if (name === 'area') return Math.round((percent / 100) * 90)
    return 0
  }

  const convertto100 = (value) => {
    const total = name === 'price' ? 15 : 90
    return Math.max(0, Math.min(100, Math.round((value / total) * 100)))
  }

  const activeItem = content.find((item) => item.code === activeEl)
  const sortedRange = [convert100toTarget(Math.min(percent1, percent2)), convert100toTarget(Math.max(percent1, percent2))]
  const displayMaxValue = activeItem?.max === null ? null : sortedRange[1]

  const handleClickTrack = (e) => {
    const trackEl = document.getElementById('track')
    const trackRect = trackEl.getBoundingClientRect()
    const nextPercent = Math.round(((e.clientX - trackRect.left) * 100) / trackRect.width)
    setActiveEl('')

    if (Math.abs(nextPercent - percent1) <= Math.abs(nextPercent - percent2)) setPercent1(nextPercent)
    else setPercent2(nextPercent)
  }

  const handleActive = (item) => {
    const minValue = item.min ?? 0
    const maxValue = item.max ?? (name === 'price' ? 15 : 90)
    setActiveEl(item.code)
    setPercent1(convertto100(minValue))
    setPercent2(convertto100(maxValue))
  }

  const handleBeforeSubmit = (e) => {
    const minValue = activeItem ? (activeItem.min ?? 0) : sortedRange[0]
    const maxValue = activeItem ? activeItem.max : sortedRange[1]
    const query = name === 'price'
      ? { price: getRangeLabel(name, minValue, maxValue), priceMin: minValue, priceMax: maxValue ?? '' }
      : { area: getRangeLabel(name, minValue, maxValue), acreageMin: minValue, acreageMax: maxValue ?? '' }

    handleSubmit(e, query, { [`${name}Arr`]: [Math.min(percent1, percent2), Math.max(percent1, percent2)] })
  }

  return (
    <div onClick={() => setIsShowModal(false)} className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center p-4'>
      <div onClick={(e) => e.stopPropagation()} className='w-full max-w-[640px] h-[500px] bg-white rounded-md relative overflow-hidden'>
        <div className='h-[45px] px-4 flex items-center border-b border-gray-200'>
          <span className='cursor-pointer' onClick={() => setIsShowModal(false)}>
            <GrLinkPrevious size={24} />
          </span>
        </div>

        {(name === 'category' || name === 'province') && (
          <div className='h-[calc(100%-45px)] p-4'>
            <div className='h-full overflow-y-auto pr-2'>
              <span className='py-2 flex gap-2 items-center border-b border-gray-200'>
                <input
                  type='radio'
                  name={name}
                  value={defaultText || ''}
                  id='default'
                  checked={name === 'category' ? !queries.categoryId : !queries.province}
                  onChange={(e) => handleSubmit(e, name === 'category' ? { category: '', categoryId: '', categoryCode: '' } : { province: '' })}
                />
                <label htmlFor='default'>{defaultText}</label>
              </span>
              {content.map((item) => {
                const itemKey = name === 'category' ? (item.id || item.code) : item.province_id
                const itemLabel = name === 'category' ? item.value : item.province_name
                const checked = name === 'category' ? String(item.id || item.code) === String(queries.categoryId || '') : item.province_name === queries.province

                return (
                  <span key={itemKey} className='py-2 flex gap-2 items-center border-b border-gray-200'>
                    <input
                      type='radio'
                      name={name}
                      id={String(itemKey)}
                      value={String(itemKey)}
                      checked={checked}
                      onChange={(e) => handleSubmit(e, name === 'category'
                        ? { category: item.value, categoryId: String(item.id || item.code), categoryCode: item.legacyCode || '' }
                        : { province: item.province_name })}
                    />
                    <label htmlFor={String(itemKey)}>{itemLabel}</label>
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {(name === 'price' || name === 'area') && (
          <div className='p-12 py-20'>
            <div className='flex flex-col items-center justify-center relative'>
              <div className='z-30 absolute top-[-48px] font-bold text-xl text-orange-600'>{getRangeLabel(name, activeItem ? (activeItem.min ?? 0) : sortedRange[0], activeItem ? activeItem.max : displayMaxValue)}</div>
              <div onClick={handleClickTrack} id='track' className='slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-300 rounded-full'></div>
              <div id='track-active' style={{ left: `${Math.min(percent1, percent2)}%`, right: `${100 - Math.max(percent1, percent2)}%` }} className='slider-track-active h-[5px] absolute top-0 bottom-0 bg-orange-600 rounded-full'></div>
              <input max='100' min='0' step='1' type='range' value={percent1} className='w-full appearance-none pointer-events-none absolute top-0 bottom-0' onChange={(e) => { setPercent1(+e.target.value); setActiveEl('') }} />
              <input max='100' min='0' step='1' type='range' value={percent2} className='w-full appearance-none pointer-events-none absolute top-0 bottom-0' onChange={(e) => { setPercent2(+e.target.value); setActiveEl('') }} />
              <div className='absolute z-30 top-6 left-0 right-0 flex justify-between items-center'>
                <span>0</span>
                <span>{name === 'price' ? '15 triệu +' : '90 m2 +'}</span>
              </div>
            </div>
            <div className='mt-24'>
              <h4 className='font-medium mb-4'>Chọn nhanh:</h4>
              <div className='flex gap-2 items-center flex-wrap w-full'>
                {content.map((item) => (
                  <button key={item.code} onClick={() => handleActive(item)} className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${item.code === activeEl ? 'bg-blue-500 text-white' : ''}`}>
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {(name === 'price' || name === 'area') && (
          <button type='button' className='w-full absolute bottom-0 bg-[#FFA500] py-2 font-medium rounded-bl-md rounded-br-md' onClick={handleBeforeSubmit}>
            Áp dụng
          </button>
        )}
      </div>
    </div>
  )
}

export default memo(Modal)