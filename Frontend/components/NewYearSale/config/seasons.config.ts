export interface SeasonConfig {
  id: string
  name: string
  displayName: string
  startDate: string
  endDate: string
  theme: {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    accentColor: string
  }
  isActive: boolean
}

export const SEASONS_CONFIG: SeasonConfig[] = [
  {
    id: "winter-2024",
    name: "Winter 2024",
    displayName: "Winter 2024",
    startDate: "2024-12-01",
    endDate: "2025-02-28",
    theme: {
      primaryColor: "bg-blue-50",
      secondaryColor: "bg-slate-100",
      backgroundColor: "bg-amber-50",
      accentColor: "bg-red-100"
    },
    isActive: true
  },
  {
    id: "spring-2025",
    name: "Spring 2025",
    displayName: "Spring 2025",
    startDate: "2025-03-01",
    endDate: "2025-05-31",
    theme: {
      primaryColor: "bg-green-50",
      secondaryColor: "bg-pink-50",
      backgroundColor: "bg-yellow-50",
      accentColor: "bg-purple-100"
    },
    isActive: false
  },
  {
    id: "summer-2025",
    name: "Summer 2025",
    displayName: "Summer 2025",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    theme: {
      primaryColor: "bg-orange-50",
      secondaryColor: "bg-red-50",
      backgroundColor: "bg-yellow-50",
      accentColor: "bg-blue-100"
    },
    isActive: false
  },
  {
    id: "autumn-2025",
    name: "Autumn 2025",
    displayName: "Autumn 2025",
    startDate: "2025-09-01",
    endDate: "2025-11-30",
    theme: {
      primaryColor: "bg-orange-50",
      secondaryColor: "bg-amber-50",
      backgroundColor: "bg-red-50",
      accentColor: "bg-brown-100"
    },
    isActive: false
  }
]

export const getCurrentSeason = (): SeasonConfig | null => {
  const now = new Date()
  return SEASONS_CONFIG.find(season => {
    const start = new Date(season.startDate)
    const end = new Date(season.endDate)
    return season.isActive && now >= start && now <= end
  }) || null
}

export const getSeasonById = (seasonId: string): SeasonConfig | null => {
  return SEASONS_CONFIG.find(season => season.id === seasonId) || null
}
