interface Category {
  id: number
  category: string,
  iconName: string,
  isShow: boolean,
  type: '-' | '+',
  created?: boolean
}

interface RecordItem {
  category: string,
  note: string
  type: '-' | '+'
  account: number,
  createAt: string
}

interface GroupList {
  createAt: string,
  expend?: number,
  income?: number,
  sum?: number,
  items: RecordItem[]
}