export interface UserProfile {
  id: string
  name: string
  phoneNumber: string
  email: string
  dateOfBirth?: string
  address?: string
  avatar?: string
}

export interface ProfileSettings {
  notifications: boolean
  faceId: boolean
  language: string
}

export interface PersonalInfoFormData {
  name: string
  phoneNumber: string
  email: string
  dateOfBirth: string
  address: string
}

