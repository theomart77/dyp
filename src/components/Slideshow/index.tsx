import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { AutoColumn } from '../Column'

import leftArrow from '../../assets/svg/leftArrow.svg'
import rightArrow from '../../assets/svg/rightArrow.svg'

const TopSection = styled(AutoColumn)`
  max-width: 1200px;
  width: 100%;
  justify-self: center;
`

const SCarouselWrapper = styled.div`
  display: flex;
`

const ButtonLeft = styled.div`
  position: absolute;
  margin-top: 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        display: none;
  `}
`

const ButtonRight = styled.div`
  position: absolute;
  justify-self: end;
  display: grid;
  margin-top: 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        display: none;
  `}
`

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface ICarouselSlide {
  active?: boolean
}

const SCarouselSlide = styled.div<ICarouselSlide>`
  flex: 0 0 auto;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: all 1s ease;
  width: 100%;
`

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface ICarouselProps {
  currentSlide: number
}

const SCarouselSlides = styled.div<ICarouselProps>`
  display: flex;
  ${props =>
    props.currentSlide &&
    css`
      transform: translateX(-${props.currentSlide * 100}%);
    `};
  transition: all 0.5s ease;
`

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IProps {
  children: JSX.Element[]
}

const Carousel = ({ children }: IProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const activeSlide = children.map((slide, index) => (
    <SCarouselSlide active={currentSlide === index} key={index}>
      {slide}
    </SCarouselSlide>
  ))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % activeSlide.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [activeSlide.length, currentSlide])
  //console.log('currentSlide+ ' + currentSlide)
  return (
    <TopSection gap="md">
      <SCarouselWrapper>
        <SCarouselSlides currentSlide={currentSlide}>{activeSlide}</SCarouselSlides>
      </SCarouselWrapper>
      <ButtonLeft>
        <button
          style={{
            height: '30px',
            background: 'rgba(255, 255, 255, 0.6)',
            width: '30px',
            border: 'none',
            textAlign: 'center',
            cursor: 'pointer',
            color: '#fff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => {
            setCurrentSlide((currentSlide - 1 + activeSlide.length) % activeSlide.length)
          }}
        >
          <img src={leftArrow} alt={'leftArrow'} />
        </button>
      </ButtonLeft>
      <ButtonRight>
        <button
          style={{
            height: '30px',
            background: 'rgba(255, 255, 255, 0.6)',
            width: '30px',
            border: 'none',
            textAlign: 'center',
            cursor: 'pointer',
            color: '#fff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => {
            setCurrentSlide((currentSlide + 1) % activeSlide.length)
          }}
        >
          <img src={rightArrow} alt={'rightArrow'} />
        </button>
      </ButtonRight>
    </TopSection>
  )
}

export default Carousel