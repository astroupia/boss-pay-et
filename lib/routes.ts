export const routes = {
  // Onboarding routes
  onboarding: {
    welcome: "/welcome",
    slides: "/onboarding",
  },

  // Auth routes
  auth: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    resetSuccess: "/auth/reset-success",
    verifyPhone: "/auth/verify-phone",
    verify: "/auth/verify",
    pin: "/auth/pin",
    success: "/auth/success",
    logout: "/auth/logout",
  },

  // App routes
  app: {
    home: "/",
    profile: {
      index: "/profile",
      edit: "/profile/edit",
      language: "/profile/language",
      security: "/profile/security",
      support: {
        index: "/profile/support",
        faq: "/profile/support/faq",
      },
      settings: "/profile/settings",
    },
    transactions: {
      index: "/transactions",
      details: (id: string) => `/transactions/${id}`,
      history: "/transactions/history",
    },
    cards: {
      index: "/cards",
      details: (id: string) => `/cards/${id}`,
      pin: (id: string) => `/cards/${id}/pin`,
      reportLost: (id: string) => `/cards/${id}/report-lost`,
    },
    payments: {
      index: "/payments",
      mobile: "/payments/mobile",
      iban: "/payments/iban",
      topUp: "/payments/top-up",
      status: {
        success: "/payments/success",
        error: "/payments/error",
      },
    },
    transfers: {
      new: "/transfers/new",
      receive: "/transfers/receive",
      history: "/transfers/history",
      confirmation: "/transfers/confirmation",
      error: "/transfers/error",
      fund: "/transfers/fund",
    },
    exchange: "/exchange",
    notifications: "/notifications",
    settings: "/settings",
  },
};
