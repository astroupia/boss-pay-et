export interface OnboardingSlide {
  id: number
  title: string
  description: string
  image: string
  imageAlt: string
}

export interface OnboardingProps {
  slides: OnboardingSlide[]
  onComplete: () => void
}

export interface SlideProps extends OnboardingSlide {
  isActive: boolean
}

export interface ProgressIndicatorProps {
  total: number
  current: number
}

export interface OnboardingButtonProps {
  onClick: () => void
  isLastSlide: boolean
}

