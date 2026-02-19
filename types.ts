
export interface HubItem {
  id: string;
  label: string;
  icon: string;
}

export interface NavSection {
  title: string;
  items: HubItem[];
}

export interface AITool {
  name: string;
  category: string;
  description: string;
  link: string;
}
