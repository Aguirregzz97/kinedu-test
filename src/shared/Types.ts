export type ActivityPlan = {
  id: number,
  created_at: string,
  begins_at: string,
  ends_at: string,
  current_day_index: number,
  today: number,
  can_change: boolean,
  days: Day[],
}

export type Day = {
  date: string,
  day: number,
  items: DayItem[],
}

export type DayItem = {
  type: string,
  content: DayContent,
}

export type DayContent = {
  name: string,
  activity_type: string,
  purpose: string,
  description: string,
  thumbnails: DayThumbnails,
}

export type DayThumbnails = {
  size1: string,
  size2: string,
  size3: string,
  size4: string,
  size5: string,
  size6: string,
}